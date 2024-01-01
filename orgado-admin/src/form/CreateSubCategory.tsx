"use client";
import useGlobalContext from "@/hooks/use-context";
import { fetchCategoryData } from "@/redux/slices/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import NiceSelect from "@/utils/NiceSelect";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
interface FormData {
  subCategoryName: string;
  Categoryclass: string;
  categoryName: string;
  brandImg: string;
}

const CreateSubCategory = () => {
  const { header, user } = useGlobalContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [upload, setupload] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.categories
  );
  const selectHandler = () => {};
  useEffect(() => { 
    dispatch(fetchCategoryData());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setLoading(true);

    const subCategoryName = data.subCategoryName;
    const subcategoryclass = data.Categoryclass;
    const categoryName = selectedCategory;
    const userInfo = {
      subCategoryName,
      subcategoryclass,
      categoryName,
      brandImg: img,
    };
    axios
      .post(
        `${process.env.BASE_URL}setting/create-subcategory?email=${user?.email}`,
        userInfo,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          
          setupload(false);
          reset();
          toast.success("Brand Added")
        }else{
          toast.error("Brand Name Is Duplicate")
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
      setImg(imageUrl);
    } catch (error: any) {
      console.log(error.message);
    }
  };


  const handleClearImg = () =>{
    setupload(false)
    setImg("")

  }



  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (loading === "rejected") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-addsupplier-area  bg-white p-7 custom-shadow rounded-lg pt-5  mb-5"
      >
        <h4 className="text-[20px] font-bold text-heading mb-9">
          Create Brand
        </h4>
        <div className="grid grid-cols-12 gap-x-5">
          <div className="lg:col-span-4 md:col-span-6 col-span-12">
            <div className="cashier-select-field mb-5">
              <h5 className="text-[15px] text-heading font-semibold mb-3">
                Brand Name
              </h5>
              <div className="cashier-input-field-style">
                <div className="single-input-field w-full">
                  <input
                    type="text"
                    placeholder="Add Brand Name"
                    {...register("subCategoryName", {
                      required: "subCategoryName Name is required",
                    })}
                  />
                  {errors.subCategoryName && (
                    <span>{errors.subCategoryName.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 md:col-span-6 col-span-12">
            <div className="cashier-select-field mb-5">
              <h5 className="text-[15px] text-heading font-semibold mb-3">
                Brand icon
              </h5>
              <div className="cashier-input-field-style">
                <div className="single-input-field w-full">
                  <input
                    type="text"
                    placeholder="Add Here Font Awesome Class"
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
                Upload Brand Img 
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
                        src={img}
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

          <div className="lg:col-span-4 md:col-span-6 col-span-12">
            <div className="cashier-select-field mb-5">
              <h5 className="text-[15px] text-heading font-semibold mb-3">
               Select Category
              </h5>
              <div className="cashier-select-field-style">
                <NiceSelect
                  options={data}
                  defaultCurrent={0}
                  onChange={selectHandler}
                  name=""
                  setapiEndPoint={setSelectedCategory}
                  className="block"
                  placeholder="Selet Category"
                />
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

export default CreateSubCategory;
