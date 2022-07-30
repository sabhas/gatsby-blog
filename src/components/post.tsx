import React from "react"
import {
  Badge,
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
} from "reactstrap"
import { Link } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import { slugify } from "../utils"

type PostProps = {
  title: string
  author: string
  path: string
  date: string
  tags: string[]
  body: string
  image?: IGatsbyImageData
  imageAlt: string
}

const Post = ({
  title,
  author,
  path,
  date,
  tags,
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
      <ul className="post-tags">
        {tags.map((tag) => (
          <li key={tag}>
            <Link to={`/tag/${slugify(tag)}`}>
              <Badge color="primary" className="text-uppercase">
                {tag}
              </Badge>
            </Link>
          </li>
        ))}
      </ul>
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
