import FeaturedProduct from "@/components/make-featured/FeaturedProduct";
import UpdateProduct from "@/components/products/update-product/UpdateProduct";
import ContentWrapper from "@/layout/sidebar/ContentWrapper";
import React from "react";

const ProductFeaturedPage = ({ params }: { params: { id: string } }) => {
    const id =  params.id
  return (
    <>
      <ContentWrapper breadCampTitle="Product Update">
        <FeaturedProduct id={id}/>
      </ContentWrapper>
    </>
  );
};

export default ProductFeaturedPage;
