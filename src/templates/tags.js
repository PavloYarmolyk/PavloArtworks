import React from 'react';
import PropTypes from 'prop-types';
import { Zoom } from 'react-reveal';
import { Container, Col, Row } from 'react-bootstrap';
import Seo from '../components/Shared/Seo';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PageWrapper from '../components/Shared/pageWrapper';
import ArtworksFiltered from '../components/Artworks/Artworks-filtered-component';
import '../style/main.scss';

// Components
import { Link, graphql } from 'gatsby';

const Tags = ({ pageContext, data }) => {
  let { tag } = pageContext;
  tag = tag.toUpperCase();
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} Artwork${totalCount === 1 ? '' : 's'} found in ${tag}`;
  return (
    <>
      <Seo />
      <PageWrapper footerLinkTo="#name">
        <Container>
          <ArtworksFiltered>
            <div>
              <h1 className="align-left">{tagHeader}</h1>
              <Row>
                {edges.map(({ node }) => {
                  const { featured, date, title, slug, made_of_and_where } = node.frontmatter;
                  const image = getImage(featured);
                  const linkTo = `/${slug}`;
                  return (
                    <Col md={4}>
                      <div className="artworks-list-intro">
                        <Zoom duration={500} delay={10}>
                          <Link to={linkTo}>
                            <GatsbyImage
                              className="artworks-list-image rounded shadow-lg"
                              image={image}
                              alt={title}
                            />
                            <h4 className="artworks-list-title">{title}</h4>
                          </Link>
                        </Zoom>
                        <div className="artworks-list-date">{date}</div>
                        <p className="artworks-list-about">{made_of_and_where}</p>
                      </div>
                    </Col>
                  );
                })}
              </Row>
              {/* <Link to="/tags">All tags</Link> */}
            </div>
          </ArtworksFiltered>
        </Container>
      </PageWrapper>
    </>
  );
};

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export default Tags;

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            slug
            title
            date(formatString: "MMMM DD, YYYY")
            featured {
              name
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, formats: WEBP, height: 250)
              }
            }
            made_of_and_where
          }
          excerpt(pruneLength: 100)
        }
      }
    }
  }
`;
