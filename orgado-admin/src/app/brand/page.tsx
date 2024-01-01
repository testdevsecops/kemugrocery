import AddButton from "@/components/common/AddButton";
import SubCategories from "@/components/settings/SubCategories";
import ContentWrapper from "@/layout/sidebar/ContentWrapper";
import React from "react";

const BrandPage = () => {
  return (
    <>
      <ContentWrapper breadCampTitle="Brand">
        <AddButton title="Create Brand" link="create-brand" />
        <div className="m-5">
          <div className="right-div">
            <SubCategories />
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default BrandPage;
