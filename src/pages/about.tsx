import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout pageTitle="About Us">
    <SEO title="About" keywords={[`gatsby`, `application`, `react`]} />
    <p>Content of About page</p>
  </Layout>
)

export default AboutPage
