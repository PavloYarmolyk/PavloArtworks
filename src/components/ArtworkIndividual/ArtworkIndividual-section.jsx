import React from 'react';
import { Zoom } from 'react-reveal';
import HeadShake from 'react-reveal/HeadShake';
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

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
      <div id="top" />
      <Container className="individualSection_container">
        <Row>
          <Col lg={6} className="individualSection_description-wrapper mobile">
            <HeadShake>
              <h1 className="individualSection_header">{frontmatter.title}</h1>
            </HeadShake>
            <br />
            <span className="individualSection_date align-left">{frontmatter.date}</span>
            <h5 className="individualSection_made-of">{frontmatter.made_of_and_where}</h5>
            <br />
            <div className="individualSection_main-short-description">
              {frontmatter.mainShortDescription}
            </div>
          </Col>
          <Col className="individualSection-carousel-wrapper">
            {image && (
              <Zoom duration={500} delay={10}>
                <Carousel
                  isAutoPlaying
                  zIndexAtMax={10}
                  images={images}
                  canAutoPlay
                  className="carousel"
                  hasDotButtonsAtMax="bottom"
                  hasDotButtons="bottom"
                  hasThumbnailsAtMax={false}
                  hasThumbnails={false}
                  hasIndexBoardAtMax={false}
                  hasIndexBoard={false}
                  hasSizeButtonAtMax={false}
                  hasMediaButtonAtMax={false}
                  // objectFit="cover"
                  shouldMinimizeOnClick
                  // thumbnailHeight="80px"
                />
              </Zoom>
            )}
          </Col>
          <Col lg={6} className="individualSection_description-wrapper desktop">
            <HeadShake>
              <h1 className="individualSection_header">{frontmatter.title}</h1>
            </HeadShake>
            <br />
            <span className="individualSection_date align-left">{frontmatter.date}</span>
            <h5 className="individualSection_made-of">{frontmatter.made_of_and_where}</h5>
            <br />
            <div className="individualSection_main-short-description">
              {frontmatter.mainShortDescription}
            </div>
          </Col>
        </Row>
        <Row>
          <div className="bio-content" dangerouslySetInnerHTML={{ __html: html }} />
        </Row>
      </Container>
    </div>
  );
};

export default IndividualSection;

// https://www.npmjs.com/package/react-gallery-carousel
