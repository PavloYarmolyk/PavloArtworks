import React from 'react';
import { Zoom } from 'react-reveal';
import { Container, Col, Row } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
// Utilities
import kebabCase from 'lodash/kebabCase';

const ArtworksFilterComponent = () => {
  const pageQuery = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `
  );
  const data = pageQuery;

  const {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  } = data;

  const ArtworkFilterComponent = group.map(tag => {
    console.log(tag);
    return (
      <span key={tag.fieldValue} className="cta-btn cta-btn--filter">
        <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
          {tag.fieldValue} ({tag.totalCount})
        </Link>
      </span>
    );
  });

  return ArtworkFilterComponent;
};

export default ArtworksFilterComponent;
