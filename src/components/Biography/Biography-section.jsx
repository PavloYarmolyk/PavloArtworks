import React from 'react';
import { Fade, Zoom } from 'react-reveal';
import { Link } from 'gatsby';
import LogoImg from '../Image/LogoImg';
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
                bioImage 
              }
              html
            }
          }
        }
      }
    `
  );
  const edges = pageQuery.allMarkdownRemark.edges;
  // console.log(JSON.stringify(data));

  const BioComponent = edges.map(edge => {
    const image = getImage(edge.node.frontmatter.bioImage);
    const imgRegEx = /(\w+\.\w+)/g;
    return (
      <>
        <div id="name" />
        <div className="bio-bg" />
        <div className="overlay" />
        <div className="bio-message-wrapper">
          <div className="bio-intro">
            <GatsbyImage image={image} alt={edge.node.frontmatter.title} />
            <LogoImg
              filename={edge.node.frontmatter.bioImage.match(imgRegEx)}
              alt={edge.node.frontmatter.title}
            />
            <h1>{edge.node.frontmatter.title}</h1>
          </div>
          <div className="bio-content" dangerouslySetInnerHTML={{ __html: edge.node.html }} />
        </div>
      </>
    );
  });
  return <div>{BioComponent}</div>;
}

export default Bio;
