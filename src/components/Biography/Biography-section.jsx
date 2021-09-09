import React from 'react';
import { Fade, Zoom } from 'react-reveal';
import { Link } from 'gatsby';
import BioImg from '../Image/AboutImg';
import bioData from '../../mock/hero.json';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

export default function Bio() {
  const pageQuery = useStaticQuery(graphql`
    query {
      markdownRemark(id: { eq: "2c894460-c959-5376-99bd-815d7d745032" }) {
        id
        frontmatter {
          title
          slug
          excerpt
          date
        }
        html
      }
    }
  `);

  const {
    markdownRemark: { frontmatter, html }
  } = pageQuery;
  return (
    <>
      <div className="bio-bg" />
      <div className="overlay"></div>
      <div className="bio-message-wrapper">
        <h1>{frontmatter.title}</h1>
        <div className="bio-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </>
  );
}
