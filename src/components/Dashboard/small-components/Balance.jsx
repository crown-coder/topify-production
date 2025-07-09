import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useModal } from '../../ModalContext';
import Card from './Card';
import KycCard from './Cards/KycCard';
import Appstore from '../../../assets/appstore.png';
import Playstore from '../../../assets/playstore.png';
import { IoTrophyOutline, IoRefresh } from "react-icons/io5";
import { BiHide } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";
import { MdVerified } from "react-icons/md";
import Cookies from 'js-cookie';

const fetchUserData = async () => {
  const response = await axios.get(`/api/api2/user`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
  });
  return response.data;
};

const Balance = () => {
  const [isShowBalance, setIsShowBalance] = useState(true);
  const { openModal, closeModal } = useModal();
  const [verified, setVerified] = useState(false);
  const xsrfToken = Cookies.get('XSRF-TOKEN');

  const {
    data: user,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });

  const isEmailVerified = user?.email_verified_at;
  const isKYCCompleted = user?.kyc_verified;

  const handleVerifyClick = async () => {
    try {
      const response = await axios.post(
        `/api/custom-email/verification-notification`,
        {
          email: user?.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfToken,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setVerified(true);
    } catch (err) {
      console.error("Error Sending Verification Email", err);
    }
  };


  const handleKYCModal = () => {
    openModal(<KycCard closeModal={closeModal} />);
  };

  // Format balance for display
  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(balance).replace('NGN', '₦');
  };

  return (
    <div className='p-2 bg-white w-full my-2 rounded-xl'>

      {!isEmailVerified && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 rounded-md max-w-md mb-2">
          {!verified ? (
            <p>
              You haven't verified your email. Click{' '}
              <button
                onClick={handleVerifyClick}
                className="text-blue-600 hover:underline font-medium"
              >
                here
              </button>{' '}
              to verify.
            </p>
          ) : (
            <p>We have sent you an email to verify.</p>
          )}
        </div>
      )}

      <div className='w-full flex justify-between items-center'>
        <div>
          <h2 className='font-semibold text-lg mb-[2px] text-[#434343] dark:text-white'>
            Welcome Back, <span>{user?.name?.split(' ')[0] || 'User'}</span>
          </h2>
          {isKYCCompleted ? (
            <p className='flex items-center gap-1 italic text-green-500'>
              <span className='text-xl'><MdVerified /></span>
              <span className='text-sm cursor-pointer'>Verified User</span>
            </p>
          ) : (
            <p className='font-light text-sm text-[#E2B93B]'>
              Complete your KYC to enjoy all our services.
              <span className='text-blue-500 cursor-pointer underline' onClick={handleKYCModal}> Proceed</span>
            </p>
          )}
        </div>
        <div className='flex gap-2 max-lg:hidden'>
          <button><img src={Appstore} width={90} height={44} alt="App Store" /></button>
          <button><img src={Playstore} width={90} height={44} alt="Play Store" /></button>
        </div>
      </div>

      <div className='w-full grid gap-3 grid-cols-1 lg:grid-cols-3 mt-3'>
        <Card
          className="first:bg-[#4CACF0] dark:first:bg-[#4CACF0] text-slate-100"
          btn="text-slate-100"
          icon={<IoTrophyOutline />}
          title="Main Balance"
          amount={
            isLoading || isFetching ? (
              <Skeleton width={80} height={20} baseColor="#4CACF0" highlightColor="#85D7FF" />
            ) : (
              isShowBalance ?
                formatBalance(parseFloat(user?.wallet?.balance || 0)) :
                '****'
            )
          }
          button="Smart Earner"
          content={
            <div className="flex items-center gap-2">
              <button
                className="text-2xl cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setIsShowBalance(!isShowBalance)}
              >
                {isShowBalance ? <BiHide /> : <RxEyeOpen />}
              </button>
              <button
                className={`text-xl cursor-pointer hover:opacity-80 transition-opacity ${isFetching ? 'animate-spin' : ''}`}
                onClick={() => refetch()}
                disabled={isFetching}
              >
                <IoRefresh />
              </button>
            </div>
          }
        />

        <Card
          title="Referral Balance"
          amount={
            isLoading ? (
              <Skeleton width={80} height={20} baseColor="#FFFFFF" highlightColor="#E0E0E0" />
            ) : (
              isShowBalance ?
                formatBalance(parseFloat(user?.wallet?.bonus_balance || 0)) :
                '****'
            )
          }
          button="Refer more people"
          content={
            <button
              className="text-2xl cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsShowBalance(!isShowBalance)}
            >
              {isShowBalance ? <BiHide /> : <RxEyeOpen />}
            </button>
          }
        />

        <Card
          className="font-normal text-lg"
          justify="items-center"
          btn="py-[3px] text-sm px-7 border border-blue-500 rounded-lg bg-white dark:text-black"
          title="Support"
          amount="Need some help?"
          button="Contact Us"
          content={
            <div className='lg:hidden flex flex-col gap-4'>
              <img src={Playstore} width={100} height={44} className='cursor-pointer' alt="Play Store" />
              <img src={Appstore} width={100} height={44} className='cursor-pointer' alt="App Store" />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Balance;
