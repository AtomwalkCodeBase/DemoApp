import React from "react";
import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const Section = styled.section`
  padding: 4rem 6rem;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.3rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  color: #0047ab;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;

`;

const Description = styled.p`
  max-width: 450px;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 260px;
  gap: 1.5rem;
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: #000;
  contain: layout paint;

  &:hover img {
    transform: scale(1.05);
  }

  &:hover .desc {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LargeCard = styled(Card)`
  grid-row: span 2;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 14px;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.2)
  );
`;

const Tag = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 10px;
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 8px;
  color: white;
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 6px;
`;

const CardDescription = styled.p`
  color: white;
  font-size: 0.85rem;
  line-height: 1.4;

  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
`;


// ✅ DATA ARRAY (your content)
const contentData = [
    {
        type: "BLOG",
        title: "Beyond Human Limits: AI-Powered Cancer Diagnosis ",
        description: "AI and Cancer / By Lifeintelect / 8 Minutes of reading ",
        link: "/blog/10S85EwTQ4KyLzmp8Zvo",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=70"
    },
    {
        type: "BLOG",
        title: "Securing the Digital Frontier: How AI Is Transforming Data Protection",
        description: "Smarter Defense for the Modern Cyber Frontier",
        link: "/blog/GmHSyVWztWTa1tlB9tsf",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=70"
    },
    {
        type: "BLOG",
        title: "When a Name Becomes a Trademark: The IPL Robot Dog Champak Controversy",
        description: "Champak vs BCCI / By Lifeintelect / 5 minutes of reading",
        link: "/blog/Ibb1KF27a5QryTWqrj8b",
        image: "https://www.chhotacfo.com/blog/wp-content/uploads/2024/03/trademark-registration-bangalore.jpg"
    },
    {
        type: "EVENT",
        title: "Lifeintelect Participates in IISc Women's Day Conference ",
        description: "Women's Day Conference /  2 minutes of reading",
        link: "/news/bfoVZAKEcxZgfyryemeY",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDLKVhFnnTDSImAn_AamNpSEEaS33N-1QwRA&s"
    },
    {
        type: "NEWS",
        title: "Lifeintelect Takes the Stage at Revolutionary Bio Manufacturing Summit in Gauhati",
        description: "Driving Biotech Innovation at Gauhati's Global Summit",
        link: "/news/5M17GGaMcmax8AP9LHnl",
        image: "https://newscenter.lbl.gov/wp-content/uploads/2025/04/XBD201805-00351-002.jpg"
    },
    {
        type: "EVENT",
        title: "World Intellectual Property Organisation (WIPO)",
        description: "Global forum for intellectual property services, policy, information, and cooperation.",
        link: "https://www.wipo.int/portal/en/index.html",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=70"
    },
    {
        type: "EVENT",
        title: "United States Patent and Trademark Office (USPTO)",
        description: "Federal agency for granting U.S. patents and registering trademarks.",
        link: "https://www.uspto.gov/",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=70"
    }
];

const LatestThinking = () => {
    return (
        <Section>
            {/* <Header> */}
            <Title>Latest Thinking</Title>
            {/* <Description>
                    Perspectives and research on how AI-driven enterprise platforms are transforming operations across industries from manufacturing and research laboratories to customer systems.
                </Description> */}
            {/* </Header> */}

            <Grid>
                {contentData.map((item, index) => {
                    const isLarge = index === 0 || index === 4;
                    const Component = isLarge ? LargeCard : Card;

                    return (
                        <Component
                            key={index}
                            onClick={() => window.open(item.link, "_blank")}
                        >
                            <Image loading="lazy" src={item.image} />

                            <Tag>{item.type}</Tag>

                            <Overlay>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription className="desc">
                                    {item.description}
                                </CardDescription>
                            </Overlay>
                        </Component>
                    );
                })}
            </Grid>
        </Section>
    );
};

export default LatestThinking;