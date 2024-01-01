import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';
import OfeerProductList from './OfeerProductList';

const OfferProductMain = () => {
    return (
        <>
          <ContentWrapper breadCampTitle='Offer Products'>
               <OfeerProductList/>
            </ContentWrapper>  
        </>
    );
};

export default OfferProductMain;