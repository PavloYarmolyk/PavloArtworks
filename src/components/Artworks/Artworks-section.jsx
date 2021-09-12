import React from 'react';
import { Zoom } from 'react-reveal';
import { Container, Col, Row } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

const Artworkslist = () => {
  const pageQuery = useStaticQuery(
    graphql`
      {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              id
              frontmatter {
                title
                slug
                date(formatString: "MMMM DD, YYYY")
                featured {
                  name
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, formats: WEBP, height: 250)
                  }
                }
                sliderImage {
                  image {
                    childImageSharp {
                      gatsbyImageData(
                        layout: CONSTRAINED
                        formats: WEBP
                        sizes: "(min-width: 267px) 267px, 60vw"
                        width: 520
                      )
                    }
                  }
                }
                Full_description
              }
              excerpt(pruneLength: 250)
            }
          }
        }
      }
    `
  );
  const edges = pageQuery.allMarkdownRemark.edges;

  const ArtworksListComponent = edges
    .filter(edge => !!edge.node.frontmatter.featured)
    .map(edge => {
      const image = getImage(edge.node.frontmatter.featured);
      return (
        <>
          <Col md={4}>
            <div className="artworks-list-intro">
              <Zoom duration={500} delay={10}>
                <GatsbyImage
                  className="rounded shadow-lg"
                  image={image}
                  alt={edge.node.frontmatter.title}
                />
                <h1 className="artworks-list-title">{edge.node.frontmatter.title}</h1>
              </Zoom>
              <hr />
              <p>{edge.node.excerpt}</p>
            </div>
            {/* <div className="artworks-list-content" dangerouslySetInnerHTML={{ __html: edge.node.html }} /> */}
          </Col>
        </>
      );
    });
  return (
    <Container fluid>
      <div id="top" />
      <div className="artworks-list-bg" />
      <div className="overlay" />
      <Row className="artworks-list-message-wrapper">
        {ArtworksListComponent}
        {/* <div className="artworks-list-content" dangerouslySetInnerHTML={{ __html: edge.node.html }} /> */}
      </Row>
    </Container>
  );
};

export default Artworkslist;
