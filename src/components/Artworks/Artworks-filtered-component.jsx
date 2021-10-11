import React from 'react';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'gatsby';
import heroData from '../../mock/hero.json';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';
import ArtworksFilterComponent from './Artworks-filter-component';

const imgRegEx = /(\w+\.\w+)/g;

const Artworkslist = ({ children }) => {
  const [filterFisibility, setFilterVisibility] = useState('opened artworks-filter-wrapper');
  const [filtersArrow, setFiltersArrow] = useState('fa fa-angle-up fa cta-btn--hero');

  const filtersVisibility = () => {
    if (filterFisibility === 'opened artworks-filter-wrapper') {
      setFilterVisibility('closed artworks-filter-wrapper');
      setFiltersArrow('fa fa-angle-up fa cta-btn--hero');
    } else {
      setFilterVisibility('opened artworks-filter-wrapper');
      setFiltersArrow('fa fa-angle-down fa cta-btn--hero');
    }
  };
  const bgImageQuery = useStaticQuery(
    graphql`
      query {
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
  const edges = bgImageQuery.allFile.edges;

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
  return (
    <>
      <div id="top" />
      <GatsbyImage className="artworks-list-bg desktop" alt="" image={imageForDesktop} />
      <GatsbyImage className="artworks-list-bg mobile" alt="" image={imageForMobile} />
      <div className="filter-container">
        <h1 className="align-left white filter-header">
          Artworks by Section{' '}
          <i className={filtersArrow} onClick={filtersVisibility} aria-hidden="true" />
        </h1>
        <div className={filterFisibility}>
          <Link
            to={'/artworks'}
            activeStyle={{ color: 'white' }}
            partiallyActive={true}
            className="cta-btn--filter"
          >
            All Artworks
          </Link>
          <ArtworksFilterComponent />
        </div>
      </div>

      <Row className="artworks-list-message-wrapper">{children}</Row>
    </>
  );
};
export default Artworkslist;
