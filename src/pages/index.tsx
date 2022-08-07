import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"
import PaginationLinks from "../components/paginationLinks"

const IndexPage = () => {
  return (
    <Layout pageTitle="Blog">
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <StaticQuery
        query={indexQuery}
        render={(data) => {
          const postsPerPage = 2
          const numberOfPages = Math.ceil(
            data.allMarkdownRemark.totalCount / postsPerPage
          )
          return (
            <div>
              {data.allMarkdownRemark.edges.map(({ node }: any) => (
                <Post
                  key={node.id}
                  title={node.frontmatter.title}
                  slug={node.fields.slug}
                  author={node.frontmatter.author}
                  tags={node.frontmatter.tags}
                  body={node.excerpt}
                  date={node.frontmatter.date}
                  image={getImage(node.frontmatter.image)}
                  imageAlt={node.frontmatter.image_alt}
                />
              ))}
              <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
            </div>
          )
        }}
      />
    </Layout>
  )
}

export default IndexPage

const indexQuery = graphql`
  query indexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2
    ) {
      totalCount
      edges {
        node {
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
  }
`
