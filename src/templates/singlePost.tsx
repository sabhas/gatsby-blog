import React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { Badge, Card, CardBody, CardSubtitle, Row, Col } from "reactstrap"
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { slugify, authors } from "../utils"

type Props = {
  markdownRemark: {
    id: string
    html: string
    frontmatter: {
      title: string
      author: string
      date: string
      tags: string[]
      image_alt: string
      image: IGatsbyImageData
    }
  }
  file: any
}

const SinglePost = ({ data }: PageProps<Props>) => {
  const post = data.markdownRemark.frontmatter
  const author = authors.find((x) => x.name === post.author)
  const image = getImage(data.markdownRemark.frontmatter.image)

  console.log(data)

  return (
    <Layout
      pageTitle={post.title}
      author={author}
      authorImage={getImage(data.file)}
    >
      <SEO title={post.title} />
      <Card>
        {image && (
          <GatsbyImage
            className="card-image-top"
            image={image}
            alt={data.markdownRemark.frontmatter.image_alt}
          />
        )}
        <CardBody>
          <CardSubtitle>
            <span className="text-info">{post.date}</span> by{" "}
            <Link to={`/author/${slugify(post.author)}`}>
              <span className="text-info">{post.author}</span>
            </Link>
          </CardSubtitle>
          <ul className="post-tags">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link to={`/tag/${slugify(tag)}`}>
                  <Badge color="primary">{tag}</Badge>
                </Link>
              </li>
            ))}
          </ul>
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </CardBody>
      </Card>
    </Layout>
  )
}

export const postQuery = graphql`
  query blogPostBySlug($slug: String!, $imageUrl: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        author
        date(formatString: "MMM Do YYYY")
        tags
        image_alt
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    file(relativePath: { eq: $imageUrl }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`

export default SinglePost
