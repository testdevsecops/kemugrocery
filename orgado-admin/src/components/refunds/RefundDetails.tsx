"use client"
import CustomDateFormatter from '@/hooks/CustomDateFormatter ';
import GetRatting from '@/hooks/GetRatting';
import { RefundRequest } from '@/interFace/apiInterFace';
import { idType } from '@/interFace/interFace';
import axios from 'axios';
import React, { useEffect,useState } from 'react';

const RefundDetails = ({id}:idType) => {
    const [refunds, setRefunds] = useState<RefundRequest[]>([])
    useEffect(() => {
        axios
          .get(`${process.env.BASE_URL}user-input/refund-info/${id}`)
          .then((res) => {
            setRefunds(res.data.data);
          })
          .catch((e) => console.log(e));
      }, [id]);
  return (
    <div className="reviews-container">
    <h2 className='text-2xl my-3'>Refund Request</h2>
    {refunds?.map((review, index) => (
      <div key={index} className="review">
        <div className="review-header">
          <p className="user-email">{review.email}</p>
          <p className="review-date"> <CustomDateFormatter inputDate={review?.date}/> </p>
        </div>
        <hr />
        {/* <textarea name="" id="" cols={30} rows={10}> {review.review} </textarea> */}
        <div className='review-text-box'>
            <p> Message : {`" ${review.message} "`} </p>
        </div>
        <p className="product-name">Product Name : {review.productName ? review.productName : "No Product Name Found"}</p>
        <div className="review-footer">
          <p className="product-id">Product ID: #{review.productId}</p>
          <p className="product-id">Payment ID: {review.paymentId}</p>
        </div>
      </div>
    ))}
  </div>
  );
};

export default RefundDetails;
