"use client";
import { RefundRequest } from "@/interFace/apiInterFace";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PaginationComponent from "../all-products/PaginationComponent ";
import ChartPreloader from "@/preloaders/ChartPreloader";
import Modal from "@/sheardComponent/Modal";
import RefundDetails from "./RefundDetails";
const RefundList = () => {
  const [products, setProducts] = useState<RefundRequest[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setotalPages] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [refundId, setRefundId] = useState<string>("");

  // modal

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = (id:string) => {
    setModalIsOpen(true);
    setRefundId(id)
    
  }
  const closeModal = () => setModalIsOpen(false);


  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
    axios
      .get(
        `${process.env.BASE_URL}user-input/search-refund?search=${searchValue}`
      )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.BASE_URL}user-input/refund-info?page=${page}&limit=${limit}`
      )
      .then((res) => {
        setProducts(res.data.products);
        setotalPages(res.data.totalPages);
        setcurrentPage(res.data.currentPage);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [page, limit]);
  return (
    <>
      <div className="cashier-content-area mt-[30px] px-7">
        <div className="cashier-salereturns-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
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

          {products.length ? (
            <>
              <div className="cashier-salereturns-table-area relative">
                <div className="cashier-salereturns-table-innerD">
                  <div className="cashier-salereturns-table-inner-wrapperD border border-solid border-grayBorder border-b-0 mb-7">
                    <div className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12">
                      <div className="cashier-salereturns-table-dateF ml-5">
                        <h5>Client Email</h5>
                      </div>
                      <div className="cashier-salereturns-table-dateF">
                        <h5>Product Name</h5>
                      </div>
                      <div className="cashier-salereturns-table-referenceF">
                        <h5>Product Id</h5>
                      </div>
                      <div className="cashier-salereturns-table-customerF">
                        <h5>paymentId</h5>
                      </div>
                      <div className="cashier-salereturns-table-companyF w-auto">
                        <h5>Message</h5>
                      </div>
                      <div className="cashier-salereturns-table-actionF">
                        <h5 className="mr-10">Action</h5>
                      </div>
                    </div>

                    {products.map((item) => {
                      const returnMessage = item?.message;
                      const message =
                        returnMessage?.split(" ").slice(0, 4).join(" ") +
                        (returnMessage?.split(" ").length > 4 ? " . . ." : "");
                      return(
                        <div
                          key={item._id}
                          className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                        >
                          <div className="cashier-salereturns-table-dateF ml-5">
                            <span> {item.email} </span>
                          </div>
                          <div className="cashier-salereturns-table-dateF">
                            <span> {item.productName} </span>
                          </div>
                          <div className="cashier-salereturns-table-referenceF">
                            <span> #{item._id} </span>
                          </div>
                          <div className="cashier-salereturns-table-customerF">
                            <span> ${item.paymentId} </span>
                          </div>
                          <div className="cashier-salereturns-table-companyF w-auto">
                            <span> {message} </span>
                          </div>
                          <div className="cashier-salereturns-table-actionF mr-3">
                          <div className="dropdown">
                            <button
                              onClick={() => openModal(item?._id)}
                              className="common-action-menu-style"
                            >
                              <i className="fa-solid fa-eye mr-1"></i>
                            View
                            </button>
                          </div>
                        </div>
                        </div>
                      )
                    } )}
                  </div>
                </div>
                <div className="cashier-pagination-area">
                  <div className="cashier-pagination-wrapper">
                    <div className="grid grid-cols-12">
                      <div className="lg:col-span-9 md:col-span-6 col-span-12 mb-10">
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
                  <p className="text-center mt-5"> No Refund Request Found </p>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <Modal modalClass="custom-modal" overly="overlay" isOpen={modalIsOpen} onRequestClose={closeModal}>
         <RefundDetails id={refundId}/>
      </Modal>
    </>
  );
};

export default RefundList;
