import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <div>Support my page: <a href="https://richardguan.me"> costco.com </a> </div>
    <Link to="/">Go back to the homepage</Link>
    <div><Link to="/404.js">Don't click this!</Link></div>
  </Layout>
)

export default SecondPage
