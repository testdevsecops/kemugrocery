import UserTable from '@/components/manage-user/UserTable';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const ManageUserPage = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='Manage Users'>
               <UserTable/>
            </ContentWrapper>
        </>
    );
};

export default ManageUserPage;