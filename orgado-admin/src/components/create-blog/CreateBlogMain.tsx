"use client";

import moment from "moment/moment";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import useGlobalContext from "@/hooks/use-context";
interface FormData {
  title: string;
  blogDetails: string;
  img: string;
  subImg: string;
  date: string;
  author: string;
  commentsArray: [];
  authorEmail: string;
  comment: number;
}

const CreateBlogMain = () => {
  const { user, header } = useGlobalContext();
  const [upload, setupload] = useState<boolean>(false);
  const [blogImg, setBlogImg] = useState<string>("");
  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");
  const [loginError, setloginError] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setLoading(true);

    const title = data.title;
    const blogDetails = data.blogDetails;

    const blogInfo = {
      title,
      blogDetails,
      img: blogImg,
      date,
      commentsArray: [],
      author: user?.name,
      authorEmail: user?.email,
      comment: 0,
    };
    axios
      .post(
        `${process.env.BASE_URL}blog/create-blog?email=${user?.email}`,
        blogInfo,
        header
      )
      .then((res) => {
        switch (res.data.message) {
          case "success":
            reset();
            setupload(false);
            toast.success(`blog added`, {
              position: "top-left",
            });
            break;

          case "Already Exist":
            reset();
            setupload(false);
            setloginError("blog is Already Exist");
            toast.error(`blog is Already Exist`, {
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
          console.error("Unauthorized access");
        } else {
          console.error("Unauthorized access");
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
      setBlogImg(imageUrl);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleClearSingleImg = () => {
    setupload(false);
    setBlogImg("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px] px-7"
      >
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <h4 className="text-[20px] font-bold text-heading mb-9">
            Create Blog
          </h4>
          <div className="grid grid-cols-12 gap-x-5">
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Blog Title
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add Blog Title"
                      {...register("title", {
                        required: "subCategoryName Name is required",
                      })}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Blog Image
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full single-input-field-file">
                    
                    {upload === false ? (
                      <>
                       <label htmlFor="profileImage4">
                          <i className="fa-regular fa-folder-arrow-up"></i> File
                          Upload
                        </label>
                      <input
                        type="file"
                        id="profileImage4"
                        className="hidden"
                        accept="image/*"
                        onChange={handleSingleImgUpload}
                        required
                      />
                      </>
                    ) : (
                      <div className="img_upload_preview">
                        <Image
                          src={blogImg}
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
            <div className="lg:col-span-12 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Description
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    {/* <input
                      type="text"
                      placeholder="blog Brand/Manufacturer/sub Category"
                    /> */}
                    <textarea
                      placeholder="Add blog Details...."
                      {...register("blogDetails", {
                        required: "blogDetails is required",
                      })}
                    />
                    {errors.blogDetails && (
                      <span>{errors.blogDetails.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12">
              <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                <button className="btn-primary" type="submit">
                  Create Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateBlogMain;
