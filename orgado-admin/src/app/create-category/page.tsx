import AddButton from '@/components/common/AddButton';
import CreateCategoryContent from '@/components/create-category/CreateCategoryContent';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const CreateCategoryAndSubCategory = () => {
    return (
        <>
            <ContentWrapper breadCampTitle="Create Category">
            <AddButton title="Create Brand" link="create-brand"/>
              <CreateCategoryContent/>
            </ContentWrapper>
        </>
    );
};

export default CreateCategoryAndSubCategory;