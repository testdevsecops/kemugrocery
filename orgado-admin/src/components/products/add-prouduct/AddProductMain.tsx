import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';
import AddProductContent from './AddProductContent';

const AddProductMain = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='Add Product'>
                <AddProductContent/>
            </ContentWrapper>
        </>
    );
};

export default AddProductMain;