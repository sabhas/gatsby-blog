import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import { getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"
import PaginationLinks from "../components/paginationLinks"

const IndexPage = () => {
  let pageHeader = "Blog"
  let JSX: React.ReactNode = null
  const search = location.search
  const searchQuery = new URLSearchParams(search).get("search")

  const queryData = useStaticQuery(indexQuery)

  if (searchQuery) {
    const index = queryData.localSearchPosts.index
    const store = queryData.localSearchPosts.store

    const results = useFlexSearch(searchQuery, index, store)

    pageHeader = `${results.length} post${
      results.length >= 1 ? "" : "s"
    } found related to "${searchQuery}"`

    JSX = results.map((node: any) => (
      <Post
        key={node.id}
        title={node.title}
        slug={node.slug}
        author={node.author}
        tags={node.tags}
        body={node.excerpt}
        date={node.date}
        image={getImage(node.image)}
        imageAlt={node.image_alt}
      />
    ))
  } else {
    const postsPerPage = 2
    const numberOfPages = Math.ceil(
      queryData.allMarkdownRemark.totalCount / postsPerPage
    )

    JSX = (
      <div>
        {queryData.allMarkdownRemark.edges.map(({ node }: any) => (
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
  }

  return (
    <Layout pageTitle={pageHeader}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      {JSX}
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
    localSearchPosts {
      index
      store
    }
  }
`
