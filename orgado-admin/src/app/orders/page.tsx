import OrderList from '@/components/orders/OrderList';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const OrderPage = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='Order History'>
               <OrderList/>
            </ContentWrapper>
        </>
    );
};

export default OrderPage;