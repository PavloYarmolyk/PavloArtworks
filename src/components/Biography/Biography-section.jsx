import React from 'react';
import { Fade, Zoom } from 'react-reveal';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

export default function Bio() {
  const pageQuery = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { id: { eq: "2b19a414-619e-5118-ba6e-d1b2c1a81111" } }) {
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
  `);
  const node = pageQuery.allMarkdownRemark.edges[0].node;
  console.log(JSON.stringify(node));
  const json = JSON.stringify(node, null, 2);



  const { frontmatter, html } = node;

  const image = getImage(frontmatter.bioImage);

  if (frontmatter !== null) {
    return (
      <>
        <div id="name" />
        <div className="bio-bg" />
        <div className="overlay" />
        <div className="bio-message-wrapper">
          <div className="bio-intro">
            <GatsbyImage image={image} alt={frontmatter.title} />
            <h1>{frontmatter.title}</h1>
          </div>
          <div className="bio-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </>
    );
  } else return null;
}
