import React, { useState } from "react";
import styled from "styled-components";

/* DATA */
const data = [
  {
    id: 1,
    tag: "BLOG",
    title: "Beyond Human Limits: AI-Powered Cancer Diagnosis",
    desc: "AI and Cancer / By Lifeintelect / 8 Minutes of reading",
    link: "/blog/GmHSyVWztWTa1tlB9tsf",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=70", // lab equipment / maintenance
  },
  {
    id: 2,
    tag: " BLOG",
    title: "Securing the Digital Frontier: How AI Is Transforming Data Protection",
    desc: "Smarter Defense for the Modern Cyber Frontier",
    link: "/blog/Ibb1KF27a5QryTWqrj8b",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=70", // seafood industry
  },
  {
    id: 3,
    tag: "NEWS",
    title: "Lifeintelect Takes the Stage at Revolutionary Bio Manufacturing Summit in Gauhati",
    desc: "Driving Biotech Innovation at Gauhati's Global Summit",
    img: "https://newscenter.lbl.gov/wp-content/uploads/2025/04/XBD201805-00351-002.jpg", // analytics / reports / dashboard
    link: "/news/5M17GGaMcmax8AP9LHnl",
  },
  {
    id: 4,
    tag: "EVENT",
    title: "Lifeintelect Participates in IISc Women's Day Conference",
    desc: "Women's Day Conference /  2 minutes of reading",
    link: "/news/bfoVZAKEcxZgfyryemeY",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDLKVhFnnTDSImAn_AamNpSEEaS33N-1QwRA&s", // healthcare / hospital
  },

];

/* SECTION */
export const Section = styled.section`
  padding: 5rem 6rem;
  background-color: #ffffff;
  background-image: url("https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/pattern-scale.svg");
  overflow: hidden;

  @media (max-width: 992px) {
    padding: 4rem 3rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

/* HEADER */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
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
  margin-bottom: 30px;

`;

const Description = styled.p`
  max-width: 450px;
  color: #555;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

/* CONTROLS */
export const Controls = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const Arrow = styled.button`
  width: 50px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background: #0047ab;
  color: white;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #000;
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 36px;
  }
`;

/* SLIDER */
export const SliderWrapper = styled.div`
  overflow: hidden;
`;

export const Slider = styled.div`
  display: flex;
  transition: transform 0.5s ease;

  /* Desktop: 3 cards */
  transform: ${({ index }) => `translateX(-${index * 33.333}%)`};

  @media (max-width: 992px) {
    /* Tablet: 2 cards */
    transform: ${({ index }) => `translateX(-${index * 50}%)`};
  }

  @media (max-width: 768px) {
    /* Mobile: 1 card */
    transform: ${({ index }) => `translateX(-${index * 100}%)`};
  }
`;

/* CARD */
export const Card = styled.div`
  min-width: 33.333%;
  height: 420px;
  position: relative;
  padding: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
  @media (max-width: 992px) {
    min-width: 50%;
    height: 380px;
  }

  @media (max-width: 768px) {
    min-width: 100%;
    height: 320px;
    padding: 0 5px;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &:hover .desc {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CardInner = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  /* border-radius: 12px; */
`;

/* IMAGE */
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s;
`;

/* OVERLAY */
export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;

  background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.1));
`;

/* TAG */
export const Tag = styled.div`
  background: rgba(0,0,0,0.5);
  padding: 6px 10px;
  font-size: 12px;
  color: white;
  width: fit-content;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

/* TITLE TEXT */
export const TitleText = styled.h3`
  color: white;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

/* DESCRIPTION */
export const Desc = styled.p`
  font-size: 0.9rem;
  color: white;
  opacity: 0;
  transform: translateY(20px);
  transition: 0.3s;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    opacity: 1; /* Always visible on mobile */
    transform: translateY(0);
  }
`;

const LatestThinking = () => {
  const [index, setIndex] = useState(0);
  const getVisibleCards = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  }
  const next = () => {
    if (index < data.length - getVisibleCards()) {
      setIndex(index + 1);
    }
  };
  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <Section>
      <Header>
        <div>
          <Title>Latest Thinking</Title>
          {/* <Subtitle>
            Latest Innovations in our Product Development
          </Subtitle> */}
        </div>

        <Controls>
          <Arrow onClick={prev}>←</Arrow>
          <Arrow onClick={next}>→</Arrow>
        </Controls>
      </Header>

      <SliderWrapper>
        <Slider index={index}>
          {data.map((item) => (
            <Card key={item.id} onClick={() => window.location.href = item.link}>
              <CardInner>
                <Image src={item.img} />

                <Overlay>
                  <Tag>{item.tag}</Tag>

                  <div>
                    <TitleText>{item.title}</TitleText>
                    <Desc className="desc">{item.desc}</Desc>
                  </div>
                </Overlay>
              </CardInner>
            </Card>
          ))}
        </Slider>
      </SliderWrapper>
    </Section>
  );
};

export default LatestThinking;