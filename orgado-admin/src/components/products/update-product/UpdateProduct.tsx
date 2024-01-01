"use client";
import { idType } from "@/interFace/interFace";
import { fetchCategoryData } from "@/redux/slices/categorySlice";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { ProductType, SubCategoryType } from "@/interFace/apiInterFace";
import Image from "next/image";
import { FormData } from "@/interFace/interFaceFour";
import Modal from "@/sheardComponent/Modal"; 
import UpdateBannerImg from "./UpdateBannerImg";
import { useRouter } from "next/navigation";
import UpdateMultipleImg from "./UpdateMultipleImg";
import useGlobalContext from "@/hooks/use-context";
import ChartPreloader from "@/preloaders/ChartPreloader";

const UpdateProduct = ({ id }: idType) => {
  const {header,user} = useGlobalContext()
  const [product, setProduct] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<SubCategoryType[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenTwo, setModalIsOpenTwo] = useState(false);
  const [changeImage, setchangeImage] = useState(false);
  const [changeImageTwo, setchangeImageTwo] = useState(false);
  const [delteImgs, setdelteImgs] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openModalTwo = () => setModalIsOpenTwo(true);
  const closeModalTwo = () => setModalIsOpenTwo(false);
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.categories
  );
  const router = useRouter();
  const myproduct = product[0];

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}product/single-products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [id, changeImage,changeImageTwo]);

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  const {
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setLoading(true);

    const productName = data.productName;
    const price = data.price ? Number(data.price) : myproduct?.price
    const oldPrice = myproduct?.oldPrice;
    const productQuantity = data.productQuantity ? Number(data.productQuantity) : myproduct?.productQuantity
    const categoryName = data.categoryName;
    const subcategoryName = data.subcategoryName;
    const productDetails = data.productDetails ? data.productDetails : myproduct.productDetails;

    const productInfo = {
      id: myproduct?._id,
      productName,
      price,
      oldPrice,
      productQuantity,
      subcategoryName,
      categoryName,
      productDetails,
    };

    axios
      .put(`${process.env.BASE_URL}product/update-product-info?email=${user?.email}`, productInfo,header)
      .then((res) => {
        if (res.data.message === "success") {
          router.push("/product");
          toast.success(`Product Updated`, {
            position: "top-left",
          });
        }
      })
      .catch((e) => {
        // toast.error(`Product Update Feaild`, {
        //     position: "top-left",
        //   });
        console.log(e.message)
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}setting/sub-category/${selectedCategory}`)
      .then((res) => {
        setSubCategories(res.data);
      })
      .catch((e) => console.log(e.message));
  }, [selectedCategory]);

  if (loading === "rejected") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
     {loading === "pending" && <ChartPreloader/>}
      {product.length ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="cashier-content-area mt-[30px] px-7"
        >
          <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
            <h4 className="text-[20px] font-bold text-heading mb-9">
              Update Product
            </h4>
            <div className="grid grid-cols-12 gap-x-5">
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Product Name
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct?.productName}
                        placeholder="Add Product Title"
                        {...register("productName", {
                          required: "subCategoryName Name is required",
                        })}
                      />
                      {errors.productName && (
                        <span className="error-message"> {errors.productName.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    {" "}
                    Price
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="number"
                        defaultValue={myproduct?.price}
                        placeholder="Add Product Price"
                        {...register("price", {
                          required: "price is required",
                        })}
                      />
                      {errors.price && <span className="error-message">{errors.price.message}</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    {" "}
                    Old Price
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="number"
                        defaultValue={myproduct?.oldPrice}
                        placeholder="Add Product Old Price"
                        readOnly
                      />
                    
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    {" "}
                    Quantity
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        defaultValue={myproduct?.productQuantity}
                        type="number"
                        placeholder="Add Product Quantity"
                        {...register("productQuantity", {
                          required: "productQuantity is required",
                        })}
                      />
                      {errors.productQuantity && (
                        <span>{errors.productQuantity.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Category
                  </h5>
                  <div className="cashier-select-field-style">
                    <select
                      className="block"
                      {...register("categoryName", {
                        required: "categoryName is required",
                      })}
                      onChange={handleCategoryChange}
                    >
                      <option> {myproduct?.categoryName} </option>
                      {data.length &&
                        data.map((item:any) => (
                          <option
                            key={item._id}
                            defaultValue={item.categoryName}
                          >
                            {" "}
                            {item.categoryName}{" "}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Brand/Manufacturer/sub Category
                  </h5>
                  <div className="cashier-select-field-style">
                    <select
                      className="block"
                      {...register("subcategoryName", {
                        required: "subcategoryName is required",
                      })}
                    >
                      <option> {myproduct?.subcategoryName} </option>
                      {subCategories.length &&
                        subCategories.map((item, index) => (
                          <option key={index}>{item.subCategoryName}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div
                onClick={openModal}
                className="lg:col-span-4 md:col-span-6 col-span-12"
              >
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Banner Image
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="img_upload_preview">
                      <Image
                        src={myproduct?.img}
                        alt="category Img"
                        width={500}
                        height={500}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 md:col-span-6 col-span-12">

                <div onClick={openModalTwo} className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Slider Images
                  </h5>
                  
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      {myproduct.productImages.length ? (
                        myproduct.productImages.map((item, index) => (
                          <div
                            key={index}
                            className="img_upload_preview_multiple"
                          >
                            <Image
                              src={item}
                              alt="category Img"
                              width={120}
                              height={120}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-12 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Description
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <textarea
                        defaultValue={myproduct?.productDetails}
                        placeholder="Add Product Details...."
                        {...register("productDetails", {
                          required: "productDetails is required",
                        })}
                      />
                      {errors.productDetails && (
                        <span className="error-message">{errors.productDetails.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12">
                <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                  <button className="btn-primary" type="submit">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ):
      <ChartPreloader/>
      }

      <Modal modalClass="custom-modal" overly="overlay" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <UpdateBannerImg
          myproduct={myproduct}
          setchangeImage={setchangeImage}
          closeModal={closeModal}
        />
      </Modal>

      <Modal modalClass="custom-modal" overly="overlay" isOpen={modalIsOpenTwo} onRequestClose={closeModalTwo}>
        
        <UpdateMultipleImg
          myproduct={myproduct}
          setchangeImage={setchangeImageTwo}
          setdelteImgs={setdelteImgs}
          closeModal={closeModalTwo}
        />
      </Modal>
    </>
  );
};

export default UpdateProduct;
