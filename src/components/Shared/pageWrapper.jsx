import React from 'react';
import Header from '../../components/Header/Header-section';
import Footer from '../../components/Footer/Footer-section';

function PageWrapper({ children, footerLinkTo }) {
  return (
    <div style={{width:'40%'}}>
      <Header />
      {children}
      <Footer linkTo={footerLinkTo} />
    </div>
  );
}

export default PageWrapper;
