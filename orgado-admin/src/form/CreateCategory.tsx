"use client";
import useGlobalContext from "@/hooks/use-context";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";


interface FormData {
  CategoryName: string;
  Categoryclass: string;
  categoryThumb: string;
}

const CreateCategory = () => {
  const { header,user } = useGlobalContext();
  const [loginError, setloginError] = useState<string>("");
  const [categoryImg, setCategoryImg] = useState<string>("");
  const [upload, setupload] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setLoading(true);

    const categoryName = data.CategoryName;
    const categoryclass = data.Categoryclass;
    const userInfo = {
      categoryName,
      categoryclass,
      categoryThumb: categoryImg,
    };

    axios
      .post(`${process.env.BASE_URL}setting/create-category?email=${user?.email}`, userInfo,header)
      .then((res) => {
        if (res.data.message === "success") {
          reset();
          setupload(false);
          toast.success("Category Added")

        }else{
          toast.error("Category Name Is Duplicate")
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
      if (response.data.success === true) {
        setupload(true);
      }
      setCategoryImg(imageUrl);
    } catch (error: any) {
      console.log(error.message);
    }
  };


  const handleClearImg = () =>{
    setupload(false)
    setCategoryImg("")

  }
 

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-addsupplier-area  bg-white p-7 custom-shadow rounded-lg pt-5 mb-5"
      >
        <h4 className="text-[20px] font-bold text-heading mb-9">
          Create Category
        </h4>
        <div className="grid grid-cols-12 gap-x-5">
          <div className="lg:col-span-4 md:col-span-6 col-span-12">
            <div className="cashier-select-field mb-5">
              <h5 className="text-[15px] text-heading font-semibold mb-3">
                Category Name
              </h5>
              <div className="cashier-input-field-style">
                <div className="single-input-field w-full">
                  <input
                    type="text"
                    placeholder="Add Category"
                    {...register("CategoryName", {
                      required: "Category Name is required",
                    })}
                  />
                  {errors.CategoryName && (
                    <span>{errors.CategoryName.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 md:col-span-6 col-span-12">
            <div className="cashier-select-field mb-5">
              <h5 className="text-[15px] text-heading font-semibold mb-3">
                Category icon
              </h5>
              <div className="cashier-input-field-style">
                <div className="single-input-field w-full">
                  <input
                    type="text"
                    placeholder="Add Font Awesome Class"
                    {...register("Categoryclass", {
                      required: "Class Name is required",
                    })}
                  />
                  {errors.Categoryclass && (
                    <span>{errors.Categoryclass.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 md:col-span-6 col-span-12">
            <div className="cashier-select-field mb-5">
              <h5 className="text-[15px] text-heading font-semibold mb-3">
                Category Logo (use small logo .png file)
              </h5>
              <div className="cashier-input-field-style">
                <div className="single-input-field w-full single-input-field-file">
              
                  {upload === false ? (
                    <>
                    <label htmlFor="profileImage7">
                          <i className="fa-regular fa-folder-arrow-up"></i> File
                          Upload
                        </label>
                    <input
                      type="file"
                      id="profileImage7"
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
                      <button onClick={handleClearImg} className="custome_remove_icon">
                      <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
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
      </form>
    </>
  );
};

export default CreateCategory;
