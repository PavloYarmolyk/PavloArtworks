// const webpack = require(`webpack`)

// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     plugins: [
//       new webpack.IgnorePlugin({
//         resourceRegExp: /^mini-css-extract-plugin$/,
//       }),
//     ],
//   })
// }
// const _ = require('lodash');
// const Promise = require('bluebird');
// const path = require('path');

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;

//   if (_.get(node, 'internal.type') === `MarkdownRemark`) {
//     // Get the parent node
//     const parent = getNode(_.get(node, 'parent'));

//     createNodeField({
//       node,
//       name: 'collection',
//       value: _.get(parent, 'sourceInstanceName'),
//     });
//   }
// };

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;

//   return new Promise((resolve, reject) => {
//     graphql(`
//       {
//         allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
//           edges {
//             node {
//               fields {
//                 collection
//               }
//               frontmatter {
//                 slug
//                 title
//               }
//             }
//           }
//         }
//       }
//     `).then(results => {
//       const allEdges = results.data.allMarkdownRemark.edges;

//       const blogEdges = allEdges.filter(edge => edge.node.fields.collection === `posts`);
//       const pageEdges = allEdges.filter(edge => edge.node.fields.collection === `pages`);

//       _.each(blogEdges, (edge, index) => {
//         const previous = index === blogEdges.length - 1 ? null : blogEdges[index + 1].node;
//         const next = index === 0 ? null : blogEdges[index - 1].node;

//         createPage({
//           path: `/posts/${edge.node.frontmatter.slug}`,
//           component: path.resolve('./src/layouts/Post.js'),
//           context: {
//             slug: edge.node.frontmatter.slug,
//             previous,
//             next,
//           },
//         });
//       });

//       _.each(pageEdges, (edge, index) => {
//         createPage({
//           path: `/${edge.node.frontmatter.slug}`,
//           component: path.resolve('./src/layouts/Page.js'),
//           context: {
//             slug: edge.node.frontmatter.slug,
//           },
//         });
//       });

//       resolve();
//     });
//   });
// };
// https://chipcullen.com/making-multiple-content-types-in-gatsby/

const path = require('path');
const _ = require('lodash');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // const blogPostTemplate = path.resolve('src/templates/blog.js');
  const tagTemplate = path.resolve('src/templates/tags.js');

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        edges {
          node {
            frontmatter {
              slug
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const posts = result.data.postsRemark.edges;

  // // Create post detail pages
  // posts.forEach(({ node }) => {
  //   createPage({
  //     path: node.frontmatter.slug,
  //     component: blogPostTemplate,
  //   });
  // });

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};
