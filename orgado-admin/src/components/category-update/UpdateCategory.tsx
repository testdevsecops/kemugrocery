"use client";
import { idType } from "@/interFace/interFace";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { CategoryType } from "@/interFace/apiInterFace";
import Image from "next/image";
import Modal from "@/sheardComponent/Modal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import UpdateCategoryImg from "./UpdateCategoryImg";
import useGlobalContext from "@/hooks/use-context";
interface FormData {
  categoryName: string;
  categoryclass: string;
  categoryThumb: string;
}

const UpdateCategory = ({ id }: idType) => {
  const { user, header } = useGlobalContext();
  const [product, setProduct] = useState<CategoryType[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [changeImage, setchangeImage] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const router = useRouter();
  const myproduct = product[0];

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}setting/single-category/${id}`)
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

    const categoryName = data.categoryName;
    const categoryclass = data.categoryclass;
    const categoryInfo = {
      id: myproduct?._id,
      categoryName,
      categoryclass,
    };

    axios
      .put(
        `${process.env.BASE_URL}setting/update-category-info?email=${user?.email}`,
        categoryInfo,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          router.push("/category");
          toast.success(`Category Updated`, {
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
              Update Category
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
                        defaultValue={myproduct?.categoryName}
                        placeholder="Add Product Title"
                        {...register("categoryName", {
                          required: "categoryName Name is required",
                        })}
                      />
                      {errors.categoryName && (
                        <span>{errors.categoryName.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Category Icon Class (Font Awesome Icon)
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct?.categoryclass}
                        placeholder="Add Product Details...."
                        {...register("categoryclass", {
                          required: "categoryclass is required",
                        })}
                      />
                      {errors.categoryclass && (
                        <span>{errors.categoryclass.message}</span>
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
                    Category Logo
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="img_upload_preview">
                      <Image
                        src={myproduct?.categoryThumb}
                        alt="category Img"
                        width={500}
                        height={500}
                        style={{ width: "100%", height: "auto" }}
                      />
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

      <Modal isOpen={modalIsOpen} modalClass="custom-modal" overly="overlay" onRequestClose={closeModal}>
        <UpdateCategoryImg
          myproduct={myproduct}
          setchangeImage={setchangeImage}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};

export default UpdateCategory;
