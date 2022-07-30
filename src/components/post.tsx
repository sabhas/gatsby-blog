import React from "react"
import { Card, CardTitle, CardText, CardSubtitle, CardBody } from "reactstrap"
import { Link } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

type PostProps = {
  title: string
  author: string
  path: string
  date: string
  body: string
  image?: IGatsbyImageData
  imageAlt: string
}

const Post = ({
  title,
  author,
  path,
  date,
  body,
  image,
  imageAlt,
}: PostProps) => (
  <Card>
    {image && (
      <Link to={path}>
        <GatsbyImage image={image} alt={imageAlt} />
      </Link>
    )}

    <CardBody>
      <CardTitle>
        <Link to={path}>{title}</Link>
      </CardTitle>
      <CardSubtitle>
        <span className="text-info">{date}</span> by{" "}
        <span className="text-info">{author}</span>
      </CardSubtitle>
      <CardText>{body}</CardText>
      <Link
        to={path}
        className="btn btn-outline-primary float-right text-uppercase"
      >
        Read more
      </Link>
    </CardBody>
  </Card>
)

export default Post
