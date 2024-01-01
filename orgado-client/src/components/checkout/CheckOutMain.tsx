"use client";
import React, { useState, useEffect } from "react";
import LoginFormInCheckOutPage from "./LoginFormInCheckOutPage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGlobalContext from "@/hooks/use-context";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import moment from "moment";
import { useRouter } from "next/navigation";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import NiceSelectTwo from "@/utils/NiceSelectTwo";
import { countryes } from "@/data/nice-select-data";
interface FormData {
  Country: string;
  Fname: string;
  Lname: string;
  Address: string;
  City: string;
  Postcode: string;
  EmailAddress: string;
  Phone: string;
}

const CheckOutMain = () => {
  const router = useRouter();
  const [cardError, setcardError] = useState<string | undefined>("");
  const [clientSecret, setclientSecret] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [country, setcountry] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();
  const { user, header, setPaymentSuccess } = useGlobalContext();
  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");
  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );

  const totalPrice = cartProducts.reduce(
    (total, product) => total + (product.price ?? 0) * (product.totalCard ?? 0),
    0
  );
  const handleGoToShopPage = () =>{
    router.push("/shop")
  }

  useEffect(() => {
    if (user?.email) {
      axios
        .post(
          `${process.env.BASE_URL}payment/payment-intent?email=${user?.email}`,
          { totalPrice },
          header
        )
        .then((res) => {
          setclientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            console.error("Unauthorized access");
          } else {
            console.error("Unauthorized access");
          }
        });
    }
  }, [user?.email, totalPrice, header]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const Country = country;
    const Fname = data.Fname;
    const Address = data.Address;
    const City = data.City;
    const Postcode = data.Postcode;
    const EmailAddress = data.EmailAddress;
    const Phone = data.Phone;
    // payment
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setcardError(error.message);
    } else {
      setcardError("");
    }
    // confirm payment
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name || "No Name",
            email: user?.email || "No Name",
          },
        },
      });

    if (confirmError) {
      setcardError(confirmError.message);
    }
    // save payment info in database
    setProcessing(false);
    if (paymentIntent?.status === "succeeded") {
      const paymentId = paymentIntent.id;
      setTransactionId(paymentId);

      const sellProductInfo = {
        buyerEmail: user?.email,
        Country,
        name: Fname,
        Address,
        City,
        Postcode,
        EmailAddress,
        date,
        Phone,
        totalPrice,
        orderProducts: cartProducts,
        paymentId: paymentId,
      };

      axios
        .post(
          `${process.env.BASE_URL}success/save-payment-info?email=${user?.email}`,
          sellProductInfo,
          header
        )
        .then((res) => {
          if (res.data.message === "success") {
            router.push("/profile");
            setPaymentSuccess(true);
            toast.success(`Payment Success`, {
              position: "top-left",
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            console.error("Unauthorized access");
            setPaymentSuccess(false);
          } else {
            console.error("Unauthorized access");
            setPaymentSuccess(false);
          }
        });
    }
  };

  
  const selectHandler = () => {};

  return (
    <>
      <section className="checkout-area pt-115 pb-100">
        <div className="container small-container">
          <div className="coupon-accordion">
            {user?.email ? (
              <h3> 
                {" "}
                Hi, {user?.name}{" "}
                <span id="showlogin"> Wellcome To Orgado </span>
              </h3>
            ) : (
              <h3>
                Returning customer?{" "}
                <span id="showlogin">Click here to login</span>
              </h3>
            )}
            <div id="checkout-login" className={`coupon-content d-block`}>
              <div className="coupon-info">
                <p className="coupon-text">
                  Quisque gravida turpis sit amet nulla posuere lacinia. Cras
                  sed est sit amet ipsum luctus.
                </p>
                {/* login form  */}

                {!user?.email && <LoginFormInCheckOutPage />}
              </div>
            </div> 
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {/* billing info */}
              <div className="col-lg-6">
                <div className="checkbox-form">
                  <h3>Billing Details</h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="country-select">
                        <label>
                          Country <span className="required">*</span>
                        </label>
                        <NiceSelectTwo
                          options={countryes}
                          defaultCurrent={0}
                          onChange={selectHandler}
                          name=""
                          setapiEndPoint={setcountry}
                          className="gender-select"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Name <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.email && user.name}
                          placeholder="Enter Your Name"
                          {...register("Fname", {
                            required: "Name is required",
                          })}
                        />
                        {errors.Fname && <span className="error-message">{errors.Fname.message}</span>}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Address <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          
                          placeholder="Street address"
                          {...register("Address", {
                            required: "Address is required",
                          })}
                        />
                        {errors.Address && (
                          <span className="error-message">{errors.Address.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <input
                          type="text"
                          placeholder="Apartment, suite, unit etc. (optional)"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Town / City <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          
                          placeholder="Town / City"
                          {...register("City", {
                            required: "Password is required",
                          })}
                        />
                        {errors.City && <span className="error-message">{errors.City.message}</span>}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>
                          Postcode / Zip <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          
                          placeholder="Postcode / Zip"
                          {...register("Postcode", {
                            required: "Postcode is required",
                          })}
                        />
                        {errors.Postcode && (
                          <span className="error-message">{errors.Postcode.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>
                          Email Address <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          defaultValue={user?.email && user.email}
                          placeholder=""
                          {...register("EmailAddress", {
                            required: "Email is required",
                          })}
                        />
                        {errors.EmailAddress && (
                          <span className="error-message">{errors.EmailAddress.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Phone <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.email && user.phone}
                          placeholder="Phone Number"
                          {...register("Phone", {
                            required: "Phone is required",
                          })}
                        />
                        {errors.Phone && <span className="error-message">{errors.Phone.message}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* order info */}
              <div className="col-lg-6">
                <div className="your-order mb-30 ">
                  <h3>Your order</h3>
                  <div className="your-order-table table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th className="product-name">Product</th>
                          <th className="product-total">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartProducts.map((item, index) => (
                          <tr className="cart_item" key={index}>
                            <td className="product-name">
                              {item.productName}{" "}
                              <strong className="product-quantity">
                                {" "}
                                × {item?.totalCard}
                              </strong>
                            </td>
                            <td className="product-total">
                              <span className="amount">
                                ${item?.totalCard * item.price}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="cart-subtotal">
                          <th>Cart Subtotal</th>
                          <td>
                            <span className="amount">${totalPrice}</span>
                          </td>
                        </tr>
                        <tr className="order-total">
                          <th>Order Total</th>
                          <td>
                            <strong>
                              <span className="amount">${totalPrice}</span>
                            </strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="payment-method">
                    <div className="accordion" id="checkoutAccordion">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="checkoutOne">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#bankOne"
                            aria-expanded="true"
                            aria-controls="bankOne"
                          >
                            Direct Bank Transfer
                          </button>
                        </h2>
                        <div
                          id="bankOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="checkoutOne"
                          data-bs-parent="#checkoutAccordion"
                        >
                          <div className="accordion-body">
                            Make your payment directly into our bank account.
                            Please use your Order ID as the payment reference.
                            Your order won’t be shipped until the funds have
                            cleared in our account.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="paymentTwo">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#payment"
                            aria-expanded="false"
                            aria-controls="payment"
                          >
                            Cheque Payment
                          </button>
                        </h2>
                        <div
                          id="payment"
                          className="accordion-collapse collapse"
                          aria-labelledby="paymentTwo"
                          data-bs-parent="#checkoutAccordion"
                        >
                          <div className="accordion-body">
                            Please send your cheque to Store Name, Store Street,
                            Store Town, Store State / County, Store Postcode.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item cart-input-box">
                        {cartProducts.length ? <CardElement /> : <> </>}
                        <div
                          id="paypal"
                          className="accordion-collapse collapse"
                          aria-labelledby="paypalThree"
                          data-bs-parent="#checkoutAccordion"
                        >
                          <div className="accordion-body">
                            Pay via PayPal; you can pay with your credit card if
                            you don’t have a PayPal account.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="order-button-payment mt-20">
                      {cartProducts.length ? (
                        <>
                          <button
                            type="submit"
                            className={
                              user?.email ? "bd-fill__btn" : "custome_disable"
                            }
                            disabled={
                              !user?.email ||
                              !stripe ||
                              !clientSecret ||
                              processing ||
                              !cartProducts
                            }
                          >
                            {transactionId ? "Payment Success" : "Place Order"}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                          onClick={handleGoToShopPage}
                            className={
                              user?.email ? "bd-fill__btn" : "custome_disable"
                            }
                          >
                            Add Product For Checkout
                          </button>
                        </>
                      )}

                      {cardError && <p className="text-red-600">{cardError}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CheckOutMain;
