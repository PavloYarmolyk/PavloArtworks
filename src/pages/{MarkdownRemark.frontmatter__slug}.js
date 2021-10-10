import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../components/Shared/Seo';
import PageWrapper from '../components/Shared/pageWrapper';
import '../style/main.scss';
import { getImage } from 'gatsby-plugin-image';
import ArtworkIndividual from '../components/ArtworkIndividual/ArtworkIndividual-section';

export default function BlogTemplate({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html, id } = markdownRemark;
  const image = getImage(frontmatter.featured);
  const name = frontmatter.featured ? frontmatter.featured.name : '';
  return (
    <>
      <Seo />
      <PageWrapper footerLinkTo="#top">
        <ArtworkIndividual
          frontmatter={frontmatter}
          html={html}
          image={image}
          name={name}
          id={id}
        />
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
        mainShortDescription
        made_of_and_where
        slug
        tags
        title
      }
      id
      html
    }
  }
`;

// next {
//   frontmatter {
//     slug
//   }
// }
// previous {
//   frontmatter {
//     slug
//   }
// }
