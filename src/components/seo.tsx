import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

type Props = {
  title: string
  description?: string
  lang?: string
  meta?: any[]
  keywords?: string[]
}

const SEO = ({
  description,
  lang = "en",
  meta = [],
  keywords = [],
  title,
}: Props) => {
  return (
    <StaticQuery
      query={SEOQuery}
      render={(data) => {
        const metaDescription =
          description || data.site.siteMetadata.description
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

export default SEO

const SEOQuery = graphql`
  query SEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
