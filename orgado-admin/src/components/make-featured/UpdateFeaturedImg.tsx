"use client"
import useGlobalContext from "@/hooks/use-context";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

const UpdateFeaturedImg = ({ myproduct, closeModal, setchangeImage }: any) => {
  const {header,user} = useGlobalContext()
  const [imgUpload, setimgUpload] = useState("");
  const [upload, setupload] = useState<boolean>(false);

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
      setimgUpload(imageUrl);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const updateInfo = {
    id: myproduct?._id,
    updateImage: imgUpload,
  };
  const handleUpdate = () => {
    axios
      .put(`${process.env.BASE_URL}product/update-offer-banner?email=${user?.email}`, updateInfo,header)
      .then((res) => {
        if (res.data.message === "success") {
          closeModal();
          setchangeImage(true);
        }
      })
      .catch((error)=>{
        if (error.response.status === 403) {
          console.error(
            "Unauthorized access"
          );
        } else {
          console.error("Unauthorized access");
        }
      })
  };

  return (
    <>
      <div className="modal_box">
        <div className="cashier-select-field mb-5">
          <div className="cashier-input-field-style">
            <div className="img_edete_preview">
              {upload === false ? (
                <Image
                  src={myproduct?.banner}
                  alt="category Img"
                  width={500}
                  height={500}
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <Image
                  src={imgUpload}
                  alt="category Img"
                  width={500}
                  height={500}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
            </div>
          </div>
        </div>

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
          {upload === false ? (
            <>
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
                          onChange={handleSingleImgUpload}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-span-6">
                <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                  <button
                    onClick={handleUpdate}
                    className="btn-primary"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateFeaturedImg;
