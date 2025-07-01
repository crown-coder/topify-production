import React, { useState } from 'react'
import axios from 'axios'
import Glo from '../../../../assets/glo.png'
import Airtel from '../../../../assets/airtel.png'
import { useModal } from '../../../ModalContext'
import { MdCancel } from "react-icons/md";

const DataForm = ({ onSubmit }) => {
  const [phoneNo, setPhoneNo] = useState('');
  const [dataPurchase, setDataPurchase] = useState('');
  const [dataAmount, setDataAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await axios.post('https://your-api-url.com/api/data-purchase', {
        phoneNo,
        dataPurchase,
        dataAmount
      });

      if (res.status === 200 || res.status === 201) {
        setSuccessMsg('Data purchase successful!');
        setPhoneNo('');
        setDataPurchase('');
        setDataAmount('');
        if (onSubmit) onSubmit({ phoneNo, dataPurchase, dataAmount });
        // Optionally close modal after a delay
        setTimeout(closeModal, 1500);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='text-[#434343] font-normal text-lg'>Buy Data</h2>
        <button><MdCancel onClick={closeModal} /></button>
      </div>

      <div className=''>
        <h4 className='text-[10px] text-[#232323D9]'>Recent transactions</h4>
        <div className='w-full flex gap-3 my-2'>
          <button className='flex flex-col items-center'>
            <div className='rounded-full border-2 border-[#4CACF0] p-1'>
              <img src={Glo} className='w-[30px] h-[30px] object-contain' />
            </div>
            <p className='text-[7px] text-[#232323D9]'>12345678</p>
          </button>
          <button className='flex flex-col items-center'>
            <div className='rounded-full border-2 border-[#4CACF0] p-1'>
              <img src={Airtel} className='w-[30px] h-[30px] object-contain' />
            </div>
            <p className='text-[7px] text-[#232323D9]'>12345678</p>
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}

        {/* form */}
        <div>
          <form onSubmit={handleSubmit} className='mt-3 flex flex-col gap-5'>
            <input
              type='number'
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder='Mobile Number'
              className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light'
              required
            />
            <input
              type='number'
              value={dataPurchase}
              onChange={(e) => setDataPurchase(e.target.value)}
              placeholder='Data Purchase'
              className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light'
              required
            />
            <input
              type='number'
              value={dataAmount}
              onChange={(e) => setDataAmount(e.target.value)}
              placeholder='Amount'
              className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light'
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-2 rounded-lg border text-white bg-[#4CACF0] cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataForm;
