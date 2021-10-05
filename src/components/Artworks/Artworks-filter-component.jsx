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
    return (
      <Link
        key={tag.fieldValue}
        to={`/tags/${kebabCase(tag.fieldValue)}/`}
        activeStyle={{ color: 'white' }}
        partiallyActive={true}
        className="cta-btn--filter"
      >
        {tag.fieldValue} ({tag.totalCount})
      </Link>
    );
  });

  return ArtworkFilterComponent;
};

export default ArtworksFilterComponent;
