import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../components/Shared/Seo';
import PageWrapper from '../components/Shared/pageWrapper';
import Artworks from '../components/Artworks/Artworks-section';
import '../style/main.scss';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

export default function BlogTemplate({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const image = getImage(frontmatter.featured);
  return (
    <>
      <Seo />
      <PageWrapper footerLinkTo="#name">
        {image && <GatsbyImage image={image} alt={frontmatter.featured.name} />}
      </PageWrapper>
    </>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        featured {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, formats: WEBP, height: 390)
          }
          name
        }
        sliderImage {
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, formats: WEBP, height: 390)
            }
          }
        }
        date(formatString: "MMMM DD, YYYY")
        slug
        tags
        title
      }
      html
    }
  }
`;
