import React from 'react';
import { Zoom } from 'react-reveal';
import { Container, Col, Row } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import ArtworksListComponent from './Artworks-list-component';
import ArtworksFilterComponent from './Artworks-filter-component';
import { graphql, useStaticQuery } from 'gatsby';

const Artworkslist = ({ children }) => (
  <Container fluid>
    <div id="top" />
    <div className="artworks-list-bg" />
    <div className="overlay-artworks" />
    <Row className="artworks-filter-wrapper">
      <ArtworksFilterComponent />
    </Row>
    <Row className="artworks-list-message-wrapper">{children}</Row>
  </Container>
);
export default Artworkslist;
