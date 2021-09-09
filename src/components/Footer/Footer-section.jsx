import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'gatsby';
import AboutImg from '../Image/AboutImg';
import footerData from '../../mock/footer.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const imgRegEx = /(\w+\.\w+)/g;

const { email, phone_Number, fbLink, instaLink, logo, alt } = footerData;

const linkToMail = `mailto:${email}`;
const linkToWhatsapp = `https://api.whatsapp.com/send?phone=${phone_Number}`;
const linkToPhoneNumber = `tel:+${phone_Number}`;

const Footer = ({ linkTo }) => {
  return (
    <Container fluid>
      <footer className="footer navbar-static-bottom">
        <Row className="footer-row">
          <Col className="footer-flex" md={6}>
            <div>
              <p className="footer__text">
                Our contacts:
                <br />
                <a rel="noopener noreferrer" href={linkToMail} target="_blank">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  {email}
                </a>
                <br />
                <a rel="noopener noreferrer" href={linkToWhatsapp} target="_blank">
                  <i className="fa fa-whatsapp" aria-hidden="true"></i>
                  {phone_Number}
                </a>
              </p>
            </div>
            <div>
              <hr />
              <p className="footer__text">
                All Rights Reserved{' '}
                <Link
                  id="dev-by"
                  to="/about-us/#staffDanylo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pavlo Yarmolyk
                </Link>{' '}
                <br />
                Copyright © {new Date().getFullYear()}
              </p>
            </div>
          </Col>
          <Col className="footer-flex" md={6}>
            <div>
              <p className="footer__text">
                Follow me:
                <br />
                <span id="share-buttons">
                  <a href={fbLink} target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-facebook-square" aria-hidden="true"></i>
                  </a>
                  <a href={instaLink} target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </span>
              </p>
            </div>
            <div>
              <hr />
              <p className="footer__text">
                Developed by{' '}
                <a
                  id="dev-by"
                  href="https://www.linkedin.com/in/pavlo-justcodeit/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Palo Criativo ®
                </a>
              </p>
            </div>
            <span className="back-to-top">
              <Link to={linkTo}>
                <i className="fa fa-angle-up fa" aria-hidden="true" />
              </Link>
            </span>
          </Col>
        </Row>
        <Row>
          <div className="footer-contacts-wrapper">
            <a href={linkToPhoneNumber} className="col-xs-3" rel="noopener noreferrer">
              <span className="fa fa-2x fa-mobile-phone"></span>
            </a>
            <a
              href={linkToWhatsapp}
              data-action="share/whatsapp/share"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="fa fa-2x fa-whatsapp"></span>
            </a>
            <a href={fbLink} className="col-xs-3" rel="noopener noreferrer" target="_blank">
              <span className="fa fa-2x fa-facebook"></span>
            </a>
            <a href={linkToMail} rel="noopener noreferrer" target="_blank">
              <span className="fa fa-2x fa-at"></span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <span className="fa fa-2x fa-map-marker"></span>
            </a>
          </div>
        </Row>
      </footer>
    </Container>
  );
};

export default Footer;
