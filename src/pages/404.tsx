import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const NotFoundPage = () => (
  <Layout pageTitle="Oups, Somethig went wrong..">
    <Link className="btn btn-primary text-uppercase" to={"/"}>
      Go home
    </Link>
  </Layout>
)

export default NotFoundPage
