import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';
import Content from './Content';
import AddButton from '@/components/common/AddButton';

const AddCategorySubCategoryMain = () => {
    return (
        <>
          <ContentWrapper breadCampTitle="Category">
              <AddButton title='Create Category' link='create-category'/>
              <Content/>
            </ContentWrapper>  
        </>
    );
};

export default AddCategorySubCategoryMain;