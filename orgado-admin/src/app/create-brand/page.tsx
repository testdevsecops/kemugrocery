
import AddButton from "@/components/common/AddButton";
import CreateSubCategory from "@/form/CreateSubCategory";
import ContentWrapper from "@/layout/sidebar/ContentWrapper";
import React from "react";

const CreateBrand = () => {
  return (
    <>
      <ContentWrapper breadCampTitle="Create Brand">
      <AddButton title="Create Category" link="create-category"/>
        <div className="cashier-content-area mt-[30px] px-7">
          <CreateSubCategory />
        </div>
      </ContentWrapper>
    </>
  );
};

export default CreateBrand;
