"use client";
import useGlobalContext from "@/hooks/use-context";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UpdateMultipleImg = ({ myproduct, closeModal, setchangeImage }: any) => {
  const { header, user } = useGlobalContext();
  const [categoryImgs, setCategoryImgs] = useState<any[]>([]);

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
      if (response.data.success === true) {
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // clear image

  const handleClearImg = (index: string) => {
    const remainingImage = categoryImgs.filter((item) => item !== index);
    setCategoryImgs(remainingImage);
  };

  const updateInfo = {
    id: myproduct?._id,
    updateImages: categoryImgs,
  };

  const handleUpdateMultiple = () => {
    setchangeImage(false);
    axios
      .put(
        `${process.env.BASE_URL}product/update-multiple-img?email=${user?.email}`,
        updateInfo,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          closeModal();
          setchangeImage(true);
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

  const handleDeleteSingleImg = (item: string) => {
    setchangeImage(false);
    const info = {
      id: myproduct?._id,
      deletetImg: item,
    };
    axios
      .put(
        `${process.env.BASE_URL}product/delete-slider-img?email=${user?.email}`,
        info,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          closeModal();
          setchangeImage(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          console.error("Unauthorized access");
        } else {
          console.error("Unauthorized access");
        }
      });
  };

  return (
    <>
      <div className="modal_box_two">
        {myproduct?.productImages?.length ? (
          myproduct.productImages.map((item: string, index: number) => (
            <div key={index} className="img_upload_preview_multiple">
              <Image
                src={item}
                alt="category Img"
                width={120}
                height={120}
                style={{ width: "100%", height: "auto" }}
              />
              <button
                onClick={() => handleDeleteSingleImg(item)}
                className="custome_remove_icon"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ))
        ) : (
          <></>
        )}

        {categoryImgs.length ? (
          <>
            <div className="col-span-12">
              <h5>New Selected Image</h5>
              {categoryImgs.map((item, index) => (
                <div key={index} className="img_upload_preview_multiple">
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
              ))}
            </div>
          </>
        ) : (
          <></>
        )}

        {/* new upload images */}

        <div className="col-span-12 flex justify-between">
          <div className="col-span-6">
            <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
              <button
                onClick={closeModal}
                className=""
                type="submit"
              >
                Close
              </button>
            </div>
          </div>

          <div className="col-span-6">
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3"></h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full single-input-field-file">
                    <label htmlFor="profileImage">
                      <i className="fa-regular fa-folder-arrow-up"></i>
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12">
            <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
              <button
                onClick={handleUpdateMultiple}
                className="btn-primary"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateMultipleImg;
