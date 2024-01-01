import ReviewMain from '@/components/reviews/ReviewMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const ReviewPage = () => {
    return (
        <>
            <ContentWrapper breadCampTitle="Reviews & Rattings">
                <ReviewMain/>
            </ContentWrapper> 
        </>
    );
};

export default ReviewPage;