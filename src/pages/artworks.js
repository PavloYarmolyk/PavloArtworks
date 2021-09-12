import React from 'react';
import Seo from '../components/Shared/Seo';
import PageWrapper from '../components/Shared/pageWrapper';
import Artworks from '../components/Artworks/Artworks-section';
import '../style/main.scss';

const ArtworksPage = () => {
  return (
    <>
      <Seo />
      <PageWrapper footerLinkTo="#name">
        <Artworks />
      </PageWrapper>
    </>
  );
};

export default ArtworksPage;
