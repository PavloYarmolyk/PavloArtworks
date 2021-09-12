import React from 'react';
import { Zoom } from 'react-reveal';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

const Bio = () => {
  const pageQuery = useStaticQuery(
    graphql`
      {
        allMarkdownRemark {
          edges {
            node {
              id
              frontmatter {
                title
                slug
                excerpt
                date
                bioImage {
                  name
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, formats: WEBP)
                  }
                }
              }
              html
            }
          }
        }
      }
    `
  );
  const edges = pageQuery.allMarkdownRemark.edges;

  const BioComponent = edges
    .filter(edge => !!edge.node.frontmatter.bioImage)
    .map(edge => {
      const image = getImage(edge.node.frontmatter.bioImage);
      return (
        <>
          <div id="top" />
          <div className="bio-bg" />
          <div className="overlay" />
          <div className="bio-message-wrapper">
            <div className="bio-intro">
              <Zoom duration={500} delay={10}>
                <GatsbyImage
                  className="rounded shadow-lg"
                  image={image}
                  alt={edge.node.frontmatter.title}
                />
                <h1>{edge.node.frontmatter.title}</h1>
              </Zoom>
            </div>
            <div className="bio-content" dangerouslySetInnerHTML={{ __html: edge.node.html }} />
          </div>
        </>
      );
    });
  return <div>{BioComponent}</div>;
};

export default Bio;
