import React from 'react';
import Seo from '../components/Shared/Seo';
import PageWrapper from '../components/Shared/pageWrapper';
import Biography from '../components/Biography/Biography-section';
import '../style/main.scss';

const BioPage = () => {
  return (
    <>
      <Seo />
      <PageWrapper footerLinkTo="#top">
        <Biography />
      </PageWrapper>
    </>
  );
};

export default BioPage;
