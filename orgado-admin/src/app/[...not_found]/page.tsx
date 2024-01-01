import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const page = () => {
    return (
        <>
           <ContentWrapper breadCampTitle='Error Page'>
                 <h1 className='text-5xl text-center mt-25'>Page Not Found</h1>
            </ContentWrapper>
        </>
    );
};

export default page;