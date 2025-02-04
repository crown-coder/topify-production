import React, { useState } from "react";
import { useModal } from "../../../../components/ModalContext";
import LoadingCard from "./LoadingCard";
import SucessCard from "./SucessCard";
import FailedCard from "./FailedCard";
import Confirmation from "./Confirmation";
import Confetti from "react-confetti";

const ConfimCard = ({ data }) => {
  const { closeModal } = useModal();
  const [transactionStatus, setTransactionStatus] = useState(null); // Tracks success or failure
  const [isLoading, setIsLoading] = useState(false);

  // Destructure smartCardNo and amount from the data prop
  const { smartCardNumber, amount, phoneNumber, airtimeAmount, phoneNo, dataPurchase, dataAmount } = data || {};

  const handleTransaction = () => {
    setIsLoading(true);

    // Simulate a transaction delay (e.g., 2 seconds)
    setTimeout(() => {
      const isSuccess = Math.random() > 0.4; // Randomly simulate success or failure
      setTransactionStatus(isSuccess ? "success" : "failed");
      setIsLoading(false); // Stop loading after the result
    }, 2000); // Delay of 2 seconds
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingCard />;
    }

    if (transactionStatus === "success") {
      return (
        <>
          {/* Confetti Effect */}

          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <SucessCard closeModal={closeModal} />
        </>
      );
    }

    if (transactionStatus === "failed") {
      return <FailedCard closeModal={closeModal} />;
    }

    // Default Confirmation Card
    return (
      <Confirmation
        smartCardNo={smartCardNumber}
        amount={amount}
        phoneNumber={phoneNumber}
        airtimeAmount={airtimeAmount}
        phoneNo={phoneNo}
        dataPurchase={dataPurchase}
        dataAmount={dataAmount}
        closeModal={closeModal}
        handleTransaction={handleTransaction}
      />
    );
  };

  return <div>{renderContent()}</div>;
};

export default ConfimCard;
