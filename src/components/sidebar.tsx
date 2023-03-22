import React from 'react'
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Form,
  FormGroup,
  Input
} from 'reactstrap'
import { graphql, StaticQuery, Link } from 'gatsby'
import { GatsbyImage, IGatsbyImageData, getImage } from 'gatsby-plugin-image'

import { Author } from '../utils'

type Props = {
  author?: Author
  authorImage?: IGatsbyImageData
}

const Sidebar = ({ author, authorImage }: Props) => (
  <div>
    {author && (
      <Card>
        {authorImage && (
          <GatsbyImage
            className='card-image-top'
            image={authorImage}
            alt="author's image"
          />
        )}

        <CardBody>
          <CardTitle className='text-center text-uppercase mb-3'>
            {author.name}
          </CardTitle>
          <CardText>{author.bio}</CardText>
          <div className='author-social-links text-center'>
            <ul>
              <li>
                <a
                  href={author.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='github'
                >
                  <i className='fab fa-github fa-lg' />
                </a>
              </li>
              <li>
                <a
                  href={author.twitter}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='twitter'
                >
                  <i className='fab fa-twitter fa-lg' />
                </a>
              </li>
              <li>
                <a
                  href={author.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='instagram'
                >
                  <i className='fab fa-instagram fa-lg' />
                </a>
              </li>
              <li>
                <a
                  href={author.google}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='google'
                >
                  <i className='fab fa-google fa-lg' />
                </a>
              </li>
              <li>
                <a
                  href={author.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='linkedin'
                >
                  <i className='fab fa-linkedin fa-lg' />
                </a>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    )}
    <Card>
      <CardBody>
        <CardTitle className='text-center text-uppercase mb-3'>
          Newsletter
        </CardTitle>
        <Form className='text-center'>
          <FormGroup>
            <Input
              type='email'
              name='email'
              placeholder='Your email address..'
            />
          </FormGroup>
          <button className='btn btn-outline-success text-uppercase'>
            Subscribe
          </button>
        </Form>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardTitle className='text-center text-uppercase'>
          Advertisement
        </CardTitle>
        <img
          src='https://via.placeholder.com/320x200'
          alt='Advert'
          style={{ width: '100%' }}
        />
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardTitle className='text-center text-uppercase mb-3'>
          Recent Posts
        </CardTitle>
        <StaticQuery
          query={sidebarQuery}
          render={(data) => (
            <div>
              {data.allMarkdownRemark.edges.map(({ node }: any) => (
                <CardForRecentPost key={node.id} node={node} />
              ))}
            </div>
          )}
        />
      </CardBody>
    </Card>
  </div>
)

const sidebarQuery = graphql`
  query sidebarQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          id
          frontmatter {
            title
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
        }
      }
    }
  }
`

export default Sidebar

const CardForRecentPost = ({ node }: any) => {
  const image = getImage(node.frontmatter.image)

  return (
    <Card key={node.id}>
      {image && (
        <Link to={node.fields.slug}>
          <GatsbyImage
            className='card-image-top'
            image={image}
            alt={node.frontmatter.image_alt}
          />
        </Link>
      )}

      <CardBody>
        <CardTitle>
          <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
        </CardTitle>
      </CardBody>
    </Card>
  )
}
