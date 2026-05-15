import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useBlog } from '../hooks/UseBlog';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../Blogs/firebase';
import { FaFacebookF, FaLinkedinIn, FaLink, FaReddit, FaWhatsapp, FaShareAlt, FaClock, FaUser, FaTag, FaArrowLeft, FaChevronRight } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

// Styled Components
const PageContainer = styled.div`
margin-top: 50px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
`;

const BackButton = styled(Link)`
  position: fixed;
  top: 140px;
  left: 20px;
  background: white;
  padding: 12px 20px;
  border-radius: 40px;
  text-decoration: none;
  color: #1e293b;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 100;
  font-size: 0.9rem;

  &:hover {
    transform: translateX(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    color: #2563eb;
  }

  @media (max-width: 768px) {
    top: 80px;
    left: 15px;
    padding: 8px 16px;
    font-size: 0.8rem;
  }
`;

const MainWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 40px 60px;
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 60px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 100px 30px 40px;
  }

  @media (max-width: 768px) {
    padding: 80px 20px 40px;
  }
`;

const MainContent = styled.div`
  animation: ${slideInLeft} 0.6s ease-out;
`;

const HeaderContent = styled.div`
  margin-bottom: 40px;
`;

const CategoryChip = styled.div`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
`;

const MainTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const AuthorMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 32px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 0.9rem;

  svg {
    color: #2563eb;
  }

  .label {
    font-weight: 600;
    color: #374151;
  }
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 40px;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const ArticleSection = styled.div`
  margin-bottom: 48px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const SectionHeading = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 16px;
  line-height: 1.3;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SubHeading = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin: 32px 0 16px;
  line-height: 1.4;
`;

const ArticleParagraph = styled.p`
  font-size: 1.05rem;
  line-height: 1.75;
  color: #334155;
  margin-bottom: 20px;

  &.lead-paragraph {
    font-size: 1.15rem;
    color: #1e293b;
    font-weight: 500;
    
    &::first-letter {
      font-size: 3rem;
      font-weight: 800;
      float: left;
      line-height: 1;
      margin: 4px 12px 0 0;
      color: #2563eb;
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: left;
  }
`;

const BulletList = styled.ul`
  margin: 24px 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding: 8px 0 8px 28px;
    margin-bottom: 8px;
    font-size: 1rem;
    line-height: 1.7;
    color: #334155;

    &::before {
      content: '▹';
      position: absolute;
      left: 0;
      color: #2563eb;
      font-weight: bold;
    }
  }
`;

const NumberedList = styled.ol`
  margin: 24px 0;
  padding: 0;
  list-style: none;
  counter-reset: steps;

  li {
    counter-increment: steps;
    position: relative;
    padding: 12px 0 12px 45px;
    margin-bottom: 12px;
    font-size: 1rem;
    line-height: 1.7;
    color: #334155;

    &::before {
      content: counter(steps);
      position: absolute;
      left: 0;
      top: 12px;
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.85rem;
    }
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 32px 0;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const ShareSection = styled.div`
  margin-top: 60px;
  padding: 40px 0;
  border-top: 2px solid #e2e8f0;
`;

const ShareTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 20px;
  text-align: center;
`;

const ShareOptionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

const ShareOption = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 40px;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.$color || '#64748b'};
  font-weight: 500;
  font-size: 0.9rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.$color || '#2563eb'};
    background: ${props => props.$color || '#f8fafc'};
    color: white;
  }

  svg {
    font-size: 1.1rem;
  }
`;

// Sidebar Styles
const Sidebar = styled.aside`
  animation: ${slideInRight} 0.6s ease-out;
`;

const SidebarSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: #2563eb;
    font-size: 0.9rem;
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PostCard = styled(Link)`
  display: flex;
  gap: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 12px;

  &:hover {
    background: #f8fafc;
    transform: translateX(5px);
  }
`;

const PostImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const PostInfo = styled.div`
  flex: 1;
`;

const PostCategory = styled.span`
  font-size: 0.7rem;
  color: #2563eb;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 4px;
  display: inline-block;
`;

const PostTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 4px;
  line-height: 1.4;
`;

const PostDate = styled.span`
  font-size: 0.7rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const NoPosts = styled.p`
  color: #94a3b8;
  text-align: center;
  padding: 20px;
  font-size: 0.9rem;
`;

// Loading and Error Components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc, #ffffff);
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
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
  background: linear-gradient(90deg, #94a3b8, #475569, #94a3b8);
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
  text-align: center;
  padding: 20px;

  h2 {
    font-size: 2rem;
    color: #0f172a;
    margin-bottom: 12px;
  }

  p {
    color: #64748b;
  }
`;

const BlogDetail = () => {
  const { id } = useParams();
  const { blog, blogContent, loading, error } = useBlog(id);
  const [recentPosts, setRecentPosts] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  console.log(relatedPosts, "fdfeded")
  // Fetch recent and related posts
  useEffect(() => {
    const fetchAdditionalPosts = async () => {
      if (!blog) return;

      try {
        // Fetch recent posts (3 most recent)
        const recentQuery = query(
          collection(db, 'life_blogs'),
          orderBy('date', 'desc'),
          limit(3)
        );
        const recentSnapshot = await getDocs(recentQuery);
        const recent = recentSnapshot.docs
          .filter(doc => doc.id !== id)
          .map(doc => ({ id: doc.id, ...doc.data() }));
        setRecentPosts(recent);

        // Fetch related posts (same category, excluding current)
        if (blog.category) {
          // alert(blog.category);
          const relatedQuery = query(
            collection(db, 'life_blogs'),
            // where('category', '==', blog.category),
            orderBy('date', 'desc'),
            // limit(4)
          );
          const relatedSnapshot = await getDocs(relatedQuery);

          const related = relatedSnapshot.docs
            .map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
            .filter(item =>
              item.id !== id &&
              item.category === blog.category
            );

          setRelatedPosts(related);
        }
      } catch (err) {
        console.error('Error fetching additional posts:', err);
      }
    };

    if (blog) {
      fetchAdditionalPosts();
    }
  }, [blog, id]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || 'Check out this article';

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}: ${url}`)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        alert('✓ Link copied to clipboard!');
      });
      return;
    }

    if (platform === 'native' && navigator.share) {
      navigator.share({ title, text: title, url })
        .catch(err => console.error('Error sharing:', err));
      return;
    }

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

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
        return <ArticleImage src={content.data} alt="Article visual" loading="lazy" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading amazing content...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error || !blog || !blogContent) {
    return (
      <ErrorContainer>
        <h2>✨ Oops! Article not found</h2>
        <p>The article you're looking for doesn't exist or has been moved.</p>
        <BackButton to="/blog" style={{ position: 'relative', top: 'auto', left: 'auto', marginTop: '20px', display: 'inline-flex' }}>
          <FaArrowLeft /> Back to Blog
        </BackButton>
      </ErrorContainer>
    );
  }

  return (
    <PageContainer>
      {/* <BackButton to="/blog">
        <FaArrowLeft /> Back to Blog
      </BackButton> */}

      <MainWrapper>
        <MainContent>
          <HeaderContent>
            <CategoryChip>{blog.category}</CategoryChip>
            <MainTitle>{blogContent.header.title}</MainTitle>
            <Subtitle>{blogContent.header.tagline}</Subtitle>

            <AuthorMeta>
              <MetaItem>
                <FaUser />
                <span className="label">By:</span>
                <span className="value">LifeIntelect Team</span>
              </MetaItem>
              <MetaItem>
                <FaClock />
                <span className="label">Published:</span>
                <span className="value">{blog.date}</span>
              </MetaItem>
              <MetaItem>
                <FaTag />
                <span className="label">Category:</span>
                <span className="value">{blog.category}</span>
              </MetaItem>
            </AuthorMeta>
          </HeaderContent>

          <FeaturedImage
            src={blogContent.header.coverImage}
            alt={blogContent.header.title}
            loading="eager"
          />

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

          <ShareSection>
            <ShareTitle>📢 Share this article with your network</ShareTitle>
            <ShareOptionsGrid>
              <ShareOption onClick={() => handleShare('twitter')} $color="#1DA1F2">
                <SiX /> Twitter
              </ShareOption>
              <ShareOption onClick={() => handleShare('facebook')} $color="#4267B2">
                <FaFacebookF /> Facebook
              </ShareOption>
              <ShareOption onClick={() => handleShare('linkedin')} $color="#0077B5">
                <FaLinkedinIn /> LinkedIn
              </ShareOption>
              <ShareOption onClick={() => handleShare('reddit')} $color="#FF5700">
                <FaReddit /> Reddit
              </ShareOption>
              <ShareOption onClick={() => handleShare('whatsapp')} $color="#25D366">
                <FaWhatsapp /> WhatsApp
              </ShareOption>
              <ShareOption onClick={() => handleShare('copy')} $color="#3925d3">
                <FaLink /> Copy Link
              </ShareOption>
              {navigator.share && (
                <ShareOption onClick={() => handleShare('native')} $color="#047a3f">
                  <FaShareAlt /> Share
                </ShareOption>
              )}
            </ShareOptionsGrid>
          </ShareSection>
        </MainContent>

        <Sidebar>
          {/* Recent Posts Section */}
          <SidebarSection>
            <SectionTitle>
              📝 Recent Posts
              <span>
                <FaChevronRight size={12} />
              </span>
            </SectionTitle>
            {recentPosts.length > 0 ? (
              <PostList>
                {recentPosts.map(post => (
                  <PostCard key={post.id} to={`/blog/${post.id}`}>
                    <PostImage
                      src={post.coverImage || 'https://via.placeholder.com/80x80'}
                      alt={post.title}
                      loading="lazy"
                    />
                    <PostInfo>
                      <PostCategory>{post.category}</PostCategory>
                      <PostTitle>{post.title}</PostTitle>
                      <PostDate>
                        <FaClock size={10} /> {post.date}
                      </PostDate>
                    </PostInfo>
                  </PostCard>
                ))}
              </PostList>
            ) : (
              <NoPosts>No recent posts available</NoPosts>
            )}
          </SidebarSection>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <SidebarSection>
              <SectionTitle>
                🔗 Related Articles
                <span>
                  <FaChevronRight size={12} />
                </span>
              </SectionTitle>
              <PostList>
                {relatedPosts.map(post => (
                  <PostCard key={post.id} to={`/blog/${post.id}`}>
                    <PostImage
                      src={post.coverImage || 'https://via.placeholder.com/80x80'}
                      alt={post.title}
                      loading="lazy"
                    />
                    <PostInfo>
                      <PostCategory>{post.category}</PostCategory>
                      <PostTitle>{post.title}</PostTitle>
                      <PostDate>
                        <FaClock size={10} /> {post.date}
                      </PostDate>
                    </PostInfo>
                  </PostCard>
                ))}
              </PostList>
            </SidebarSection>
          )}
        </Sidebar>
      </MainWrapper>
    </PageContainer>
  );
};

export default BlogDetail;