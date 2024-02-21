import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  pathPrefix: '/gatsby-blog',
  siteMetadata: {
    title: `My Blog`,
    description: 'A blog about advance concepts of web development',
    author: 'Sabir Hassan',
    siteUrl: `https://blog.sabhas.me`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts/`,
        name: 'posts'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/images/`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
              wrapperStyle: 'margin-bottom: 1.0725rem;'
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'posts',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: 'speed',

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allMarkdownRemark {
              nodes {
                id
                frontmatter {
                  title
                  date(formatString: "MMM Do YYYY")
                  author
                  tags
                  image_alt
                  image {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                fields {
                  slug
                }
                excerpt
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['title', 'excerpt'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        // store: ["id", "title"],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }: any) =>
          data.allMarkdownRemark.nodes.map((node: any) => ({
            id: node.id,
            title: node.frontmatter.title,
            slug: node.fields.slug,
            author: node.frontmatter.author,
            date: node.frontmatter.date,
            tags: node.frontmatter.tags,
            image_alt: node.frontmatter.image_alt,
            image: node.frontmatter.image,
            excerpt: node.excerpt
          }))
      }
    }
  ]
}

export default config
