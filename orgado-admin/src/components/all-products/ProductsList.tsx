"use client";
import { ProductType } from "@/interFace/apiInterFace";
import axios from "axios";
import React, { useEffect, useState } from "react";
import updateIcon from "../../../public/assets/img/icon/action-2.png";
import deleteIcon from "../../../public/assets/img/icon/action-6.png";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import PaginationComponent from "./PaginationComponent ";
import useGlobalContext from "@/hooks/use-context";
import ChartPreloader from "@/preloaders/ChartPreloader";
import NiceSelectThree from "@/utils/NiceSelectThree";

const ProductsList = () => {
  const { header, user } = useGlobalContext();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [match, setMatch] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setotalPages] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(0);

  // new states

  const handleOpen = (id: string) => {
    setMatch(id);
    setOpen(!open);
  };

  const handleDeleteProduct = (id: string) => {
    if (user?.email) {
      axios
        .delete(
          `${process.env.BASE_URL}product/delete-product/${id}?email=${user?.email}`,
          header
        )
        .then((res) => {
          if (res.data.message === "success") {
            const remainingProduct = products.filter((item) => item._id !== id);
            setProducts(remainingProduct);
            toast.success(`Product Deleted`, {
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
    }
  };

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
    setLoading(true);
    axios
      .get(
        `${process.env.BASE_URL}product/search-products-admin?search=${searchValue}`
      )
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.BASE_URL}product/all-products?page=${page}&limit=${limit}`
      )
      .then((res) => {
        setProducts(res.data.products);
        setotalPages(res.data.totalPages);
        setcurrentPage(res.data.currentPage);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [page, limit]);
  // get search products

  const pageLimitArray = [
    {
      id: 1,
      value: 5,
    },
    {
      id: 2,
      value: 10,
    },
    {
      id: 3,
      value: 15,
    },
    {
      id: 4,
      value: 20,
    },
  ];

  const selectHandler = () => {};
  return (
    <>
      <div className="cashier-content-area mt-[30px] px-7">
        <div className="cashier-salereturns-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          {products.length ? (
            <>
              <div className="cashier-table-header-search-area">
                <div className="grid grid-cols-12 gap-x-5 mb-7 pb-0.5">
                  <div className="md:col-span-6 col-span-12">
                    <div className="cashier-table-header-search relative maxSm:mb-4">
                      <input
                        type="text"
                        placeholder="Search List"
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
              <div className="cashier-salereturns-table-area relative">
                <div className="cashier-salereturns-table-innerD">
                  <div className="cashier-salereturns-table-inner-wrapperD border border-solid border-grayBorder border-b-0 mb-7">
                    <div className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12">
                      <div className="cashier-salereturns-table-dateF ml-5">
                        <h5>Product Name</h5>
                      </div>
                      <div className="cashier-salereturns-table-referenceF">
                        <h5>Product Code</h5>
                      </div>
                      <div className="cashier-salereturns-table-customerF">
                        <h5>Price</h5>
                      </div>
                      <div className="cashier-salereturns-table-companyF">
                        <h5>Offer Status</h5>
                      </div>
                      <div className="cashier-salereturns-table-warehouseF">
                        <h5>Stock</h5>
                      </div>

                      <div className="cashier-salereturns-table-actionF">
                        <h5>Action</h5>
                      </div>
                    </div>

                    {products.length ? (
                      products.map((item) => (
                        <div
                          key={item._id}
                          className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                        >
                          <div className="cashier-salereturns-table-dateF ml-5">
                            <span> {item.productName} </span>
                          </div>
                          <div className="cashier-salereturns-table-referenceF">
                            <span> #{item._id} </span>
                          </div>
                          <div className="cashier-salereturns-table-customerF">
                            <span> ${item.price} </span>
                          </div>
                          <div className="cashier-salereturns-table-companyF">
                            <span>
                              {" "}
                              {item.offer === true ? (
                                <span className="status-tag text-[12px] font-semibold leading-[20px] text-white px-2.5 h-5 rounded-[3px] inline-block bg-themeWarn">
                                  {item?.offerPersent}%
                                </span>
                              ) : (
                                <span className="status-tag text-[12px] font-semibold leading-[20px] text-white px-2.5 h-5 rounded-[3px] inline-block bg-themeGreen">
                                  No Offer
                                </span>
                              )}{" "}
                            </span>
                          </div>
                          <div className="cashier-salereturns-table-warehouseF">
                            <span> {item.productQuantity} </span>
                          </div>
                          <div className="cashier-salereturns-table-actionF">
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
                                    item._id === match && open
                                      ? "block"
                                      : "none"
                                  }`,
                                }}
                              >
                                <button className="dropdown-menu-item">
                                  <Image
                                    src={updateIcon}
                                    alt="icon not found"
                                  />

                                  <Link
                                    href={`/product/product-update/${item._id}`}
                                  >
                                    Edit
                                  </Link>
                                </button>
                                <button className="dropdown-menu-item">
                                  <Image
                                    src={updateIcon}
                                    alt="icon not found"
                                  />

                                  <Link
                                    href={`/product/product-featured/${item._id}`}
                                  >
                                    Featured / Offer
                                  </Link>
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(item._id)}
                                  className="dropdown-menu-item"
                                >
                                  <Image
                                    src={deleteIcon}
                                    alt="icon not found"
                                  />
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
                            <p className="text-center mt-5">
                              {" "}
                              No Product Found{" "}
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="cashier-pagination-area">
                  <div className="cashier-pagination-wrapper">
                    <div className="grid grid-cols-12">
                      <div className="single-input-field w-full">
                        <NiceSelectThree
                          options={pageLimitArray}
                          defaultCurrent={0}
                          onChange={selectHandler}
                          name=""
                          setLimit={setLimit}
                          className=""
                        />
                      </div>

                      <div className="lg:col-span-9 md:col-span-6 col-span-12">
                        <PaginationComponent
                          totalPages={totalPages}
                          currentPage={currentPage}
                          setPage={setPage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {loading ? (
                <>
                  <ChartPreloader />
                </>
              ) : (
                <>
                  <p className="text-center mt-5"> No Product Found </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
