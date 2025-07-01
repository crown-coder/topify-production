import { LuLayoutDashboard } from "react-icons/lu";
import { GiWallet } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { AiOutlineTransaction } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { GiCycle } from "react-icons/gi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { LuSquarePlay } from "react-icons/lu";
import { LuGraduationCap } from "react-icons/lu";
import { LiaAwardSolid } from "react-icons/lia";
import { CiCreditCard2 } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

import AEDC from '../assets/AEDC.png'
import BEDC from '../assets/beddc.png'
import KEDCO from '../assets/kedco.png'
import JED from '../assets/jed.png'
import YEDC from '../assets/YEDC.png'

export const electricCompany = [
  {
    name: "JED",
    image: JED,
  },
  {
    name: "YEDC",
    image: YEDC,
  },
  {
    name: "AEDC",
    image: AEDC,
  },
  {
    name: "BEDC",
    image: BEDC,
  },
  {
    name: "KEDCO",
    image: KEDCO,
  },
]

export const NAVIGATION_ITEMS = [
  {
    category: "Dashboard",
    items: [
      {
        name: "Dashboard",
        icon: LuLayoutDashboard,
        route: "",
        title: "dashboard",
      },
    ],
  },
  {
    category: "Finance",
    items: [
      {
        name: "Fund Wallet",
        icon: GiWallet,
        route: "fund-wallet",
        title: "fund-wallet",
      },
      {
        name: "Transactions",
        icon: GrTransaction,
        route: "transactions",
        title: "transactions",
      },
      {
        name: "Wallet to Wallet",
        icon: AiOutlineTransaction,
        route: "wallet-to-wallet",
        title: "wallet-to-wallet",
      },
    ],
  },
  {
    category: "Mobile Services",
    items: [
      {
        name: "Buy Airtime",
        icon: BsTelephone,
        route: "buy-airtime",
        title: "buy-airtime",
      },
      {
        name: "Buy Data",
        icon: CiGlobe,
        route: "buy-data",
        title: "buy-data",
      },
      {
        name: "Airtime to Cash",
        icon: GiCycle,
        route: "airtime-to-cash",
        title: "airtime-to-cash",
      },
    ],
  },
  {
    category: "Utility",
    items: [
      {
        name: "Pay Electricity Bill",
        icon: AiOutlineThunderbolt,
        route: "pay-electricity-bill",
        title: "pay-electricity-bill",
      },
      {
        name: "Pay TV Bill",
        icon: LuSquarePlay,
        route: "pay-tv-bill",
        title: "pay-tv-bill",
      },
      {
        name: "Result Checker",
        icon: LuGraduationCap,
        route: "result-checker",
        title: "result-checker",
      },
    ],
  },
  {
    category: "More",
    items: [
      {
        name: "Referral & Rewards",
        icon: LiaAwardSolid,
        route: "referral-rewards",
        title: "referral-rewards",
      },
      {
        name: "Virtual Card",
        icon: CiCreditCard2,
        route: "virtual-card",
        title: "virtual-card",
      },
    ],
  },
  {
    category: "Settings",
    items: [
      {
        name: "Settings",
        icon: CiSettings,
        route: "settings",
        title: "settings",
      },
      {
        name: "Log Out",
        icon: CiLogout,
        route: "logout",
        title: "log-out",
      },
    ],
  },
];

export const ADMIN_NAVIGATION_ITEMS = [
  {
    category: "Dashboard",
    items: [
      {
        name: "Dashboard",
        icon: LuLayoutDashboard,
        route: "",
        title: "dashboard",
      },
    ],
  },
  {
    category: "Finance Management",
    items: [
      {
        name: "User Funding/Debit",
        icon: GiWallet,
        route: "user-funding",
        title: "user-funding",
      },
      {
        name: "Transactions",
        icon: GrTransaction,
        route: "transactions",
        title: "transactions",
      },
      {
        name: "Analytics",
        icon: AiOutlineTransaction,
        route: "analytics",
        title: "analytics",
      },
    ],
  },
  {
    category: "Plan Management",
    items: [
      {
        name: "Data Plans",
        icon: BsTelephone,
        route: "data-plans",
        title: "data-plans",
      },
      {
        name: "Data Type",
        icon: CiGlobe,
        route: "data-type",
        title: "data-type",
      },
      {
        name: "TV plans",
        icon: GiCycle,
        route: "tv-plans",
        title: "tv-plans",
      },
    ],
  },
  {
    category: "Analytics & Services",
    items: [
      {
        name: "Users",
        icon: AiOutlineThunderbolt,
        route: "users",
        title: "users",
      },
      {
        name: "Service Management",
        icon: LuSquarePlay,
        route: "service-management",
        title: "service-management",
      },
      {
        name: "Service Discounts",
        icon: LuGraduationCap,
        route: "service-discounts",
        title: "service-discounts",
      },
      {
        name: "Service Charges",
        icon: LuGraduationCap,
        route: "service-charges",
        title: "service-charges",
      },
      {
        name: "Referral & Promo",
        icon: LuGraduationCap,
        route: "referral-promo",
        title: "referral-promo",
      },

    ],
  },
  {
    category: "More",
    items: [
      {
        name: "Configuration",
        icon: CiSettings,
        route: "configuration",
        title: "configuration",
      },
      {
        name: "Log Out",
        icon: CiLogout,
        route: "logout",
        title: "logout",
      },
    ],
  },
];

export const transactionData = [
  {
    id: "01",
    transactionId: "#2255DDC35",
    amount: "₦250",
    description: "Airtime purchase",
    phoneNumber: "07025654751",
    status: 1,
    apiResponse: "201 Created"
  },
  {
    id: "02",
    transactionId: "#2255DEC02",
    amount: "₦450",
    description: "Data purchase",
    phoneNumber: "07025654751",
    status: 2,
    apiResponse: "400 Bad Request"
  },
  {
    id: "03",
    transactionId: "#2255EEA89",
    amount: "₦1,250",
    description: "Electricity Bill payment",
    phoneNumber: "07025654751",
    status: 3,
    apiResponse: "200 OK"
  },
  {
    id: "03",
    transactionId: "#2255EEA89",
    amount: "₦1,250",
    description: "Electricity Bill payment",
    phoneNumber: "07025654751",
    status: 2,
    apiResponse: "200 OK"
  },
  {
    id: "03",
    transactionId: "#2255EEA89",
    amount: "₦1,250",
    description: "Electricity Bill payment",
    phoneNumber: "07025654751",
    status: 2,
    apiResponse: "400 Bad Request"
  },
  {
    id: "03",
    transactionId: "#2255EEA89",
    amount: "₦1,250",
    description: "Electricity Bill payment",
    phoneNumber: "07025654751",
    status: 1,
    apiResponse: "400 Bad Request"
  },
  {
    id: "03",
    transactionId: "#2255EEA89",
    amount: "₦1,250",
    description: "Electricity Bill payment",
    phoneNumber: "07025654751",
    status: 3,
    apiResponse: "200 OK"
  },
  {
    id: "03",
    transactionId: "#2255EEA89",
    amount: "₦1,250",
    description: "Electricity Bill payment",
    phoneNumber: "07025654751",
    status: 2,
    apiResponse: "200 OK"
  }
];
export const refferalData = [
  {
    id: "01",
    username: "usertag",
    phoneNumber: "08123484031",
    email: "usertag@gmail.com",
    Bonus: "N250",
    dateJoined: "22/10/2024"
  },
  {
    id: "02",
    username: "Idris Pennicle",
    phoneNumber: "08123484031",
    email: "idrispennicleg@gmail.com",
    Bonus: "N450",
    dateJoined: "22/10/2024"
  },
  {
    id: "03",
    username: "rouben",
    phoneNumber: "08123484031",
    email: "raa@gmail.com",
    Bonus: "N1,250",
    dateJoined: "22/10/2024"
  },

];

export const dataPlans = {
  Daily: [
    { type: "plain", size: "500MB", duration: "Hourly", amount: "N100", validity: "1", className: "col-span-2" },
    { type: "multi", size: "100MB", duration: "Daily", amount: "N70", validity: "24", className: "col-span-2" },
    { type: "plain", size: "5GB", duration: "Hourly", amount: "N700", validity: "1" },
    { type: "multi", size: "3GB", duration: "Daily", amount: "N600", validity: "24", className: "row-span-2" },
    { type: "plain", size: "4GB", duration: "6 Hours", amount: "N400", validity: "6", className: "col-span-2 row-span-2" },
    { type: "multi", size: "2GB+Free Chat", duration: "Daily", amount: "N350", validity: "24" },
    { type: "plain", size: "1GB", duration: "Night", amount: "N150", validity: "12", className: "col-span-3" },
    { type: "multi", size: "1.5GB", duration: "2 Days", amount: "N450", validity: "48" },
  ],
  SME: [
    { type: "multi", size: "750MB", duration: "Hourly", amount: "N120", validity: "1", className: "col-span-2" },
    { type: "plain", size: "2.5GB", duration: "Daily", amount: "N200", validity: "24", className: "col-span-2" },
    { type: "multi", size: "12GB", duration: "Hourly", amount: "N1200", validity: "1" },
    { type: "plain", size: "6GB", duration: "Daily", amount: "N800", validity: "24", className: "row-span-2" },
    { type: "multi", size: "8GB", duration: "4 Hours", amount: "N600", validity: "4", className: "col-span-2 row-span-2" },
    { type: "plain", size: "3GB+10mins Call", duration: "Daily", amount: "N500", validity: "24" },
    { type: "multi", size: "1GB", duration: "Weekend", amount: "N100", validity: "72", className: "col-span-3" },
    { type: "plain", size: "15GB", duration: "5 Days", amount: "N3000", validity: "120" },
  ],
  SME2: [
    { type: "plain", size: "1GB", duration: "Hourly", amount: "N200", validity: "1", className: "col-span-2" },
    { type: "multi", size: "2GB", duration: "Daily", amount: "N350", validity: "24", className: "col-span-2" },
    { type: "plain", size: "20GB", duration: "Hourly", amount: "N2000", validity: "1" },
    { type: "multi", size: "10GB", duration: "Daily", amount: "N1500", validity: "24", className: "row-span-2" },
    { type: "plain", size: "5GB", duration: "Night", amount: "N500", validity: "12", className: "col-span-2 row-span-2" },
    { type: "multi", size: "7GB+Free Socials", duration: "Daily", amount: "N700", validity: "24" },
    { type: "plain", size: "3.5GB", duration: "Weekend", amount: "N250", validity: "72", className: "col-span-3" },
    { type: "multi", size: "25GB", duration: "7 Days", amount: "N5000", validity: "168" },
  ],
  Gifting: [
    { type: "multi", size: "2GB", duration: "4 Hours", amount: "N300", validity: "4", className: "col-span-2" },
    { type: "plain", size: "5GB", duration: "Daily", amount: "N1000", validity: "24", className: "col-span-2" },
    { type: "multi", size: "30GB", duration: "Hourly", amount: "N2500", validity: "1" },
    { type: "plain", size: "15GB", duration: "Daily", amount: "N2000", validity: "24", className: "row-span-2" },
    { type: "multi", size: "10GB", duration: "Weekend", amount: "N700", validity: "72", className: "col-span-2 row-span-2" },
    { type: "plain", size: "2GB+5mins", duration: "Daily", amount: "N450", validity: "24" },
    { type: "multi", size: "3GB", duration: "Night", amount: "N200", validity: "12", className: "col-span-3" },
    { type: "plain", size: "50GB", duration: "14 Days", amount: "N10000", validity: "336" },
  ],
  Weekly: [
    { type: "plain", size: "4GB", duration: "Hourly", amount: "N500", validity: "1", className: "col-span-2" },
    { type: "multi", size: "10GB", duration: "Weekly", amount: "N2000", validity: "168", className: "col-span-2" },
    { type: "plain", size: "25GB", duration: "2 Days", amount: "N4000", validity: "48" },
    { type: "multi", size: "8GB", duration: "Daily", amount: "N1200", validity: "24", className: "row-span-2" },
    { type: "plain", size: "12GB+5mins Call", duration: "7 Days", amount: "N2500", validity: "168", className: "col-span-2 row-span-2" },
    { type: "multi", size: "5GB", duration: "Night", amount: "N800", validity: "12" },
    { type: "plain", size: "18GB", duration: "Weekend", amount: "N3000", validity: "72", className: "col-span-3" },
    { type: "multi", size: "50GB", duration: "14 Days", amount: "N15000", validity: "336" },
  ],
  Monthly: [
    { type: "multi", size: "15GB", duration: "Monthly", amount: "N5000", validity: "720", className: "col-span-2" },
    { type: "plain", size: "30GB", duration: "30 Days", amount: "N10000", validity: "720", className: "col-span-2" },
    { type: "multi", size: "50GB", duration: "30 Days", amount: "N15000", validity: "720" },
    { type: "plain", size: "75GB", duration: "30 Days", amount: "N20000", validity: "720", className: "row-span-2" },
    { type: "multi", size: "10GB+Free Socials", duration: "Monthly", amount: "N3500", validity: "720", className: "col-span-2 row-span-2" },
    { type: "plain", size: "20GB", duration: "Monthly", amount: "N7000", validity: "720" },
    { type: "multi", size: "100GB", duration: "Monthly", amount: "N25000", validity: "720", className: "col-span-3" },
    { type: "plain", size: "200GB", duration: "Quarterly", amount: "N50000", validity: "2160" },
  ],
  Annually: [
    { type: "multi", size: "2GB", duration: "4 Hours", amount: "N300", validity: "4", className: "col-span-2" },
    { type: "plain", size: "5GB", duration: "Daily", amount: "N1000", validity: "24", className: "col-span-2" },
    { type: "multi", size: "30GB", duration: "Hourly", amount: "N2500", validity: "1" },
    { type: "plain", size: "15GB", duration: "Daily", amount: "N2000", validity: "24", className: "row-span-2" },
    { type: "multi", size: "10GB", duration: "Weekend", amount: "N700", validity: "72", className: "col-span-2 row-span-2" },
    { type: "plain", size: "2GB+5mins", duration: "Daily", amount: "N450", validity: "24" },
    { type: "multi", size: "3GB", duration: "Night", amount: "N200", validity: "12", className: "col-span-3" },
    { type: "plain", size: "50GB", duration: "14 Days", amount: "N10000", validity: "336" },
  ],
};
