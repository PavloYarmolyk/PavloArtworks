import React from 'react';
import { Zoom } from 'react-reveal';
import HeadShake from 'react-reveal/HeadShake';
import Tilt from 'react-tilt';
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

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
      <div id="top"></div>
      {/* <Zoom duration={500} delay={10}> */}
      {/* </Zoom> */}
      <Container className="individualSection-container">
        <Row>
          <Col lg={6} className="individualSection-description-wrapper">
            <HeadShake>
              <h1 className="individualSection-header">{frontmatter.title}</h1>
            </HeadShake>
            {frontmatter.additionalDescription && <div>{frontmatter.additionalDescription}</div>}
          </Col>
          <Col lg={6} className="individualSection-image-wrapper">
            {image && (
              <Carousel images={images} style={{ maxWidth: '100%', height: 500, width: 800 }} />
            )}
            <div className="individualSection-image-thumb-wrapper">
              {/* <Carousel images={images} style={{ height: 500, width: 800 }} /> */}
              {/* {imagesArray &&
                imagesArray.map(imageSl => (
                  <img className="individualSection-image-thumb" src={imageSl} alt={imageSl} />
                ))} */}
            </div>
          </Col>
        </Row>
      </Container>

      <div className="bio-content" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default IndividualSection;
