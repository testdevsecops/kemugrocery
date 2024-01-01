import ClientsOrder from '@/components/client-orders/ClientsOrder';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const ClientsProductPage = ({ params }: { params: { id: string } }) => {
    const id =  params.id

    return (
        <>
            <ContentWrapper breadCampTitle='Client Orders'>
              <ClientsOrder id={id}/>
            </ContentWrapper>
        </>
    );
};

export default ClientsProductPage;