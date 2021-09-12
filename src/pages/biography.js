import React from 'react';
import Seo from '../components/Shared/Seo';
import PageWrapper from '../components/Shared/pageWrapper';
import Biography from '../components/Biography/Biography-section';
import '../style/main.scss';

const BioPage = () => {
  return (
    <>
      <Seo />
      <PageWrapper footerLinkTo="#name">
        <Biography />
      </PageWrapper>
    </>
  );
};

export default BioPage;
