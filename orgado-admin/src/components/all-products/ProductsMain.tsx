import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';
import ProductsList from './ProductsList';
import AddButton from '../common/AddButton';

const ProductsMain = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='All Products'>
                <AddButton title='Add Product' link='product/add-products'/> 
               <ProductsList/>
            </ContentWrapper>
        </>
    );
};

export default ProductsMain;