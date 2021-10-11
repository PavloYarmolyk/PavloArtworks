import React from 'react';
import { Zoom } from 'react-reveal';
import heroData from '../../mock/hero.json';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

const imgRegEx = /(\w+\.\w+)/g;

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
        allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                gatsbyImageData(placeholder: DOMINANT_COLOR, formats: WEBP, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    `
  );
  const edgesAllMarkdownRemark = pageQuery.allMarkdownRemark.edges;
  const edges = pageQuery.allFile.edges;

  const imageDesktop = edges.find(n =>
    n.node.relativePath.includes(heroData.backgroundImage_hero.match(imgRegEx))
  );
  const imageMobile = edges.find(n =>
    n.node.relativePath.includes(heroData.backgroundImage_heroMobile.match(imgRegEx))
  );

  if (!imageDesktop) return ' ';

  if (!imageMobile) return ' ';

  const imageForDesktop = getImage(imageDesktop.node);
  const imageForMobile = getImage(imageMobile.node);

  const BioComponent = edgesAllMarkdownRemark
    .filter(edge => !!edge.node.frontmatter.bioImage)
    .map(edge => {
      const image = getImage(edge.node.frontmatter.bioImage);
      return (
        <div
          style={{
            display: 'grid',
          }}
          key={edge.node.frontmatter.title}
        >
          <div id="top" />
          <GatsbyImage
            className="artworks-list-bg desktop"
            alt=""
            image={imageForDesktop}
          />
          {/* <GatsbyImage
            style={{
              gridArea: '1/1',
            }}
            className="artworks-list-bg mobile"
            alt=""
            image={imageForMobile}
          /> */}
          <div
            style={{
              gridArea: '1/1',
              position: 'relative',
              placeItems: 'center',
              display: 'grid',
            }}
            className="bio-message-wrapper"
          >
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
        </div>
      );
    });
  return <div>{BioComponent}</div>;
};

export default Bio;
