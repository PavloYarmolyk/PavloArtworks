import React from 'react';
import '../style/main.scss';
import Biography from '../components/Biography/Biography-section';
import PageWrapper from '../components/Shared/pageWrapper';
import Seo from '../components/Shared/Seo';

const BioPage = () => {
  return (
    <>
      <Seo />
      <PageWrapper footerLinkTo="#best-offers">
        <Biography />
      </PageWrapper>
    </>
  );
};

export default BioPage;
