import UpdateProduct from "@/components/products/update-product/UpdateProduct";
import ContentWrapper from "@/layout/sidebar/ContentWrapper";
import React from "react";

const ProductUpdatePage = ({ params }: { params: { id: string } }) => {
    const id =  params.id
  return (
    <>
      <ContentWrapper breadCampTitle="Product Update">
        <UpdateProduct id={id}/>
      </ContentWrapper>
    </>
  );
};

export default ProductUpdatePage;
