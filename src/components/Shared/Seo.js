import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);

  const { defaultTitle, defaultDescription, siteUrl, banner, ogLanguage, siteLanguage } =
    site.siteMetadata;

  const preparePathname = () =>
    pathname
      .match(/[a-z]+/g)
      .toString()
      .replace(/\w/, firstLetter => firstLetter.toUpperCase());
  ;

  let titleComplete = pathname === '/' ? 'Home' : preparePathname();


  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${banner}`,
    url: `${siteUrl}${pathname}`,
    lang: `${siteLanguage}`,
  };

  return (
    <Helmet>
      <html lang={seo.lang} />
      <title>{`Pavlo Yarmolyk || ${titleComplete}`}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {(article ? true : null) && <meta property="og:type" content="article" />}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && <meta property="og:description" content={seo.description} />}

      {seo.image && <meta property="og:image" content={seo.image} />}

      {seo.image && <meta property="og:locale" content={ogLanguage} />}

      <meta name="twitter:card" content="summary_large_image" />

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.image && <meta property="twitter:image" content={seo.image} />}

      {seo.description && <meta name="twitter:description" content={seo.description} />}
    </Helmet>
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
};

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        author
        banner
        facebook
        siteUrl
        siteLanguage
        pathPrefix
        ogLanguage
        headline
        titleAlt
      }
    }
  }
`;
