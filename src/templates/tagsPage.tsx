import React from "react"
import { PageProps } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Badge, Button } from "reactstrap"
import { slugify } from "../utils"

const tagsPage = ({ pageContext }: any) => {
  const { tags, tagPostCounts } = pageContext
  return (
    <Layout pageTitle="All tags">
      <SEO title="All tags" keywords={["tags", "topics"]} />
      <ul>
        {tags.map((tag: any) => (
          <li key={tag} style={{ marginBottom: "10px" }}>
            <Button color="primary" href={`/tag/${slugify(tag)}`}>
              {tag}{" "}
              <Badge style={{ marginLeft: "5px" }} pill color="secondary">
                {tagPostCounts[tag]}
              </Badge>
            </Button>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default tagsPage
