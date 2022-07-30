import React from "react"
import { graphql, PageProps, StaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import { Row, Col } from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import Post from "../components/post"

type DataProps = {
  allMarkdownRemark: {
    edges: [
      {
        node: {
          id: number
          frontmatter: {
            title: string
            date: string
            author: string
            path: string
            tags: string[]
            image: any
            image_alt: string
          }
          excerpt: string
        }
      }
    ]
  }
}

const IndexPage = ({ data }: PageProps<DataProps>) => {
  return (
    <Layout pageTitle="My Blog">
      <Row>
        <Col md="8">
          <StaticQuery
            query={indexQuery}
            render={(data) => {
              return (
                <div>
                  <SEO
                    title="Home"
                    keywords={[`gatsby`, `application`, `react`]}
                  />
                  {data.allMarkdownRemark.edges.map(({ node }: any) => (
                    <Post
                      title={node.frontmatter.title}
                      path={node.frontmatter.path}
                      author={node.frontmatter.author}
                      tags={node.frontmatter.tags}
                      body={node.excerpt}
                      date={node.frontmatter.date}
                      image={getImage(node.frontmatter.image)}
                      imageAlt={node.frontmatter.image_alt}
                    />
                  ))}
                </div>
              )
            }}
          />
        </Col>
        <Col md="4">
          <Sidebar />
        </Col>
      </Row>
    </Layout>
  )
}

export default IndexPage

const indexQuery = graphql`
  query indexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            path
            tags
            image_alt
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          excerpt
        }
      }
    }
  }
`
