"use client";
import { idType } from "@/interFace/interFace";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { SubCategoryType } from "@/interFace/apiInterFace";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import NiceSelect from "@/utils/NiceSelect";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGlobalContext from "@/hooks/use-context";
import Modal from "@/sheardComponent/Modal";
import UpdateBrandImg from "./UpdateBrandImg";
import Image from "next/image";
interface FormData {
  subCategoryName: string;
  subcategoryclass: string;
  categoryName: string;
}
   
const UpdateSubCategoryMain = ({ id }: idType) => {
  const { user, header } = useGlobalContext();
  const [product, setProduct] = useState<SubCategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [changeImage, setchangeImage] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  const router = useRouter();
  const myproduct = product[0];

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}setting/sub-category-id/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((e) => console.log(e));
  }, [id,changeImage]);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setLoading(true);

    const subCategoryName = data.subCategoryName;
    const subcategoryclass = data.subcategoryclass;
    const categoryName = data.categoryName;
    const categoryInfo = {
      id: myproduct?._id,
      subCategoryName,
      categoryName,
      subcategoryclass,
    };

    axios
      .put(
        `${process.env.BASE_URL}setting/update-subcategory-info?email=${user?.email}`,
        categoryInfo,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          router.push("/brand");
          toast.success(`Brand Updated`, {
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

  if (loading === "rejected") {
    return <div>Error: {error}</div>;
  }

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      {product.length && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="cashier-addsupplier-area  bg-white p-7 custom-shadow rounded-lg pt-5 mb-5"
        >
          <h4 className="text-[20px] font-bold text-heading mb-9">
            Update Brand
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
                      defaultValue={myproduct?.subCategoryName}
                      placeholder="Add Category"
                      {...register("subCategoryName", {
                        required: "Sub CategoryName Name is required",
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
                  Category Icon Class (Font Awesome Icon)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      defaultValue={myproduct?.subcategoryclass}
                      {...register("subcategoryclass", {
                        required: "Sub categoryclass is required",
                      })}
                    />
                    {errors.subcategoryclass && (
                      <span>{errors.subcategoryclass.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
         

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                   Change Category
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



            <div
                onClick={openModal}
                className="lg:col-span-4 md:col-span-6 col-span-12"
              >
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Brand Logo
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="img_upload_preview">
                      <Image
                        src={myproduct?.brandImg}
                        alt="Category Img"
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
        </form>
      )}

      <Modal modalClass="custom-modal" overly="overlay" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <UpdateBrandImg
          myproduct={myproduct}
          setchangeImage={setchangeImage}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};

export default UpdateSubCategoryMain;
