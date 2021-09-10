import React from "react"
import { Fade, Zoom } from "react-reveal"
import { Link } from "gatsby"
import heroData from "../../mock/hero.json"

const Hero = () => (
  <div id="home" className="hero-wrapper">
    <div className="overlay"></div>
    <div className="hero-message-wrapper">
      <Fade bottom duration={100} distance="30px">
        <h3 className="hero-overtitle">{heroData.overTitle}</h3>
      </Fade>
      <Fade bottom duration={200} distance="300px">
        <h2 className="hero-title">{heroData.title}</h2>
        <h2 className="hero-title-name text-color-main">
          {heroData.afterTitle}
        </h2>
      </Fade>
    </div>
    <Zoom duration={500} delay={10}>
      <p className="hero-cta">
        <Link to="/biography">
          <span className="cta-btn cta-btn--hero">{heroData.buttonOne}</span>
        </Link>
        <Link to="/artworks">
          <span className="cta-btn cta-btn--hero">{heroData.buttonTwo}</span>
        </Link>
      </p>
    </Zoom>
  </div>
)

export default Hero
