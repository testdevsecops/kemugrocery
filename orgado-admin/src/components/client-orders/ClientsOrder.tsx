"use client";
import { idType } from "@/interFace/interFace";
import axios from "axios";
import Scrollbar from "smooth-scrollbar";
import { useReactToPrint } from "react-to-print";
import React, { useEffect, useState, useRef } from "react";
import CustomDateFormatter from "@/hooks/CustomDateFormatter ";
const ClientsOrder = ({ id }: idType) => {
  const [clients, setClients] = useState<any>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const componentRef = useRef<any>(null);
  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}success/client-order/${id}`)
      .then((res) => {
        setClients(res.data.products);
      })
      .catch((e) => console.log(e));
  }, [id]);
  const myClients = clients[0];
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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div className="cashier-content-area mt-[0px]">
        <div ref={componentRef} className="cashier-salereturns-area bg-white p-4 custom-shadow rounded-lg mb-5">
        <h4 className="text-[24px] maxMd:text-[20px] maxMd:mb-2 font-bold text-heading mb-5">INVOICE</h4>
        <hr />
          <div className="flex justify-between maxMd:mt-3 flex-wrap mt-6">
            <div>
              
              <h6 className="text-[14px] font-bold text-heading uppercase">
                {myClients?.name}
              </h6>
              <p className="mb-3 invoice-p uppercase">
                {" "}
                <CustomDateFormatter inputDate={myClients?.date} />{" "}
              </p>
            </div>
            <div className="text-right maxMd:text-left">
              
              <p className="invoice-p uppercase">
              <span className="font-bold">ADDRESS</span> :
                {" "}
                {myClients?.Country ? `${myClients?.Country} , ` : ""}{" "}
                {myClients?.City} , {myClients?.Address}
              </p>
              <p className="invoice-p"> <span className="font-bold">PHONE</span> : {myClients?.Phone} </p>
            </div>
          </div>

          

          <div className="cashier-salereturns-table-area mt-12">
            <div
              ref={scrollContainerRef}
              className="cashier-salereturns-table-innerD table-height-2"
            >
              <div className="cashier-salereturns-table-inner-wrapperD client-order border border-solid border-grayBorder border-b-0 mb-7">
                <div className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12">
                  <div className="cashier-salereturns-table-dateF ml-5">
                    <h5>Product Name</h5>
                  </div>
                  <div className="cashier-salereturns-table-dateF">
                    <h5>Product Id</h5>
                  </div>
                  <div className="cashier-salereturns-table-referenceF table-new-width">
                    <h5>Price</h5>
                  </div>
                  <div className="cashier-salereturns-table-referenceF table-new-width">
                    <h5>Quantity</h5>
                  </div>
                  <div className="cashier-salereturns-table-referenceF">
                    <h5>Total Price</h5>
                  </div>
                  <div className="cashier-salereturns-table-referenceF">
                    <h5>date</h5>
                  </div>
                </div>

                <>
                  {myClients?.orderProducts?.length &&
                    myClients?.orderProducts?.map((item: any) => (
                      <div
                        key={item._id}
                        className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                      >
                        <div className="cashier-salereturns-table-dateF ml-5">
                          <span> {item.productName} </span>
                        </div>
                        <div className="cashier-salereturns-table-dateF">
                          <span> {item._id} </span>
                        </div>
                        <div className="cashier-salereturns-table-referenceF table-new-width">
                          <span> ${item.price} </span>
                        </div>
                        <div className="cashier-salereturns-table-referenceF table-new-width">
                          <span> {item.totalCard} </span>
                        </div>
                        <div className="cashier-salereturns-table-referenceF">
                          <span> ${item.price * item.totalCard} </span>
                        </div>
                        <div className="cashier-salereturns-table-referenceF">
                          <span>
                            <CustomDateFormatter inputDate={item.orderDate} />{" "}
                          </span>
                        </div>
                      </div>
                    ))}
                </>
              </div>
            </div>
          </div>
          <div className="invioice_box flex justify-between flex-wrap">
            <div>
              <p className="invoice-p"> <span className="font-bold">PAYMENT ID</span> : {myClients?.paymentId}</p>
            </div>
            <div className="text-right">
              
              <p className="invoice-p">
               <span className="font-bold">TOTAL AMOUNT</span> : ${myClients?.totalPrice}
              </p>
            </div>
          </div>
        </div>
        <div className="cashier-managesale-top-btn default-light-theme ml-4 mb-6 mt-5">
            <button onClick={handlePrint} className="btn-primary mb-1">
              <i className="fa-solid fa-print"></i> Print
            </button>
          </div>
      </div>
    </>
  );
};

export default ClientsOrder;
