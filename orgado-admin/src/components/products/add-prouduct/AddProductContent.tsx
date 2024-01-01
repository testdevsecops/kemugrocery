"use client";

import { fetchCategoryData } from "@/redux/slices/categorySlice";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { SubCategoryType } from "@/interFace/apiInterFace";
import Image from "next/image";
import useGlobalContext from "@/hooks/use-context";
import ChartPreloader from "@/preloaders/ChartPreloader";
import NiceSelect from "@/utils/NiceSelect";
import NiceSelectTwo from "@/utils/NiceSelectTwo";
interface FormData {
  productName: string;
  price: number;
  oldPrice: number;
  productQuantity: number;
  categoryName: string;
  subcategoryName: string;
  productDetails: string;
  productImages: any[];
  img: string;
  date: string;
  offer: boolean;
  offerPersent: number;
  rettings: number[];
  productStatus: string;
}

const AddProductContent = () => {
  const { header, user } = useGlobalContext();
  const [categoryImgs, setCategoryImgs] = useState<any[]>([]);
  const [categoryImg, setCategoryImg] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedsubCategory, setSelectedsubCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<SubCategoryType[]>([]);
  const [upload, setupload] = useState<boolean>(false);
  const [upload2, setupload2] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  const [loginError, setloginError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const productName = data.productName;
    const price = Number(data.price);
    const oldPrice = 0;
    const productQuantity = Number(data.productQuantity);
    const categoryName = selectedCategory;
    const subcategoryName = selectedsubCategory;
    const productDetails = data.productDetails;

    const productInfo = {
      productName,
      price,
      oldPrice,
      productQuantity,
      subcategoryName,
      categoryName,
      productDetails,
      productImages: categoryImgs,
      img: categoryImg,
      date,
      offer: false,
      offerPersent: 0,
      rettings: [],
      productStatus: "new",
    };
    axios
      .post(
        `${process.env.BASE_URL}product/create-product?email=${user?.email}`,
        productInfo,
        header
      )
      .then((res) => {
        switch (res.data.message) {
          case "success":
            reset();
            setCategoryImgs([]);
            setupload(false);
            setupload2(false);
            toast.success(`Product added`, {
              position: "top-left",
            });
            break;

          case "Already Exist":
            reset();
            setCategoryImgs([]);
            setupload(false);
            setupload2(false);
            setloginError("Product is Already Exist");
            toast.error(`Product is Already Exist`, {
              position: "top-left",
            });
            break;
          case "category not selected":
            setloginError("category not selected");
            toast.error(`category not selected`, {
              position: "top-left",
            });
            break;

          case "custom error":
            reset();
            setCategoryImgs([]);
            setupload(false);
            setupload2(false);
            setloginError("something is wrong");
            toast.error(`something is wrong`, {
              position: "top-left",
            });
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toast.error("CURD Operation Is Disabled");
        } else {
          toast.error("CURD Operation Is Disabled");
        }
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

  // handle multiple image
  const handleUploadImage = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_URL}`,
        formData
      );
      const imageUrl = response.data.data.url;
      setCategoryImgs((prevImages: any[]) => [...prevImages, imageUrl]);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // clear image

  const handleClearImg = (index: string) => {
    const remainingImage = categoryImgs.filter((item) => item !== index);
    setCategoryImgs(remainingImage);
  };

  // handle single image

  const handleSingleImgUpload = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_URL}`,
        formData
      );
      const imageUrl = response.data.data.url;
      if (response.data.success === true) {
        setupload(true);
      }
      setCategoryImg(imageUrl);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleClearSingleImg = () => {
    setupload(false);
    setCategoryImg("");
  };

  if (loading === "rejected") {
    return <div>Error: {error}</div>;
  }

  const selectHandler = () => {};
  const selectHandlerTwo = () => {};
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px] px-7"
      >
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <h4 className="text-[20px] font-bold text-heading mb-9">
            Create Product
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
                      placeholder="Add Product Title"
                      {...register("productName", {
                        required: "subCategoryName Name is required",
                      })}
                    />
                    {errors.productName && (
                      <span>{errors.productName.message}</span>
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
                      placeholder="Add Product Price"
                      {...register("price", {
                        required: "price is required",
                      })}
                    />
                    {errors.price && <span>{errors.price.message}</span>}
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
                  <NiceSelect
                    options={data}
                    defaultCurrent={0}
                    onChange={selectHandler}
                    name=""
                    setapiEndPoint={setSelectedCategory}
                    className="block"
                    placeholder="Select Category"
                  /> 

                </div>
                {
                  data?.length ? <></> : <> <p className="error-message my-1 capitalize"> <strong>warning</strong> : {`you can't add product without any category , please create category and brand  first`} </p> </>
                }
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Brand
                </h5>
                <div className="cashier-select-field-style">
                  <NiceSelectTwo
                    options={subCategories}
                    defaultCurrent={0}
                    onChange={selectHandlerTwo}
                    name=""
                    setapiEndPoint={setSelectedsubCategory}
                    className="block"
                    placeholder={subCategories?.length ? `Choose Brand` : "Info : Select Category First, From Category Field"}
                  />
                </div>
                
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Product Main Image (276 * 276)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full single-input-field-file">
                    {upload === false ? (
                      <>
                        <label htmlFor="profileImage1">
                          <i className="fa-regular fa-folder-arrow-up"></i> File
                          Upload
                        </label>
                        <input
                          type="file"
                          id="profileImage1"
                          className="hidden"
                          accept="image/*"
                          onChange={handleSingleImgUpload}
                          required
                        />
                      </>
                    ) : (
                      <div className="img_upload_preview">
                        <Image
                          src={categoryImg}
                          alt="category Img"
                          width={500}
                          height={500}
                          style={{ width: "100%", height: "auto" }}
                        />
                        <button
                          onClick={handleClearSingleImg}
                          className="custome_remove_icon"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Upload Multiple Image (376 * 376)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full single-input-field-file">
                    {upload2 === false ? (
                      <>
                        <label htmlFor="profileImage">
                          <i className="fa-regular fa-folder-arrow-up"></i> File
                          Upload
                        </label>
                        <input
                          type="file"
                          id="profileImage"
                          className="hidden"
                          accept="image/*"
                          onChange={handleUploadImage}
                          required
                        />
                      </>
                    ) : (
                      <div className="img_upload_preview">
                        <Image
                          src={categoryImg}
                          alt="category Img"
                          width={500}
                          height={500}
                          style={{ width: "100%", height: "auto" }}
                        />
                        <button
                          onClick={handleClearSingleImg}
                          className="custome_remove_icon"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    {categoryImgs.length ? (
                      categoryImgs.map((item, index) => (
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
                          <button
                            onClick={() => handleClearImg(item)}
                            className="custome_remove_icon"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
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
                      placeholder="Add Product Details...."
                      {...register("productDetails", {
                        required: "productDetails is required",
                      })}
                    />
                    {errors.productDetails && (
                      <span>{errors.productDetails.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12">
              <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                <button className="btn-primary" type="submit">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProductContent;
