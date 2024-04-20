import React from "react";
// import "./Pay.css";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../../services/baseurl";

const KEY =
  "pk_test_51P2pQISJzfAOf7LDkmLyA6WqQtEoBT3dS8U3LCqMAkWyOopCCRF7SIfmgm1WDmG7Sd8fF0gv8g8a61CfQieF8hMo00ucY1ccmH";

const Pay = () => {
  const [stripeToken, setStripToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    console.log(token);
    setStripToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/checkout/payment`,
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(response.data);
        window.location.href = response.data.url;


      } catch (err) {
        console.log(err);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <div className="container">
      {stripeToken ? (
        <span>Processing. Please Wait</span>
      ) : (
        <StripeCheckout
          name="Tech Geek."
          image="https://avatars.githubusercontent.com/u/1486366?v=4"
          billingAddress
          shippingAddress
          description=" Your total is $20"
          amount={2000}
          token={onToken}
          stripeKey={KEY}
        >
          <button>Pay now</button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;