"use client";

import moment from "moment/moment";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { ProductType, offerProductType } from "@/interFace/apiInterFace";
import Image from "next/image";
import Modal from "@/sheardComponent/Modal";
import { idType } from "@/interFace/interFace";
import useGlobalContext from "@/hooks/use-context";
import UpdateFeaturedImg from "./UpdateFeaturedImg";
interface FormData {
  productName: string;
  img: string;
  offerPersent: number;
  price: number;
}

const FeaturedProduct = ({ id }: idType) => {
  const { header, user } = useGlobalContext();
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [changeImage, setchangeImage] = useState(false);
  const [product, setProduct] = useState<ProductType[]>([]);
  const [offerProduct, setOfferProduct] = useState<offerProductType | any>({});
  const [categoryImg, setCategoryImg] = useState<string>("");
  const [upload, setupload] = useState<boolean>(false);
  const [buttonActive, setButtonActive] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number | string>(0);
  const [newPrice, setNewPrice] = useState<number | string>(0);
  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");
  const myproduct = product[0];
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}product/single-products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}product/offer-products/${id}`)
      .then((res) => {
        setOfferProduct(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [id, changeImage]);

  const [loginError, setloginError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10); // Parse the input value as an integer
    setInputValue(newValue);
    const discountPersent = myproduct?.price / 100;
    const discountAmount = discountPersent * newValue;
    const price = myproduct?.price - discountAmount;
    const roundedPrice = parseInt(price.toFixed(2));
    setNewPrice(roundedPrice);
    if (newValue > 0) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const productInfo = {
      productId: myproduct?._id,
      productName: myproduct?.productName,
      banner: categoryImg ? categoryImg : offerProduct?.banner,
      date,
      offerPersent: inputValue,
      price: newPrice,
      oldPrice: myproduct?.price,
      productDetails: myproduct?.productDetails,
    };

    axios
      .post(
        `${process.env.BASE_URL}product/create-offer?email=${user?.email}`,
        productInfo,
        header
      )
      .then((res) => {
        switch (res.data.message) {
          case "success":
            router.push("/product");
            setupload(false);
            toast.success(`Product added`, {
              position: "top-left",
            });
            break;
          case "custom error":
            setupload(false);
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
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px] px-7"
      >
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <h4 className="text-[20px] font-bold text-heading mb-9">
            Create Product Offer
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
                      readOnly
                      defaultValue={myproduct?.productName}
                      placeholder="Add Product Title"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading capitalize font-semibold mb-3">
                  Old Price
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="number"
                      readOnly
                      defaultValue={myproduct?.price}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Offer Persent
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="number"
                      defaultValue={inputValue || ""}
                      placeholder="Add Price Offer % "
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  New Price
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="number"
                      readOnly
                      defaultValue={newPrice || ""}
                      placeholder="New Price "
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Banner Image
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full single-input-field-file">
                    {offerProduct?.banner ? (
                      <>
                        <Image
                          onClick={openModal}
                          src={offerProduct?.banner}
                          alt="category Img"
                          width={500}
                          height={500}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </>
                    ) : (
                      <>
                        {upload === false ? (
                         <>
                         <label htmlFor="profileImage3">
                          <i className="fa-regular fa-folder-arrow-up"></i> File
                          Upload
                        </label>
                          <input
                            type="file"
                            id="profileImage3"
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12">
              <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                {buttonActive ? (
                  <button className="btn-primary" type="submit">
                    Save
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      <Modal modalClass="custom-modal" overly="overlay" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <UpdateFeaturedImg
          myproduct={offerProduct}
          setchangeImage={setchangeImage}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};

export default FeaturedProduct;
