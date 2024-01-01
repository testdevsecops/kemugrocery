"use client";
import CustomDateFormatter from "@/hooks/CustomDateFormatter ";
import GetRatting from "@/hooks/GetRatting";
import { UserReviewType } from "@/interFace/apiInterFace";
import { idType } from "@/interFace/interFace";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ReviewDetails = ({ id }: idType) => {
  const [reviews, setReviews] = useState<UserReviewType[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}user-input/review/${id}`)
      .then((res) => {
        setReviews(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [id]);
  return (
    <div className="reviews-container">
      <h2 className="text-2xl my-3">User Review</h2>
      {reviews.map((review, index) => (
        <div key={index} className="review">
          <div className="review-header">
            <p className="user-email">{review.email}</p>
            <p className="review-date">
              {" "}
              <CustomDateFormatter inputDate={review?.date} />{" "}
            </p>
          </div>
          <hr />
          <div className="review-text-box text-[14px]">
            <p> {`" ${review.review} "`} </p>
          </div>
          <p className="product-name">
             Product Name : {" "}
            {review.productName ? review.productName : "No Product Name Found"}
          </p>
          <div className="review-footer">
            <p className="product-id">  Product ID :  #{review.productId}</p>
            <p className="rating">
               Rating :   <GetRatting averageRating={review.retting} />{" "}
              <span>({review.retting})</span>{" "}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewDetails;
