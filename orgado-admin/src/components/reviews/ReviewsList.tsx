"use client";
import Scrollbar from "smooth-scrollbar";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import ChartPreloader from "@/preloaders/ChartPreloader";
import { UserReviewType } from "@/interFace/apiInterFace";
import GetRatting from "@/hooks/GetRatting";
import Modal from "@/sheardComponent/Modal";
import ReviewDetails from "./ReviewDetails";
import CustomDateFormatter from "@/hooks/CustomDateFormatter ";
const ReviewsList = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<UserReviewType[]>([]);
  const [reviewId, setReviewId] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = (id:string) => {
    setModalIsOpen(true);
    setReviewId(id)
    
  }
  const closeModal = () => setModalIsOpen(false);
  useEffect(() => {
    setloading(true);
    axios
      .get(`${process.env.BASE_URL}user-input/all-review`)
      .then((res) => {
        setReviews(res.data);
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
        <h4 className="text-[20px] font-bold text-heading mb-9">
          User Reviews And Ratings
        </h4>
        <div
          ref={scrollContainerRef}
          className="cashier-salereturns-table-area table-height"
        >
          <div className="cashier-category-wrapper">
            <div className="border border-solid border-grayBorder border-b-0 mb-7">
              <div className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12">
                <div className="cashier-salereturns-table-dateF cashier-name-title ml-5">
                  <h5>Product Name</h5>
                </div>
                <div className="cashier-salereturns-table-dateF cashier-name-title">
                  <h5 className="">Date</h5>
                </div>
                <div className="cashier-salereturns-table-dateF cashier-name-title">
                  <h5 className="">Review</h5>
                </div>
                <div className="cashier-salereturns-table-dateF cashier-name-title">
                  <h5 className="">Ratings</h5>
                </div>
                <div className="cashier-salereturns-table-dateF cashier-name-title">
                  <h5 className="">Customer Email</h5>
                </div>
                <div className="cashier-salereturns-table-actionF">
                  <h5 className="mr-10">Action</h5>
                </div>
              </div>
 
              {reviews?.length ? (
                reviews.map((item) => {
                  const fullReview = item?.review;
                  const result =
                    fullReview?.split(" ").slice(0, 4).join(" ") +
                    (fullReview?.split(" ").length > 4 ? " . . ." : "");

                  return (
                    <div
                      key={item?._id}
                      className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                    >
                      <div className="cashier-salereturns-table-dateF cashier-name-title ml-5">
                        <span className="capitalize">
                          {" "}
                          {item?.productName ? item?.productName : "No Product Name Found"}{" "}
                        </span>
                      </div>
                      <div className="cashier-salereturns-table-dateF cashier-name-title">
                        <span className="capitalize"> <CustomDateFormatter inputDate={item?.date}/> </span>
                      </div>
                      <div className="cashier-salereturns-table-dateF cashier-name-title">
                        <span className="capitalize"> {result}</span>
                      </div>
                      <div className="cashier-salereturns-table-dateF cashier-name-title">
                        <span className="capitalize">
                          {" "}
                          <GetRatting averageRating={item?.retting} />{" "}
                        </span> 
                      </div>
                      <div className="cashier-salereturns-table-dateF cashier-name-title">
                        <span className="capitalize"> {item?.email} </span>
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
                  );
                })
              ) : (
                <>
                  {loading ? (
                    <>
                      <ChartPreloader />
                    </>
                  ) : (
                    <>
                      <p className="text-center mt-5"> No Review Found </p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal modalClass="custom-modal" overly="overlay" isOpen={modalIsOpen} onRequestClose={closeModal}>
         <ReviewDetails id={reviewId}/>
      </Modal>
    </>
  );
};

export default ReviewsList;
