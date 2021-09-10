import React from "react"
import "../style/main.scss"
import Hero from "../components/Hero/Hero-section"
import Seo from '../components/Shared/Seo'
import Header from '../components/Header/Header-section';


const IndexPage = () => {
  return (
    <>
      <Seo />
      <Header />
      <Hero />
    </>
  );
}

export default IndexPage
