import React from 'react';
import { Zoom } from 'react-reveal';
import HeadShake from 'react-reveal/HeadShake';
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-gallery-carousel';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';
import 'react-gallery-carousel/dist/index.css';

const IndividualSection = ({ image, frontmatter, html, id }) => {
  const pageQuery = useStaticQuery(
    graphql`
      {
        allMarkdownRemark {
          edges {
            node {
              id
            }
            next {
              frontmatter {
                slug
                title
              }
              id
            }
            previous {
              frontmatter {
                slug
                title
              }
              id
            }
          }
        }
      }
    `
  );

  const edges = pageQuery.allMarkdownRemark.edges;
  const neighbourArtworks = edges.find(n => n.node.id.includes(id));

  const nextArtwork = neighbourArtworks.next
    ? `/${neighbourArtworks.next.frontmatter.slug}`
    : '/artworks';

  const nextArtworkTitle = neighbourArtworks.next
    ? neighbourArtworks.next.frontmatter.title
    : 'Go to AllArtworks';

  const previousArtwork = neighbourArtworks.previous
    ? `/${neighbourArtworks.previous.frontmatter.slug}`
    : '/artworks';

  const previousArtworkTitle =
    neighbourArtworks.previous && neighbourArtworks.previous.frontmatter.slug !== '/biography/bio'
      ? neighbourArtworks.previous.frontmatter.title
      : 'Go to AllArtworks';

  const rawSlderImages = frontmatter.sliderImage;

  const imagesArray = rawSlderImages
    ? rawSlderImages.map(image => image.image.childImageSharp.gatsbyImageData.images.fallback.src)
    : [];
  const images = imagesArray.map(imageSl => ({
    src: `${imageSl}`,
  }));

  return (
    <div className="individualSection_wrapper">
      <div id="top" />
      <Container className="individualSection_container">
        <Row>
          <Col lg={6} className="individualSection_description-wrapper mobile">
            <HeadShake>
              <h1 className="individualSection_header">{frontmatter.title}</h1>
            </HeadShake>
            <br />
            <span className="individualSection_date">{frontmatter.date}</span>
            <h5 className="individualSection_made-of">{frontmatter.made_of_and_where}</h5>
            <br />
            <div className="individualSection_main-short-description">
              {frontmatter.mainShortDescription}
            </div>
          </Col>
          <Col className="individualSection-carousel-wrapper ">
            {image && (
              <Zoom duration={500} delay={10}>
                <Carousel
                  canAutoPlay
                  zIndexAtMax={10}
                  images={images}
                  className="carousel"
                  hasDotButtons="bottom"
                  hasThumbnails={false}
                  shouldSwipeOnMouse
                  hasIndexBoard={false}
                  // hasSizeButtonAtMax={false}
                  // hasMediaButtonAtMax={false}
                  hasIndexBoardAtMax={false}
                  hasThumbnailsAtMax={false}
                  hasMediaButtonAtMax="topLeft"
                  hasSizeButtonAtMax="topRight"
                  hasMediaButton="topLeft"
                  hasSizeButton="topRight"
                  hasDotButtonsAtMax="bottom"
                  objectFit="contain"
                  // shouldMinimizeOnClick
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
            <span className="individualSection_date">{frontmatter.date}</span>
            <h5 className="individualSection_made-of">{frontmatter.made_of_and_where}</h5>
            <br />
            <div className="individualSection_main-short-description">
              {frontmatter.mainShortDescription}
            </div>
          </Col>
        </Row>
        <Row>
          <div className="bio-content" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="artworks-navigation">
            {neighbourArtworks.previous &&
              neighbourArtworks.previous.frontmatter.slug !== '/biography/bio' && (
                <Link to={previousArtwork} replace>
                  Previous Artwork : "{previousArtworkTitle}"
                </Link>
              )}
            {neighbourArtworks.next &&
              neighbourArtworks.next.frontmatter.slug !== '/biography/bio' && (
                <Link to={nextArtwork} replace>
                  Next Artwork : "{nextArtworkTitle}"
                </Link>
              )}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default IndividualSection;

// https://www.npmjs.com/package/react-gallery-carousel
