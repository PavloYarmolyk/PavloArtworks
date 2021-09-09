import React from "react"
import "../style/main.scss"
import Hero from "../components/Hero/Hero-section"
import Seo from '../components/Shared/Seo'


const IndexPage = () => {
  return (
    <>
      <Seo />
      <Hero />
    </>
  );
}

export default IndexPage
