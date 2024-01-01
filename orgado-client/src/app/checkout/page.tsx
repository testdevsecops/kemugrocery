"use client";
import CheckOutMain from "@/components/checkout/CheckOutMain";
import Wrapper from "@/layout/DefaultWrapper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Nc3ZLJEv4PTYAsPdNu6KeCW6kYe0WnLNcXiXbrpF33VouprP6qvASeGBtLlXKRYRgmspk89ACqUhMyaaS74jsG400Nyl7IrGE");

const Checkout = () => {
  return (
    <>
      <Wrapper>
        <main>
          <Elements stripe={stripePromise}>
            <CheckOutMain />
          </Elements>
        </main>
      </Wrapper>
    </>
  );
};

export default Checkout;
