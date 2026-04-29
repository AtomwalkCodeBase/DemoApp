// NewsletterDetail.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

/* ================= Animations ================= */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ================= Layout ================= */
const PageWrapper = styled.div`
  background: #ffffff;
  min-height: 100vh;
`;

const BreadcrumbContainer = styled.div`
  padding: 20px 10%;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const BreadcrumbList = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
`;

const BreadcrumbItem = styled.li`
  font-size: 0.9rem;
  color: ${(props) => (props.active ? "#1114c6" : "#64748b")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  cursor: ${(props) => (props.active ? "default" : "pointer")};
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => (props.active ? "#1114c6" : "#1114c6")};
  }
`;

const Separator = styled.span`
  color: #cbd5e1;
  font-size: 0.85rem;
  margin: 0 4px;
`;

const HomeIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 2px;
`;

const ContentContainer = styled.div`
  /* max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px; */
`;

const HeroImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease;

  @media (max-width: 768px) {
    height: 250px;
    border-radius: 12px;
  }
`;

const ArticleHeader = styled.div`
  margin-bottom: 40px;
  animation: ${fadeInUp} 0.6s ease forwards;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  background: #f0f0ff;
  color: #1114c6;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ArticleTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 20px;
  line-height: 1.2;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MetaBar = styled.div`
  display: flex;
  gap: 24px;
  padding-bottom: 30px;
  border-bottom: 1px solid #f1f5f9;

  @media (max-width: 768px) {
    gap: 16px;
    flex-wrap: wrap;
  }
`;

const MetaItem = styled.span`
  font-size: 0.9rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ArticleBody = styled.div`
  animation: ${fadeInUp} 0.8s ease forwards;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 35px 0 18px;
`;

const SectionSubtitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #334155;
  margin: 25px 0 14px;
`;

const SectionText = styled.p`
  font-size: 1.05rem;
  color: #475569;
  line-height: 1.9;
  margin-bottom: 20px;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 25px;
`;

const BulletItem = styled.li`
  font-size: 1rem;
  color: #475569;
  padding: 10px 0 10px 30px;
  position: relative;
  line-height: 1.7;

  &::before {
    content: "";
    position: absolute;
    left: 4px;
    top: 17px;
    width: 8px;
    height: 8px;
    background: #1114c6;
    border-radius: 50%;
  }
`;

const StepsList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0 0 25px;
  counter-reset: step;
`;

const StepItem = styled.li`
  font-size: 1rem;
  color: #475569;
  padding: 14px 0 14px 44px;
  position: relative;
  line-height: 1.7;
  counter-increment: step;

  &::before {
    content: counter(step);
    position: absolute;
    left: 4px;
    top: 14px;
    width: 28px;
    height: 28px;
    background: #1114c6;
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 700;
  }
`;

const ContentImage = styled.img`
  width: 100%;
  border-radius: 16px;
  margin: 25px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 2px solid #1114c6;
  color: #1114c6;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  margin-top: 60px;
  margin-left: 20px;
  &:hover {
    background: #1114c6;
    color: #ffffff;
    transform: translateX(-3px);
  }
`;

/* ================= Component ================= */
const NewsletterDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const newsletter = location.state?.newsletter;

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (!newsletter) {
    return (
      <PageWrapper>
        <ContentContainer>
          <SectionText>No newsletter data found.</SectionText>
          <BackButton onClick={() => handleNavigate("/newsletter")}>
            ← Back to Newsletters
          </BackButton>
        </ContentContainer>
      </PageWrapper>
    );
  }

  const renderSection = (section, index) => {
    switch (section.type) {
      case "text":
        return <SectionText key={index}>{section.content}</SectionText>;
      case "title":
        return <SectionTitle key={index}>{section.content}</SectionTitle>;
      case "subtitle":
        return <SectionSubtitle key={index}>{section.content}</SectionSubtitle>;
      case "bullets":
        return (
          <BulletList key={index}>
            {section.items.map((item, i) => (
              <BulletItem key={i}>{item}</BulletItem>
            ))}
          </BulletList>
        );
      case "steps":
        return (
          <StepsList key={index}>
            {section.items.map((item, i) => (
              <StepItem key={i}>{item}</StepItem>
            ))}
          </StepsList>
        );
      case "image":
        return <ContentImage key={index} src={section.src} alt={section.alt} />;
      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      {/* Breadcrumb */}
      <BreadcrumbContainer>
        <BreadcrumbList>
          <BreadcrumbItem onClick={() => handleNavigate("/")}>
            <HomeIcon>🏠</HomeIcon> Home
          </BreadcrumbItem>
          <Separator>›</Separator>
          <BreadcrumbItem onClick={() => handleNavigate("/newsletter")}>
            Newsletter
          </BreadcrumbItem>
          <Separator>›</Separator>
          <BreadcrumbItem active>{newsletter.title}</BreadcrumbItem>
        </BreadcrumbList>
      </BreadcrumbContainer>
      <ContentContainer>
        <BackButton onClick={() => handleNavigate("/newsletter")}>
          ← Back to Newsletters
        </BackButton>

        <iframe
          src={newsletter.url}
          title={newsletter.title}
          width="100%"
          height="600px"
          style={{ border: "none", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
        ></iframe>
      </ContentContainer>
    </PageWrapper>
  );
};

export default NewsletterDetail;