import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebasee';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding-bottom: 1rem;
`;

const TopNavigation = styled.div`
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f8fafc;
  color: #374151;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 2rem 0;
  
  &:hover {
    background: #f1f5f9;
    border-color: #d1d5db;
    transform: translateX(-2px);
  }

  &:active {
    transform: translateX(-1px);
  }

  .back-icon {
    font-size: 1rem;
    transition: transform 0.2s ease;
  }

  &:hover .back-icon {
    transform: translateX(-3px);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
    margin: 1rem 0;
    
    .back-text {
      display: none;
    }
  }
`;

const MainContent = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const ArticleCard = styled.article`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const HeroSection = styled.div`
margin-top: 40px;
  position: relative;
  height: 400px;
  overflow: hidden;
  background: #f1f5f9;

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }
`;

const CoverImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; 
    object-position: center;
    transition: opacity 0.3s ease;
  }

  img[src=""], img:not([src]), img[src="#"] {
    display: none;
  }
    
  &.loading img {
    opacity: 0;
  }

  /* Fallback content when image fails to load */
  .image-fallback {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #6b7280;
    font-size: 3rem;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: 2;
  }
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: white;
  background: ${(props) => {
    switch (props.category?.toLowerCase()) {
      case 'news':
        return '#3b82f6';
      case 'event':
        return '#10b981';
      case 'announcement':
        return '#f59e0b';
      default:
        return '#6366f1';
    }
  }};

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    font-size: 0.75rem;
    padding: 0.4rem 1rem;
  }
`;

const ContentSection = styled.div`
  padding: 2.5rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const ArticleHeader = styled.header`
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.2;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon {
    width: 16px;
    height: 16px;
    opacity: 0.7;
  }
`;

const ArticleContent = styled.div`
  .rich-text-content {
    font-size: 1.125rem;
    line-height: 1.7;
    color: #374151;

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.6;
    }

    h1, h2, h3, h4, h5, h6 {
      color: #111827;
      font-weight: 700;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      line-height: 1.3;
    }

    h1 {
      font-size: 2rem;
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 0.5rem;
      margin-bottom: 1.5rem;

      @media (max-width: 768px) {
        font-size: 1.75rem;
      }
    }

    h2 {
      font-size: 1.75rem;
      color: #1f2937;

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }

    h3 {
      font-size: 1.5rem;
      color: #374151;

      @media (max-width: 768px) {
        font-size: 1.25rem;
      }
    }

    p {
      margin: 1.5rem 0;
      text-align: justify;
    }

    p:first-of-type {
      font-size: 1.25rem;
      font-weight: 500;
      color: #1f2937;
      margin-bottom: 2rem;
      line-height: 1.6;

      @media (max-width: 768px) {
        font-size: 1.125rem;
      }
    }

    ul, ol {
      margin: 1.5rem 0;
      padding-left: 2rem;
    }

    ul {
      list-style: none;
    }

    ul li {
      position: relative;
      margin: 0.75rem 0;
      padding-left: 1.5rem;
    }

    ul li::before {
      content: '•';
      color: #3b82f6;
      font-weight: bold;
      position: absolute;
      left: 0;
      font-size: 1.2em;
    }

    ol {
      list-style-type: decimal;
    }

    ol li {
      margin: 0.75rem 0;
      padding-left: 0.5rem;
    }

    blockquote {
      margin: 2rem 0;
      padding: 1.5rem;
      background: #f8fafc;
      border-left: 4px solid #3b82f6;
      border-radius: 0 8px 8px 0;
      font-style: italic;
      color: #475569;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 2rem auto;
      display: block;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s;
    }

    a:hover {
      border-bottom-color: #3b82f6;
    }

    code {
      background: #f1f5f9;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.875em;
      color: #e11d48;
    }

    pre {
      background: #1e293b;
      color: #e2e8f0;
      padding: 1.5rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 2rem 0;
      font-family: 'Monaco', 'Consolas', monospace;
    }

    .ql-indent-1 { margin-left: 2rem; }
    .ql-indent-2 { margin-left: 4rem; }
    .ql-indent-3 { margin-left: 6rem; }
  }
`;

const ShareSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
`;

const ShareTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  text-align: center;
`;

const ShareButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const ShareButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;

  &.twitter {
    background: #1da1f2;
    color: white;
    
    &:hover {
      background: #0d8bd9;
      transform: translateY(-1px);
    }
  }
  
  &.linkedin {
    background: #0077b5;
    color: white;
    
    &:hover {
      background: #005885;
      transform: translateY(-1px);
    }
  }
  
  &.facebook {
    background: #4267b2;
    color: white;
    
    &:hover {
      background: #365899;
      transform: translateY(-1px);
    }
  }
  
  &.copy {
    background: #6b7280;
    color: white;
    
    &:hover {
      background: #4b5563;
      transform: translateY(-1px);
    }
  }

  @media (max-width: 480px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.8rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e5e7eb;
    border-top: 3px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .error-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .error-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #ef4444;
    margin-bottom: 0.5rem;
  }

  .error-message {
    color: #6b7280;
    font-size: 1rem;
  }
`;

const NewsEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Calculate reading time based on word count
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = item?.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      });
      return;
    }
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/news-events');
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const [metadataDoc, contentDoc] = await Promise.all([
          getDoc(doc(db, 'articles_metadata', id)),
          getDoc(doc(db, 'articles_content', id))
        ]);

        if (metadataDoc.exists() && contentDoc.exists()) {
          const content = contentDoc.data();
          const fullContent = content.chunks ? content.chunks.join('') : content.content;
          const sanitizedContent = sanitizeHtml(fullContent, {
            allowedTags: [
              'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
              'strong', 'em', 'a', 'img', 'br', 'blockquote', 'code', 'pre'
            ],
            allowedAttributes: {
              a: ['href', 'target'],
              img: ['src', 'alt', 'title'],
              '*': ['class']
            }
          });

          setItem({
            id,
            ...metadataDoc.data(),
            content: sanitizedContent,
            publishedAt: metadataDoc.data().publishedAt?.toDate(),
            readingTime: calculateReadingTime(sanitizedContent)
          });
        } else {
          navigate('/news-events');
        }
      } catch (error) {
        console.error('Error fetching news/event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

  if (loading) {
    return (
      <PageWrapper>
        <TopNavigation>
          <NavContent>
            {/* Removed back button from here */}
          </NavContent>
        </TopNavigation>
        <LoadingContainer>
          <div className="spinner"></div>
        </LoadingContainer>
      </PageWrapper>
    );
  }

  if (!item) {
    return (
      <PageWrapper>
        <TopNavigation>
          <NavContent>
            {/* Removed back button from here */}
          </NavContent>
        </TopNavigation>
        <ErrorContainer>
          <div className="error-icon">📄</div>
          <div className="error-title">Article Not Found</div>
          <div className="error-message">
            The article you're looking for doesn't exist or has been removed.
          </div>
        </ErrorContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <TopNavigation>
        <NavContent>
          {/* Removed back button from here */}
        </NavContent>
      </TopNavigation>
      
      <MainContent>
        <ArticleCard>
          <HeroSection>
            <CoverImage className={!imageLoaded && !imageError ? 'loading' : ''}>
              {item.coverImage && !imageError ? (
                <img 
                  src={item.coverImage} 
                  alt={item.title}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ display: imageLoaded ? 'block' : 'none' }}
                />
              ) : null}
              {(imageError || !item.coverImage) && (
                <div className="image-fallback">
                  📰
                </div>
              )}
            </CoverImage>
            <CategoryBadge category={item.category}>
              {item.category}
            </CategoryBadge>
          </HeroSection>

          <ContentSection>
            <ArticleHeader>
              <Title>{item.title}</Title>
              {item.tagline && <Tagline>{item.tagline}</Tagline>}
              <MetaInfo>
                <MetaItem>
                  <span className="icon">📅</span>
                  {item.publishedAt?.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </MetaItem>
                {/* <MetaItem>
                  <span className="icon">⏱️</span>
                  {item.readingTime} min read
                </MetaItem> */}
              </MetaInfo>
            </ArticleHeader>

            <ArticleContent>
              <div
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </ArticleContent>

            <ShareSection>
              <ShareTitle>Share this article</ShareTitle>
              <ShareButtons>
                <ShareButton 
                  className="twitter"
                  onClick={() => handleShare('twitter')}
                >
                  🐦 Twitter
                </ShareButton>
                <ShareButton 
                  className="linkedin"
                  onClick={() => handleShare('linkedin')}
                >
                  💼 LinkedIn
                </ShareButton>
                <ShareButton 
                  className="facebook"
                  onClick={() => handleShare('facebook')}
                >
                  📘 Facebook
                </ShareButton>
                <ShareButton 
                  className="copy"
                  onClick={() => handleShare('copy')}
                >
                  🔗 Copy Link
                </ShareButton>
              </ShareButtons>
            </ShareSection>
          </ContentSection>
        </ArticleCard>
        
        {/* Back button moved to the bottom */}
        <BackButton onClick={handleBackNavigation}>
          <span className="back-icon">←</span>
          <span className="back-text">Back to News & Events</span>
        </BackButton>
      </MainContent>
    </PageWrapper>
  );
};

export default NewsEventDetail;