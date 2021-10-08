import React from 'react';
import { Fade, Zoom } from 'react-reveal';
import { Link } from 'gatsby';
import heroData from '../../mock/hero.json';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

const imgRegEx = /(\w+\.\w+)/g;

const Hero = () => {
  const bgImageQuery = useStaticQuery(
    graphql`
      query {
        allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  formats: WEBP
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    `
  );
  const edges = bgImageQuery.allFile.edges;

  const image = edges.find(n =>
    n.node.relativePath.includes(heroData.backgroundImage_hero.match(imgRegEx))
  );

  if (!image) return ' ';

  const imageToGo = getImage(image.node);
  console.log(imageToGo);
  return (
    <div id="home" className="hero-wrapper">
      <GatsbyImage
        style={{
          gridArea: '1/1',
        }}
        alt=""
        image={imageToGo}
      />
      <div
        style={{
          gridArea: '1/1',
          position: 'relative',
          placeItems: 'center',
          display: 'grid',
        }}
      >
        {/* Any content here will be centered in the component */}
        <div>
          {/* <div className="overlay"></div> */}
          <div className="hero-message-wrapper">
            <Fade bottom duration={100} distance="30px">
              <h3 className="hero-overtitle">{heroData.overTitle}</h3>
            </Fade>
            <Fade bottom duration={200} distance="300px">
              <h2 className="hero-title">{heroData.title}</h2>
              <h2 className="hero-title-name">{heroData.afterTitle}</h2>
            </Fade>
          </div>
          <Zoom duration={500} delay={10}>
            <p className="hero-cta">
              <Link to="/biography">
                <span className="cta-btn--hero">{heroData.buttonOne}</span>
              </Link>
              <Link to="/artworks">
                <span className="cta-btn--hero">{heroData.buttonTwo}</span>
              </Link>
            </p>
          </Zoom>
        </div>
      </div>
    </div>
  );
};

export default Hero;
