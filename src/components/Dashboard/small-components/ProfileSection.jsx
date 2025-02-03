import React, { useState } from 'react'
import { motion } from "framer-motion";
import ProfileForm from './Forms/ProfileForm';
import UploadIcon from "../../../assets/direct-send.png";
import TrashIcon from "../../../assets/trash.png"
import { TbCopy } from "react-icons/tb";
import { IoCopy } from "react-icons/io5";
import { IoTrophyOutline } from "react-icons/io5";
import { LiaAwardSolid } from "react-icons/lia";

const ProfileSection = () => {

    const [copied, setCopied] = useState(false);

    const userName = "@jafftherealdeal";

    const handleCopy = () => {
        navigator.clipboard.writeText(userName).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className='my-2'
        >
            {/* top section */}
            <div className="w-full flex lg:items-center lg:justify-between max-lg:flex-col max-lg:gap-2 py-4 px-3 bg-white dark:bg-gray-800 rounded-lg relative">
                <div className='flex items-center gap-8'>
                    <div className='w-[90px] h-[90px] rounded-full flex items-center justify-center bg-[#031335CC]'>
                        <h1 className='text-5xl font-extrabold text-white'>J</h1>
                    </div>
                    <div>
                        <h4 className='text-[#1E1E1E] font-semibold text-xl'>Jeff Grimes</h4>
                        <small className='text-[#828282] text-sm flex gap-3 items-center'>{userName}
                            <span onClick={handleCopy} className='text-xl text-[#175682]'>
                                {copied ? <IoCopy /> : <TbCopy />}
                            </span>
                        </small>
                        <div className='flex gap-4 mt-3'>
                            <button className='flex gap-2 items-center py-1 px-3 border border-[#175682] rounded-md cursor-pointer'>
                                <img src={UploadIcon} />
                                <span className='font-light text-[#175682]'>Upload</span>
                            </button>
                            <button className='flex gap-2 items-center py-1 px-3 border border-[#E0E0E0] rounded-md cursor-pointer'>
                                <img src={TrashIcon} />
                                <span className='text-[#4F4F4F] font-light'>Remove</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex max-lg:justify-between gap-10'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-[#1E1E1E] font-light'>Package</p>
                        <p className='text-[#1E1E1E] font-light'>Account tier</p>
                    </div>
                    <div className='flex flex-col gap-3 text-right items-end'>
                        <p className='text-[#E2B93B] font-normal flex gap-1 items-center text-sm'>
                            <IoTrophyOutline className='text-[#E2B93B] font-bold' />
                            <span>Smart Earner</span>
                        </p>
                        <p className='text-[#E2B93B] font-normal flex gap-1 items-center text-sm'>
                            <LiaAwardSolid />
                            <span>Tier 1</span>
                        </p>
                    </div>
                </div>
            </div>
            <ProfileForm />
        </motion.div>

    )
}

export default ProfileSection