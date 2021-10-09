import React from 'react';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'gatsby';

import ArtworksFilterComponent from './Artworks-filter-component';

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
  return (
    <>
      <div id="top" />
      <div className="artworks-list-bg" />
      <div className="overlay-artworks" />
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
