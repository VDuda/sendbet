import React from "react";

const EscrowButton: React.FC = () => {
  return (
    <form
      action="https://www.escrow.com/checkout"
      method="post"
      target="_blank"
    >
      <input type="hidden" name="type" value="domain_name" />
      <input type="hidden" name="non_initiator_email" value="email@gmail.edu" />
      <input type="hidden" name="non_initiator_id" value="3362353" />
      <input type="hidden" name="non_initiator_role" value="seller" />
      <input type="hidden" name="title" value="Bet" />
      <input type="hidden" name="currency" value="USD" />
      <input type="hidden" name="domain" value="sendbet.click" />
      <input type="hidden" name="price" value="10" />
      <input type="hidden" name="concierge" value="false" />
      <input type="hidden" name="with_content" value="false" />
      <input type="hidden" name="inspection_period" value="30" />
      <input type="hidden" name="fee_payer" value="seller" />
      <input type="hidden" name="return_url" value="https://sendbet.click" />
      <input type="hidden" name="button_types" value="both" />
      <input type="hidden" name="auto_accept" value="" />
      <input type="hidden" name="auto_reject" value="" />
      <input type="hidden" name="item_key" value="undefined" />
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:600');
        .EscrowButtonPrimary {
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAAALCAMAAABGfiMeAAAAolBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8ELnaCAAAANXRSTlMA95xuSysUU/vh2tWxlA4Z88Sselc1He/quriOCwbNiYFEMALm0Mm+taJnP6ZjIoRdTjp03P7kXRgAAAI+SURBVDjLhZKJkppQEEXvQ0BAZBEEHQFlUVzHZXL//9fSj1Ti1GRMTpWtJe/16faKt4EpEBqu6qoGOHpKuQbuS8GwABTJNveMDCYrAB3l8DvzFkLj/3CrA4D0zYs3BfDoDAiF5+F76CyEHtjJJ4cNjmSk6GFEjRLhnswVF2HgOAEscgJcuAdEG9F1IwVs5NsFdyVMKhvAjc4r3wQDIScBYJfYspZ3S3z7+3jJgxi6BoHPtYx01+PQxoEfgNZc9FW0kZuhPDBFyuFJTJb/9tncthBaJ4dGfFOIa4uxOIGTbLTmCmdWHMPlHILPAJqMhtQ5r7IYPX2NDF743FQoIHtNkgwIOHn6xPUmr1/NlkOAnUo5zRiVEGKFp08sa1k/5wkrqeEL38C7ZLElRWE/fa6/V7x98kmAc/Zy4iZjaHbRV9+IK57L3PX5/mo/UyggNElOM6D326e54pMPFX1usJWa4Pv9Eo53asTkQOtlfk/kYKv+5OfXE93X5AxATR9YkTxhKvUBzYw2NCHPUh8yy5XmhcoJDc7/4xs3bXHmETEvgW3VQ36WcuYIqcw266UZ7qQqZWEdXz0NkfADKBqgix76LzyWieoioi8znV74qIQd7IgOubClm8YbfLjQK6SHfuTagE32Q10CExkgXMhtKiAlO8W+Fc8D95GFNWuEyYf5l3U2sEYw6l3voEM2+x9efIU5uwC4zsay+t6L1zaE1fk21BQ4xrJXZsS7/UrHa8T+qAQ2lQXNsRJTfTK//qo/Aes/TdDnJ+8NAAAAAElFTkSuQmCC);
          background-color: #0ecb6f;
          background-repeat: no-repeat;
          background-position: right 13px;
          border-radius: 4px;
          border: 1px solid #0ecb6f;
          box-shadow: 0 2px 4px 0 hsla(0,12%,54%,.1);
          box-sizing: border-box;
          color: #fff;
          cursor: pointer;
          display: inline-block;
          font-family: Open Sans, sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: .4px;
          line-height: 1.2;
          min-height: 40px;
          padding: 8px 118px 8px 21px;
          text-align: left;
          text-decoration: none;
          text-transform: none;
          transition: all .1s linear;
          vertical-align: middle;
        }
        .EscrowButtonPrimary:hover {
          background-color: #56da9a;
          border-color: #56da9a;
        }
        .EscrowButtonPrimary:focus {
          background-color: #00b65a;
        }
      `}</style>
      <button className="EscrowButtonPrimary" type="submit">
        Add Funds via
      </button>
      <img
        src="https://t.escrow.com/1px.gif?name=bin&price=10&title=Bet&user_id=3362353"
        style={{ display: "none" }}
        alt="Escrow tracking pixel"
      />
    </form>
  );
};

export {EscrowButton};
