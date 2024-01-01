import RefundList from '@/components/refunds/RefundList';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const RefundPage = () => {
    return (
        <>
             <ContentWrapper breadCampTitle='Refund Request'>
               <RefundList/>
            </ContentWrapper>
        </>
    );
};

export default RefundPage;