import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"

import { Row, Col } from "reactstrap"

import Header from "./header"
import Footer from "./footer"
import Sidebar from "./sidebar"
import "../styles/index.scss"

import { Author } from "../utils"

type Props = {
  author?: Author
  authorImage?: IGatsbyImageData
  pageTitle: string
  children?: React.ReactNode
}

const Layout = ({ author, authorImage, pageTitle, children }: Props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
          crossOrigin="anonymous"
        />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="container" id="content">
          <h1>{pageTitle}</h1>
          <Row>
            <Col md="8">{children}</Col>
            <Col md="4">
              <Sidebar author={author} authorImage={authorImage} />
            </Col>
          </Row>
        </div>
        <Footer />
      </>
    )}
  />
)

export default Layout
