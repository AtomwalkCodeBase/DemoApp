import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { newsletterData } from "./data";

/* ================= Animations ================= */
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(17, 20, 198, 0.4); }
  50% { box-shadow: 0 0 0 15px rgba(17, 20, 198, 0); }
`;

/* ================= Mock Data ================= */


/* ================= Layout Components ================= */
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

/* ================= Hero Section ================= */
const HeroSection = styled.section`
  background: #ffffff;
  padding: 80px 10% 60px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -150px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(17, 20, 198, 0.04) 0%, transparent 70%);
    border-radius: 50%;
  }
`;

const HeroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f0f0ff;
  border: 1px solid #d5d5ff;
  color: #1114c6;
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 24px;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    background: #1114c6;
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
`;

const HeroTitle = styled.h1`
  font-size: 56px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.15;
  position: relative;
  z-index: 1;

  span {
    color: #1114c6;
    position: relative;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.15rem;
  color: #64748b;
  max-width: 550px;
  margin: 0 auto 40px;
  line-height: 1.7;
  position: relative;
  z-index: 1;
`;

const HeroStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    gap: 25px;
    flex-wrap: wrap;
  }
`;

const HeroStat = styled.div`
  text-align: center;
`;

const HeroStatNumber = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: #1114c6;
`;

const HeroStatLabel = styled.div`
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 4px;
`;

/* ================= Cards Section ================= */
const CardsSection = styled.section`
  padding: 60px 10%;
  background: #fafbff;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: #64748b;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Card = styled.article`
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  animation: ${fadeInUp} 0.6s ease forwards;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(17, 20, 198, 0.12);
    border-color: #d5d5ff;
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 220px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardCategory = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  background: #1114c6;
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  z-index: 1;
`;

const CardBody = styled.div`
  padding: 24px;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;
`;

const MetaItem = styled.span`
  font-size: 0.8rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 12px;
  line-height: 1.4;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 18px;
`;

const ReadMore = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #1114c6;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: gap 0.3s ease;

  ${Card}:hover & {
    gap: 12px;
  }
`;

const ArrowIcon = styled.span`
  font-size: 1.1rem;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: translateX(3px);
  }
`;

/* ================= Main Component ================= */
const Newsletter = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleCardClick = (newsletter) => {
        navigate(`/newsletter/${newsletter.id}`, { state: { newsletter } });
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
                    <BreadcrumbItem active>Newsletter</BreadcrumbItem>
                </BreadcrumbList>
            </BreadcrumbContainer>

            {/* Hero Section */}
            <HeroSection>
                <HeroBadge>📬 Weekly Insights</HeroBadge>
                <HeroTitle>
                    Stay Ahead with Our <span>Newsletter</span>
                </HeroTitle>
                <HeroSubtitle>
                    Get the latest industry insights, expert tips, and product updates delivered straight to your inbox every week.
                </HeroSubtitle>
                {/* <HeroStats>
                    <HeroStat>
                        <HeroStatNumber>15k+</HeroStatNumber>
                        <HeroStatLabel>Subscribers</HeroStatLabel>
                    </HeroStat>
                    <HeroStat>
                        <HeroStatNumber>Weekly</HeroStatNumber>
                        <HeroStatLabel>Publication</HeroStatLabel>
                    </HeroStat>
                    <HeroStat>
                        <HeroStatNumber>4.9★</HeroStatNumber>
                        <HeroStatLabel>Reader Rating</HeroStatLabel>
                    </HeroStat>
                </HeroStats> */}
            </HeroSection>

            {/* Cards Section */}
            <CardsSection>
                <SectionHeader>
                    <SectionTitle>Latest Newsletters</SectionTitle>
                    <SectionSubtitle>
                        Explore our most recent publications packed with valuable insights
                    </SectionSubtitle>
                </SectionHeader>
                <CardsGrid>
                    {newsletterData.map((item) => (
                        <Card key={item.id} onClick={() => handleCardClick(item)}>
                            <CardImageWrapper>
                                <CardImage src={item.image} alt={item.title} />
                                <CardCategory>{item.category}</CardCategory>
                            </CardImageWrapper>
                            <CardBody>
                                <CardMeta>
                                    <MetaItem>📅 {item.date}</MetaItem>
                                    <MetaItem>⏱️ {item.readTime}</MetaItem>
                                </CardMeta>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                                <ReadMore>
                                    Read Article <ArrowIcon>→</ArrowIcon>
                                </ReadMore>
                            </CardBody>
                        </Card>
                    ))}
                </CardsGrid>
            </CardsSection>
        </PageWrapper>
    );
};

export default Newsletter;