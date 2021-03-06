import React from 'react';
import { Zoom } from 'react-reveal';
import { Col } from 'react-bootstrap';
import Tilt from 'react-tilt';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';

const ArtworksListComponent = () => {
  const pageQuery = useStaticQuery(
    graphql`
      {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              id
              frontmatter {
                tags
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
                made_of_and_where
              }
              excerpt(pruneLength: 100)
            }
          }
        }
      }
    `
  );
  const edges = pageQuery.allMarkdownRemark.edges;
  const ArtworkListComponent = edges
    .filter(edge => !!edge.node.frontmatter.featured)
    .map(edge => {
      const image = getImage(edge.node.frontmatter.featured);
      const linkToArtwork = edge.node.frontmatter.slug.replace('artworks/', '');
      return (
        <Col key={linkToArtwork} md={4}>
          <div className="artworks-list-intro">
            <Zoom duration={500} delay={10}>
              <Link to={linkToArtwork}>
                <Tilt
                  options={{
                    reverse: false,
                    max: 8,
                    perspective: 1000,
                    scale: 1,
                    speed: 300,
                    transition: true,
                    axis: null,
                    reset: true,
                    easing: 'cubic-bezier(.03,.98,.52,.99)',
                  }}
                >
                  <div className="artwork-image-wrapper rounded shadow-lg">
                    <GatsbyImage
                      className="artworks-list-image rounded shadow-lg"
                      image={image}
                      alt={edge.node.frontmatter.title}
                    />
                  </div>
                </Tilt>
                <h4 className="artworks-list-title">{edge.node.frontmatter.title}</h4>
              </Link>
            </Zoom>
            <div className="artworks-list-date">{edge.node.frontmatter.date}</div>
            <p className="artworks-list-about">{edge.node.frontmatter.made_of_and_where}</p>
          </div>
        </Col>
      );
    });

  return ArtworkListComponent;
};

export default ArtworksListComponent;
