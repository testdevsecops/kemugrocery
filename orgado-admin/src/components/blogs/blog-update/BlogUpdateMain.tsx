"use client";
import { idType } from "@/interFace/interFace";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { blogDataType } from "@/interFace/apiInterFace";
import Image from "next/image";
import Modal from "@/sheardComponent/Modal";
import { useRouter } from "next/navigation";
import UpdateImg from "./UpdateImg";
import { toast } from "react-toastify";
import useGlobalContext from "@/hooks/use-context";
interface FormData{
    title: string;
    blogDetails: string;
    img: string; 
}

const BlogUpdateMain = ({ id }: idType) => {
  const {user,header} = useGlobalContext()
  const [product, setProduct] = useState<blogDataType[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [changeImage, setchangeImage] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const router = useRouter();
  const myproduct = product[0];

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}blog/single-blog/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [id, changeImage]);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();


  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setLoading(true);

    const title = data.title;
    const blogDetails = data.blogDetails;
    const blogInfo = {
      id: myproduct?._id,
      title,
      blogDetails,
    };
 
    axios
      .put(`${process.env.BASE_URL}blog/update-blog-info?email=${user?.email}`, blogInfo,header)
      .then((res) => {
        if (res.data.message === "success") {
          router.push("/blogs");
          toast.success(`blog Updated`, {
            position: "top-left",
          });
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


  return (
    <>
      {product.length && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="cashier-content-area mt-[30px] px-7"
        >
          <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
            <h4 className="text-[20px] font-bold text-heading mb-9">
              Update blog post
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
                        defaultValue={myproduct?.title}
                        placeholder="Add Product Title"
                        {...register("title", {
                          required: "subCategoryName Name is required",
                        })}
                      />
                      {errors.title && (
                        <span>{errors.title.message}</span>
                      )}
                    </div>
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
              {/* 
            
            show here all selected image end
            */}

              <div className="lg:col-span-12 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Description
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <textarea
                        defaultValue={myproduct?.blogDetails}
                        placeholder="Add Product Details...."
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
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      <Modal modalClass="custom-modal" overly="overlay" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <UpdateImg
          myproduct={myproduct}
          setchangeImage={setchangeImage}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};

export default BlogUpdateMain;
