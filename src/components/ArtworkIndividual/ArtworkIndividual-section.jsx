import React from 'react';
import { Zoom } from 'react-reveal';
import HeadShake from 'react-reveal/HeadShake';
import Tilt from 'react-tilt';
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const IndividualSection = ({ image, frontmatter, html, name }) => {
  const rawSlderImages = frontmatter.sliderImage;
  console.log(rawSlderImages);

  const imagesArray = rawSlderImages
    ? rawSlderImages.map(image => image.image.childImageSharp.gatsbyImageData.images.fallback.src)
    : [];
  const images = imagesArray.map(imageSl => ({
    src: `${imageSl}`,
  }));
  console.log(imagesArray);
  return (
    <div>
      <div id="top"/>
      <Container className="individualSection-container">
        <Row>
          <Col lg={6} className="individualSection-description-wrapper mobile">
            <HeadShake>
              <h1 className="individualSection-header">{frontmatter.title}</h1>
            </HeadShake>
            <hr className="styled-hr" />
            <span>{frontmatter.date}</span>
            <h5>{frontmatter.made_of_and_where}</h5>
            <hr className="styled-hr" />
            <div className="main-short-description">{frontmatter.mainShortDescription}</div>
          </Col>
          <Col className="individualSection-carousel-wrapper">
            {image && (
              <Zoom duration={500} delay={10}>
                <Carousel
                  isAutoPlaying
                  shouldMaximizeOnClick
                  hasIndexBoard="buttomCenter"
                  images={images}
                  className="carousel"
                />
              </Zoom>
            )}
          </Col>
          <Col lg={6} className="individualSection-description-wrapper desktop">
            <HeadShake>
              <h1 className="individualSection-header">{frontmatter.title}</h1>
            </HeadShake>
            <hr className="styled-hr" />
            <span>{frontmatter.date}</span>
            <h5>{frontmatter.made_of_and_where}</h5>
            <hr className="styled-hr" />
            <div className="main-short-description">{frontmatter.mainShortDescription}</div>
          </Col>
        </Row>
        <hr />
        <Row>
          <div className="bio-content" dangerouslySetInnerHTML={{ __html: html }} />
        </Row>
      </Container>
    </div>
  );
};

export default IndividualSection;

// https://www.npmjs.com/package/react-gallery-carousel
