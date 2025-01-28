import React from "react";
import { Helmet } from "react-helmet";

const Survey = ({ headTitle }) => {
  return (
    <>
      <Helmet>
        <title>{headTitle}</title>
      </Helmet>
      <h1 className="text-center mb-4">Chiếc Nón Kỳ Diệu</h1>
      <div className="google-form-container">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSetfremKqpUDkeJNcqJa6dvI403cs9Y66E7jZYO2J41HKs74A/viewform?embedded=true"
          width="100%"
          height="700"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          title="Google Form"
        >
          Đang tải…
        </iframe>
      </div>
    </>
  );
};

export default Survey;
