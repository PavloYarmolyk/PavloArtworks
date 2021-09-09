import React from 'react';
import Header from '../../components/Header/Header-section';
import Footer from '../../components/Footer/Footer-section';

function PageWrapper({ children, footerLinkTo }) {
  return (
    <div>
      <Header />
      {children}
      <Footer linkTo={footerLinkTo} />
    </div>
  );
}

export default PageWrapper;
