import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './Blogs/firebase';

// Sample useBlogs hook with real-time listener
const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Set up real-time listener for blogs collection
    const unsubscribe = onSnapshot(
      collection(db, 'life_blogs'),
      (snapshot) => {
        const blogData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Ensure publishedAt is handled if not a Firestore Timestamp
          publishedAt: doc.data().publishedAt
            ? { seconds: doc.data().publishedAt.seconds || Math.floor(new Date(doc.data().publishedAt).getTime() / 1000) }
            : null,
          // Provide defaults for missing fields
          title: doc.data().title || 'Untitled',
          category: doc.data().category || 'Uncategorized',
          coverImage: doc.data().coverImage || doc.data().image || 'https://via.placeholder.com/350x200', // Fallback image
          excerpt: doc.data().excerpt || ''
        }));
        console.log('Fetched blogs:', blogData); // Debug fetched data
        setBlogs(blogData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching blogs:', err);
        setError(err.message || 'Failed to fetch blogs');
        setLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return { blogs, loading, error };
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  margin-top: 150px;
  position: relative;
  z-index: 1;
`;

const Header = styled.header`
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a365d;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  max-width: 700px;
  line-height: 1.6;
  animation: ${fadeIn} 0.8s ease-out 0.2s forwards;
  opacity: 0;
`;

const FilterSection = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.8s ease-out 0.4s forwards;
  opacity: 0;
  flex-direction: column;
  z-index: 10;
`;

const FilterControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 11;
`;

const CategorySection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  flex: 1;
  position: relative;
`;

const CategoryButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: ${props => props.active ? '#1a365d' : 'white'};
  color: ${props => props.active ? 'white' : '#1a365d'};
  border: 1px solid #1a365d;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: ${props => props.active ? '#1a365d' : '#f0f5ff'};
  }
`;

const ToggleCategoryButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: ${props => props.showCategories ? '#1a365d' : '#e2e8f0'};
  color: ${props => props.showCategories ? 'white' : '#4a5568'};
  border: none;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 12;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ClearFiltersButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SearchInput = styled.input`
  padding: 0.6rem 1.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  width: 250px;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 12;
  
  &:focus {
    outline: none;
    border-color: #1a365d;
    box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.1);
    width: 300px;
  }
`;

const CategoryListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
  width: 100%;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #4a5568;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f0f0f0;
    color: #ff6b6b;
    transform: scale(1.1);
  }
`;

const CategoryListTitle = styled.span`
  font-weight: 600;
  color: #1a365d;
  font-size: 1rem;
`;

const CategoryList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: ${props => props.show ? 'flex' : 'none'};
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 700px;
  padding: 1rem;
  margin-top: 0.8rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.3s ease-out;
  
  @media (max-width: 768px) {
    max-width: calc(100% - 2rem);
    left: 1rem;
    right: 1rem;
  }
`;

const CategoryButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SelectedFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 5;
`;

const SelectedFilterTag = styled.span`
  background: #1a365d;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    display: inline-flex;
    align-items: center;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  position: relative;
  z-index: 1;
`;

const BlogCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.index * 0.1 + 0.5}s;
  opacity: 0;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    
    img {
      transform: scale(1.05);
    }
  }
`;

const BlogImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogCategory = styled.span`
  display: inline-block;
  background: #e6f0ff;
  color: #1a365d;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const PostTitle = styled.h2`
  font-size: 1.4rem;
  color: #1a365d;
  margin-bottom: 0.8rem;
  line-height: 1.3;
`;

const BlogExcerpt = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #718096;
  font-size: 0.9rem;
`;

const Author = styled.span`
  color: #718096;
`;

const StyledDate = styled.span`
  color: #718096;
`;

const EmptyState = styled.div`
  text-align: center;
  grid-column: 1 / -1;
  padding: 3rem;
  background: #f8fafc;
  border-radius: 12px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 1rem;
`;

const ResetButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: #1a365d;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2c5282;
    animation: ${pulse} 0.5s ease-in-out;
  }
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #1a365d;
  padding: 3rem;
`;

const ErrorText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #ff4d4d;
  padding: 3rem;
`;

const BlogListingPage = () => {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const { blogs, loading, error } = useBlogs();
  const categoryListRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // Function to split category string and handle pipe-separated values
  const splitCategories = (categoryString) => {
    if (!categoryString || categoryString === 'Uncategorized') return ['Uncategorized'];

    // Split by pipe (|) or comma (,)
    const categories = categoryString.split(/[|,]/).map(cat => cat.trim());

    // Filter out empty strings
    return categories.filter(cat => cat.length > 0);
  };

  // Extract all unique categories from blogs (handling pipe-separated values)
  const getAllCategories = () => {
    const categorySet = new Set();

    blogs.forEach(blog => {
      const categories = splitCategories(blog.category);
      categories.forEach(cat => {
        categorySet.add(cat);
      });
    });

    // Convert Set to array and sort alphabetically
    return Array.from(categorySet).sort();
  };

  const availableCategories = getAllCategories();

  // Filter blogs based on selected categories and search term
  useEffect(() => {
    let results = blogs;

    // Filter by selected categories (multi-category support)
    if (selectedCategories.length > 0) {
      results = results.filter(blog => {
        const blogCategories = splitCategories(blog.category);
        // Blog matches if it has at least one of the selected categories
        return blogCategories.some(cat => selectedCategories.includes(cat));
      });
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(blog =>
        (blog.title && typeof blog.title === 'string' && blog.title.toLowerCase().includes(term)) ||
        (blog.excerpt && typeof blog.excerpt === 'string' && blog.excerpt.toLowerCase().includes(term)) ||
        (blog.category && typeof blog.category === 'string' && blog.category.toLowerCase().includes(term))
      );
    }

    setFilteredBlogs(results);
    console.log('Filtered Blogs:', results);
  }, [selectedCategories, searchTerm, blogs]);

  // Close category list when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking inside the category list
      if (categoryListRef.current && categoryListRef.current.contains(event.target)) {
        return;
      }

      // Don't close if clicking on the toggle button
      if (toggleButtonRef.current && toggleButtonRef.current.contains(event.target)) {
        return;
      }

      // Close if clicking outside
      if (showCategories) {
        setShowCategories(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategories]);

  const handleCategoryToggle = (category) => {
    // No need for stopPropagation here since we're handling it in the click outside logic
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        // Remove category if already selected
        return prev.filter(c => c !== category);
      } else {
        // Add category if not selected
        return [...prev, category];
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSearchTerm('');
    setShowCategories(false);
  };

  const removeCategory = (categoryToRemove) => {
    setSelectedCategories(prev => prev.filter(cat => cat !== categoryToRemove));
  };

  if (loading) {
    return (
      <PageContainer>
        <Header>
          <Title>The LifeIntelect Blog</Title>
          <Subtitle>
            Discover insights, innovations, and inspiration in technology, healthcare, education, and more.
          </Subtitle>
        </Header>
        <LoadingText>Loading blogs...</LoadingText>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Header>
          <Title>The LifeIntelect Blog</Title>
          <Subtitle>
            Discover insights, innovations, and inspiration in technology, healthcare, education, and more.
          </Subtitle>
        </Header>
        <ErrorText>Error: {error}</ErrorText>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Title>The LifeIntelect Blog</Title>
        <Subtitle>
          Discover insights, innovations, and inspiration in technology, healthcare, education, and more.
        </Subtitle>
      </Header>

      <FilterSection>
        <FilterControls>
          <CategorySection>
            <ToggleCategoryButton
              ref={toggleButtonRef}
              showCategories={showCategories}
              onClick={() => setShowCategories(!showCategories)}
            >
              {showCategories ? 'Hide Categories' : 'Show Categories'} ▼
            </ToggleCategoryButton>

            <SearchInput
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={handleSearchChange}
            />

            {(selectedCategories.length > 0 || searchTerm) && (
              <ClearFiltersButton onClick={clearAllFilters}>
                Clear All Filters
              </ClearFiltersButton>
            )}
          </CategorySection>
        </FilterControls>

        {/* Display selected filters as tags */}
        {(selectedCategories.length > 0 || searchTerm) && (
          <SelectedFilters>
            <span style={{ fontSize: '0.9rem', color: '#4a5568' }}>Active filters:</span>
            {selectedCategories.map(category => (
              <SelectedFilterTag key={category}>
                {category}
                <button onClick={() => removeCategory(category)}>×</button>
              </SelectedFilterTag>
            ))}
            {searchTerm && (
              <SelectedFilterTag>
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm('')}>×</button>
              </SelectedFilterTag>
            )}
          </SelectedFilters>
        )}

        {/* Category list that shows/hides on button click */}
        <CategoryList ref={categoryListRef} show={showCategories}>
          <CategoryListHeader>
            <CategoryListTitle>Select Categories</CategoryListTitle>
            <CloseButton onClick={() => setShowCategories(false)}>✕</CloseButton>
          </CategoryListHeader>
          <CategoryButtonsWrapper>
            {availableCategories.length > 0 ? (
              availableCategories.map(category => (
                <CategoryButton
                  key={category}
                  active={selectedCategories.includes(category)}
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category} ({blogs.filter(blog => splitCategories(blog.category).includes(category)).length})
                </CategoryButton>
              ))
            ) : (
              <span style={{ color: '#4a5568', padding: '0.5rem' }}>No categories available</span>
            )}
          </CategoryButtonsWrapper>
        </CategoryList>
      </FilterSection>

      {filteredBlogs.length > 0 ? (
        <BlogGrid>
          {filteredBlogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              index={index}
              onClick={() => {
                window.location.href = `/blog/${blog.id}`;
              }}
            >
              <BlogImageContainer>
                <BlogImage
                  src={blog.coverImage || blog.image || 'https://via.placeholder.com/350x200'}
                  alt={blog.title || 'Blog post'}
                />
              </BlogImageContainer>
              <BlogContent>
                <BlogCategory>{blog.category}</BlogCategory>
                <PostTitle>{blog.title || 'Untitled'}</PostTitle>
                <BlogExcerpt>{blog.tagline || blog.excerpt}</BlogExcerpt>
                <PostFooter>
                  <Author>By LifeIntelect team</Author>
                  <StyledDate>
                    {blog.date ? blog.date : 'No date'}
                  </StyledDate>
                </PostFooter>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
      ) : (
        <EmptyState>
          <EmptyStateText>No blogs found matching your criteria</EmptyStateText>
          <ResetButton onClick={clearAllFilters}>Reset Filters</ResetButton>
        </EmptyState>
      )}
    </PageContainer>
  );
};

export default BlogListingPage;