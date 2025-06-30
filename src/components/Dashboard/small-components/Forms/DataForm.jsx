import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Glo from '../../../../assets/glo.png';
import Airtel from '../../../../assets/airtel.png';
import { useModal } from '../../../ModalContext';
import { MdCancel } from "react-icons/md";
import { TailSpin } from 'react-loader-spinner';
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const DataForm = ({ selectedPlan = {}, activeNetwork }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dataAmount, setDataAmount] = useState('');
  const [dataSize, setDataSize] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const providerMap = {
    'MTN': 1,
    'AIRTEL': 3,
    'GLO': 2,
    '9MOBILE': 4,
  };

  useEffect(() => {
    if (selectedPlan?.amount) setDataAmount(selectedPlan.amount.toString());
    if (selectedPlan?.size) setDataSize(selectedPlan.size);
  }, [selectedPlan]);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get(`/api/api2/user`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const balance = parseFloat(response.data?.wallet?.balance || 0);
        setWalletBalance(balance);
      } catch (err) {
        console.error('Failed to fetch wallet balance:', err);
      }
    };
    fetchWalletBalance();
  }, []);

  const formatPhoneNumber = (number) => {
    const digits = number.replace(/\D/g, '');
    return (digits.length === 11 && digits.startsWith('0')) ? digits.substring(1) : digits;
  };

  const handleSubmit = async (e) => {
    console.log("Active Network:", activeNetwork);
    console.log("Selected Plan:", selectedPlan.size);
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    const amountValue = parseFloat(dataAmount);
    const networkId = providerMap[activeNetwork?.toUpperCase()];

    if (formattedPhoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      setIsLoading(false);
      return;
    }

    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Please enter a valid amount');
      setIsLoading(false);
      return;
    }

    if (!networkId) {
      setError('Network provider is required');
      console.log(networkId)
      setIsLoading(false);
      return;
    }

    if (!dataSize || !selectedPlan.size) {
      setError('Data plan is required');
      setIsLoading(false);
      return;
    }

    if (amountValue > walletBalance) {
      setError(`Insufficient funds. Your balance is ₦${walletBalance.toFixed(2)}`);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `/api/buy_data`,
        {
          phone_number: formattedPhoneNumber,
          mobile_network: networkId,
          data_plan_id: selectedPlan.size,
          amount: amountValue
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setWalletBalance(prev => prev - amountValue);

      openModal(
        <div className="relative">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
          />
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
            <p className="mb-4">
              You have successfully purchased {dataSize} {activeNetwork} data for 0{formattedPhoneNumber}
            </p>
            <p className="mb-4">
              Amount: ₦{amountValue.toFixed(2)}
            </p>
            <p className="mb-4 text-sm">
              Remaining balance: ₦{(walletBalance - amountValue).toFixed(2)}
            </p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-[#4CACF0] text-white rounded hover:bg-[#3A9BDE]"
            >
              Close
            </button>
          </div>
        </div>
      );
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'An error occurred. Please try again.';
      setError(errorMsg);
      console.error('Data purchase error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

  const handleFundWallet = () => {
    closeModal();
    navigate('/dashboard/fund-wallet');
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-[#434343] font-normal text-lg'>
          {activeNetwork} Data Purchase
        </h2>
        <button
          type="button"
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <MdCancel size={20} />
        </button>
      </div>

      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          Wallet Balance: <span className="font-bold">₦{walletBalance.toFixed(2)}</span>
        </p>
      </div>

      <div>
        {/* <h4 className='text-xs text-[#232323D9] mb-2'>Recent transactions</h4>
        <div className='w-full flex gap-3 my-3'>
          <button type="button" className='flex flex-col items-center'>
            <div className='rounded-full border-2 border-[#4CACF0] p-1'>
              <img src={Glo} alt="Glo" className='w-[30px] h-[30px] object-contain' />
            </div>
            <p className='text-xs text-[#232323D9] mt-1'>12345678</p>
          </button>
          <button type="button" className='flex flex-col items-center'>
            <div className='rounded-full border-2 border-[#4CACF0] p-1'>
              <img src={Airtel} alt="Airtel" className='w-[30px] h-[30px] object-contain' />
            </div>
            <p className='text-xs text-[#232323D9] mt-1'>12345678</p>
          </button>
        </div> */}

        <form onSubmit={handleSubmit} className='mt-4 flex flex-col gap-4'>
          <div>
            <input
              type='tel'
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder='Mobile Number (e.g., 08123456789)'
              className='w-full p-3 rounded-lg border text-[#333] text-sm font-light focus:outline-none focus:ring-2 focus:ring-[#4CACF0]'
              required
              maxLength="11"
              inputMode="numeric"
            />
            <small className="text-gray-500">Enter 11-digit phone number</small>
          </div>

          <div>
            <input
              type='text'
              value={dataSize}
              readOnly
              className='w-full p-3 rounded-lg border text-[#333] text-sm font-light bg-gray-100'
            />
            <small className="text-gray-500">Selected data plan</small>
          </div>

          <div>
            <input
              type='text'
              value={`₦${dataAmount}`}
              readOnly
              className='w-full p-3 rounded-lg border text-[#333] text-sm font-light bg-gray-100'
            />
            <small className="text-gray-500">Plan amount</small>
          </div>

          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded flex items-center justify-between">
              {error.includes('Insufficient') ? (
                <>
                  {error}
                  <button
                    onClick={handleFundWallet}
                    className="text-white py-1 px-2 rounded-md bg-blue-600"
                  >
                    Fund
                  </button>
                </>
              ) : (
                error
              )}
            </div>
          )}

          <button
            type="submit"
            className='w-full p-3 rounded-lg text-white bg-[#4CACF0] hover:bg-[#3A9BDE] transition-colors font-medium disabled:opacity-50 flex justify-center items-center'
            disabled={!phoneNumber || !dataAmount || isLoading}
          >
            {isLoading ? (
              <>
                <TailSpin color="#FFF" height={20} width={20} className="mr-2" />
                Processing...
              </>
            ) : (
              'Buy Data'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DataForm;
