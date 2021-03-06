process.noDeprecation = true; // https://github.com/webpack/webpack/issues/6568

const config = require('./src/mock/head.json');
const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

module.exports = {
  siteMetadata: {
    title: config.title,
    description: config.description,
    author: config.author,
    siteUrl: config.url + pathPrefix, // For gatsby-plugin-sitemap
    pathPrefix,
    titleAlt: config.titleAlt,
    description: config.description,
    banner: config.logo,
    headline: config.headline,
    siteLanguage: config.siteLanguage,
    ogLanguage: config.ogLanguage,
    author: config.author,
    facebook: config.facebook,
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `imagesPostUploads`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `bio`,
        path: `${__dirname}/src/bio`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `Artwork_specialArt`,
        path: `${__dirname}/src/Artwork_specialArt`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `Artwork_paintings`,
        path: `${__dirname}/src/Artwork_paintings`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
        ],
      },
    },
    // 'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.title,
        short_name: config.shortName,
        description: config.description,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: `standalone`,
        icon: config.favicon,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
