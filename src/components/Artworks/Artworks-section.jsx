import React from 'react';
import { Zoom } from 'react-reveal';
import { Container, Col, Row } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import ArtworksListComponent from './Artworks-list-component';
import ArtworksFilterComponent from './Artworks-filter-component';
import { graphql, useStaticQuery } from 'gatsby';

const Artworkslist = () => (
  <>
    <div id="top" />
    <div className="artworks-list-bg" />
    <div className="overlay-artworks" />
    <Row className="artworks-filter-wrapper">
      <h1 className="align-left white">Filter Artworks</h1>
      <ArtworksFilterComponent />
    </Row>
    <Container>
      <Row className="artworks-list-message-wrapper">
        <h1 className="align-left">All Artworks</h1>
        <ArtworksListComponent />
      </Row>
    </Container>
  </>
);
export default Artworkslist;
