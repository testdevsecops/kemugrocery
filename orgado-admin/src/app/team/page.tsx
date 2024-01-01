import TeamMain from '@/components/team/TeamMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const TeamPage = () => {
    return (
        <>
             <ContentWrapper breadCampTitle='All Team Members'>
              <TeamMain/>
            </ContentWrapper>
        </>
    );
};

export default TeamPage;