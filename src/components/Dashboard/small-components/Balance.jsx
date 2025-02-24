import React, { useState } from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useModal } from '../../ModalContext';
import Card from './Card';
import KycCard from './Cards/KycCard';
import Appstore from '../../../assets/appstore.png';
import Playstore from '../../../assets/playstore.png';
import { IoTrophyOutline } from "react-icons/io5";

import { BiHide } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [isShowBalance, setIsShowBalance] = useState(true);
  const [referralBalance, setReferralBalance] = useState(null);


  const { openModal, closeModal } = useModal();

  const handleKYCModal = () => {
    openModal(
      <KycCard closeModal={closeModal} />
    )
  }

  // let balance;

  // if (isShowBalance) {
  //   balance = '₦' + 1000;
  // } else {
  //   balance = '****';
  // }

  return (
    <div className='p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>

      <div className='w-full flex justify-between items-center'>
        <div>
          <h2 className='font-semibold text-lg mb-[2px] text-[#434343] dark:text-white'>Welcome Back, <span>Jeff</span></h2>
          <p className='font-light text-sm text-[#E2B93B]'>Complete your KYS to enjoy all our services. <span className='text-blue-500 cursor-pointer underline' onClick={handleKYCModal}>Proceed</span></p>
        </div>
        <div className='flex gap-2 max-lg:hidden'>
          <button className='cursor-pointer'>
            <img src={Appstore} width={90} height={44} />
          </button>
          <button>
            <img src={Playstore} width={90} height={44} />
          </button>
        </div>
      </div>
      {/* cards container */}
      <div className='w-full grid gap-3 grid-cols-1 lg:grid-cols-3 mt-3'>
        <Card
          className="first:bg-[#4CACF0] dark:first:bg-[#4CACF0] text-slate-100"
          btn="text-slate-100"
          icon={<IoTrophyOutline />}
          title="Main Balance"
          amount={
            balance !== null ? `N${balance}` : <Skeleton width={80} height={20} baseColor="#4CACF0" highlightColor="#85D7FF" />
          }
          button="Smart Earner"
          content={
            <button
              className="text-2xl cursor-pointer"
              onClick={() => setIsShowBalance(!isShowBalance)}
            >
              {isShowBalance ? <BiHide /> : <RxEyeOpen />}
            </button>
          }
        />
        <Card
          title="Referral Balance"
          amount={
            referralBalance !== null ? `N${referralBalance.toFixed(2)}` : (
              <Skeleton width={80} height={20} baseColor="#FFFFFF" highlightColor="#E0E0E0" />
            )
          }
          button="Refer more people"
          content={<button className='text-2xl cursor-pointer'><BiHide /></button>}
        />
        <Card className="font-normal text-lg" justify="items-center" btn="py-[3px] text-sm px-7 border border-blue-500 rounded-lg bg-white dark:text-black" title="Support" amount="Need some help?" button="Contact Us" content={<div className='lg:hidden flex flex-col gap-4'><img src={Playstore} width={100} height={44} className='cursor-pointer' /><img src={Appstore} width={100} height={44} className='cursor-pointer' /></div>} />
      </div>

    </div>
  )
}

export default Balance
