"use client";
import { CategoryType } from "@/interFace/apiInterFace";
import Scrollbar from "smooth-scrollbar";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import deleteIcon from "../../../public/assets/img/icon/action-6.png";
import updateIcon from "../../../public/assets/img/icon/action-2.png";
import Image from "next/image";
// import Scrollbar from "smooth-scrollbar"
import { toast } from "react-toastify";
import Link from "next/link";
import useGlobalContext from "@/hooks/use-context";
import ChartPreloader from "@/preloaders/ChartPreloader";
const AllCategory = () => {
  const { header, user } = useGlobalContext();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [match, setMatch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setloading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const handleOpen = (id: string) => {
    setMatch(id);
    setOpen(!open);
  };
  const handleDeleteCategory = (id: string) => {
    axios
      .delete(
        `${process.env.BASE_URL}setting/delete-category?id=${id}&email=${user?.email}`,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          const remainingProduct = categories.filter((item) => item._id !== id);
          setCategories(remainingProduct);
          toast.success(`Category Deleted`, {
            position: "top-left",
          });
        }
        if (res.data.message === "something is wrong") {
          toast.error(`Something Is Wrong`, {
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
  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
    setloading(true);
    axios
      .get(
        `${process.env.BASE_URL}setting/search-categroy?search=${searchValue}`
      )
      .then((res) => {
        setCategories(res.data);
        setloading(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setloading(true);
    axios
      .get(`${process.env.BASE_URL}setting/category`)
      .then((res) => {
        setCategories(res.data);
        setloading(false);
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollbar = Scrollbar.init(scrollContainerRef.current, {
        damping: 0.2,
      });

      return () => {
        scrollbar.destroy();
      };
    }
  }, []);

  return (
    <>
      <div className="cashier-addsupplier-area  bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
        <div className="cashier-table-header-search-area">
          <div className="grid grid-cols-12 gap-x-5 mb-7 pb-0.5">
            <div className="md:col-span-6 col-span-12">
              <div className="cashier-table-header-search relative maxSm:mb-4">
                <input
                  type="text"
                  placeholder="Search Category"
                  value={searchValue}
                  onChange={handleInputChange}
                />
                <span>
                  <i className="fa-light fa-magnifying-glass"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <h4 className="text-[20px] font-bold text-heading mb-9">
          All Category
        </h4>
        <div
          ref={scrollContainerRef}
          className="cashier-salereturns-table-area table-height"
        >
          <div className="cashier-category-wrapper">
            <div className="border border-solid border-grayBorder border-b-0 mb-7">
              <div className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12">
                <div className="cashier-salereturns-table-dateF cashier-name-title ml-5">
                  <h5>Category Name</h5>
                </div>
                <div className="cashier-salereturns-table-dateF cashier-name-title">
                  <h5 className="">Category icon Class</h5>
                </div>

                <div className="cashier-salereturns-table-actionF">
                  <h5 className="mr-10">Action</h5>
                </div>
              </div>

              {categories.length ? (
                categories.map((item) => (
                  <div
                    key={item._id}
                    className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                  >
                    <div className="cashier-salereturns-table-dateF cashier-name-title ml-5">
                      <span className="capitalize"> {item.categoryName} </span>
                    </div>
                    <div className="cashier-salereturns-table-dateF cashier-name-title ml-5">
                      <span className="capitalize"> {item.categoryclass} </span>
                    </div>

                    <div className="cashier-salereturns-table-actionF mr-3">
                      <div className="dropdown">
                        <button
                          onClick={() => handleOpen(item._id)}
                          className="common-action-menu-style"
                        >
                          Action
                          <i className="fa-sharp fa-solid fa-caret-down"></i>
                        </button>
                        <div
                          className="dropdown-list"
                          style={{
                            display: `${
                              item._id === match && open ? "block" : "none"
                            }`,
                          }}
                        >
                          <button className="dropdown-menu-item">
                            <Image src={updateIcon} alt="icon not found" />

                            <Link href={`/update-category/${item._id}`}>
                              Edit
                            </Link>
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(item._id)}
                            className="dropdown-menu-item"
                          >
                            <Image src={deleteIcon} alt="icon not found" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  {loading ? (
                    <>
                      <ChartPreloader />
                    </>
                  ) : (
                    <>
                      <p className="text-center mt-5"> No Category Found </p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCategory;
