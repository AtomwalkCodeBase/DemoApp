import React from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useBlog } from '../hooks/UseBlog';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Main Container
const PageContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

// Header Section - Completely New Design
const HeaderSection = styled.section`
  padding: 120px 0 0 0;
  background: #ffffff;
  position: relative;

  @media (max-width: 768px) {
    padding: 100px 0 0 0;
  }
`;

const HeaderContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const BreadcrumbNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
  font-size: 0.9rem;
  color: #666;
  animation: ${slideIn} 0.6s ease-out;

  span {
    color: #999;
  }

  .current {
    color: #2563eb;
    font-weight: 500;
  }
`;

const HeaderContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px auto;
  animation: ${fadeIn} 0.8s ease-out;
`;

const CategoryChip = styled.div`
  display: inline-flex;
  align-items: center;
  background: #f1f5f9;
  color: #475569;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
  border: 1px solid #e2e8f0;
`;

const MainTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: #0f172a;
  line-height: 1.1;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 32px;
  font-weight: 400;
`;

const AuthorMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 20px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 40px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 0.9rem;

  .label {
    font-weight: 600;
    color: #374151;
  }

  .value {
    color: #6b7280;
  }
`;

const FeaturedImageContainer = styled.div`
  position: relative;
  margin-bottom: 80px;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    height: 300px;
    border-radius: 12px;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 60%,
    rgba(0, 0, 0, 0.1) 100%
  );
  border-radius: 16px;

  @media (max-width: 768px) {
    border-radius: 12px;
  }
`;

// Content Section
const ContentSection = styled.section`
  background: #ffffff;
  padding-bottom: 100px;
`;

const ContentContainer = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const ArticleSection = styled.div`
  margin-bottom: 48px;
  animation: ${fadeIn} 0.6s ease-out;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeading = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 10px;
  line-height: 1.3;
  position: relative;
  padding-bottom: 12px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #3b82f6);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SubHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 36px 0 20px 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ArticleParagraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.75;
  color: #374151;
  margin-bottom: 24px;
  text-align: justify;

  &.lead-paragraph {
    font-size: 1.2rem;
    color: #1f2937;
    font-weight: 400;
    
    &::first-letter {
      font-size: 3.5rem;
      font-weight: 800;
      float: left;
      line-height: 1;
      margin: 4px 12px 0 0;
      color: #2563eb;
      font-family: 'Georgia', serif;
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: left;
    
    &.lead-paragraph::first-letter {
      font-size: 2.8rem;
      margin: 2px 8px 0 0;
    }
  }
`;

const BulletList = styled.ul`
  margin: 10px 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding: 12px 0 12px 32px;
    margin-bottom: 8px;
    font-size: 1.125rem;
    line-height: 1.7;
    color: #374151;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20px;
      width: 6px;
      height: 6px;
      background: #2563eb;
      border-radius: 50%;
    }
  }

  @media (max-width: 768px) {
    margin: 24px 0;
    
    li {
      font-size: 1rem;
    }
  }
`;

const NumberedList = styled.ol`
  margin: 32px 0;
  padding: 0;
  list-style: none;
  counter-reset: list-counter;

  li {
    counter-increment: list-counter;
    position: relative;
    padding: 16px 0 16px 50px;
    margin-bottom: 12px;
    font-size: 1.125rem;
    line-height: 1.7;
    color: #374151;
    background: #f8fafc;
    border-radius: 8px;
    padding-right: 20px;

    &::before {
      content: counter(list-counter);
      position: absolute;
      left: 16px;
      top: 16px;
      width: 24px;
      height: 24px;
      background: #2563eb;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
    }
  }

  @media (max-width: 768px) {
    margin: 24px 0;
    
    li {
      font-size: 1rem;
      padding-left: 45px;
    }
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 40px 0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
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

// Loading States
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8fafc;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-radius: 50%;
  border-top-color: #2563eb;
  animation: spin 0.8s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1rem;
  color: #64748b;
  background: linear-gradient(90deg, #9ca3af 25%, #6b7280 50%, #9ca3af 75%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 1.5s infinite;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8fafc;
  text-align: center;
  padding: 0 20px;

  h2 {
    font-size: 1.875rem;
    color: #1f2937;
    margin-bottom: 12px;
    font-weight: 700;
  }

  p {
    font-size: 1rem;
    color: #6b7280;
  }
`;

const BlogDetail = () => {
  const { id } = useParams();
  const { blog, blogContent, loading, error } = useBlog(id);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title;
    
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

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading article...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <h2>Unable to load article</h2>
        <p>{error}</p>
      </ErrorContainer>
    );
  }

  if (!blog || !blogContent) {
    return (
      <ErrorContainer>
        <h2>Article not found</h2>
        <p>The article you're looking for doesn't exist or has been removed.</p>
      </ErrorContainer>
    );
  }

  const renderContent = (content, isFirst = false) => {
    switch (content.type) {
      case 'paragraph':
        return (
          <ArticleParagraph className={isFirst ? 'lead-paragraph' : ''}>
            {content.data}
          </ArticleParagraph>
        );
      case 'bullets':
        return (
          <BulletList>
            {content.data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </BulletList>
        );
      case 'steps':
        return (
          <NumberedList>
            {content.data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </NumberedList>
        );
      case 'image':
        return <ArticleImage src={content.data} alt="" />;
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <HeaderSection>
        <HeaderContainer>
          <HeaderContent>
            <CategoryChip>{blog.category}</CategoryChip>
            <MainTitle>{blogContent.header.title}</MainTitle>
            <Subtitle>{blogContent.header.tagline}</Subtitle>
            
            <AuthorMeta>
              <MetaItem>
                <span className="label">Published:</span>
                <span className="value">{blog.date}</span>
              </MetaItem>
            </AuthorMeta>
          </HeaderContent>

          <FeaturedImageContainer>
            <FeaturedImage
              src={blogContent.header.leadImage}
              alt={blogContent.header.title}
            />
            <ImageOverlay />
          </FeaturedImageContainer>
        </HeaderContainer>
      </HeaderSection>

      <ContentSection>
        <ContentContainer>
          {blogContent.sections.map((section, sectionIndex) => (
            <ArticleSection key={sectionIndex}>
              {section.title && <SectionHeading>{section.title}</SectionHeading>}
              {section.subtitle && <SubHeading>{section.subtitle}</SubHeading>}
              <div>
                {section.contents.map((content, contentIndex) => (
                  <div key={contentIndex}>
                    {renderContent(content, sectionIndex === 0 && contentIndex === 0)}
                  </div>
                ))}
              </div>
            </ArticleSection>
            
          ))}
        </ContentContainer>
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
      
    </PageContainer>
  );
};

export default BlogDetail;