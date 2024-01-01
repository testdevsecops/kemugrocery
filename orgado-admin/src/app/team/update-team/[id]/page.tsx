
import TeamUpdateMain from '@/components/team/update-team/TeamUpdateMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const UpdateTeamPage = ({ params }: { params: { id: string } }) => {
    const id =  params.id
    return (
        <>
            <ContentWrapper breadCampTitle='Update Team Member Info'>
              <TeamUpdateMain id={id}/>
            </ContentWrapper>
        </>
    );
};

export default UpdateTeamPage;