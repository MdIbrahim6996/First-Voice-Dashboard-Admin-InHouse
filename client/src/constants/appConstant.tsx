import {
    MdSpaceDashboard,
    MdPerson,
    MdList,
    MdWorkspacePremium,
} from "react-icons/md";
import { RiFileAddFill, RiBook2Fill, RiTeamFill } from "react-icons/ri";
import { BsCalendar2EventFill } from "react-icons/bs";

export const PUSHER_SECRET = "3598d69c8453a73ad670";
export const PUSHER_CLUSTER = "ap2";

export const limitArray = [30, 50, 100, 500, 1000, 5000, 10000];

export const oldLeadsProcess = [
    { name: "COMPREHENSIVE CARE (WG)" },
    { name: "MEDI ALARM 247" },
    { name: "NO 1 WHITE GOODS" },
    { name: "CLEAR WATER" },
    { name: "ARA ENERGY BOILERS" },
    { name: "PROTECT ALERT" },
    { name: "DRAINAGE PROTECTION LINE" },
    { name: "ARA WG" },
];
export const oldLeadFormProcess = [
    { name: "DEFAULT" },
    // { name: null },
    { name: "LEAD GEN" },
    { name: "WHITE GOODS 1" },
    { name: "BOILER2" },
    { name: "BOILER" },
    { name: "MEDICAL SOS" },
    { name: "WHITE GOODS 2" },
    { name: "BOILER1" },
    { name: "MEDICAL SOS 2" },
    { name: "MEDICAL SOS 1" },
    { name: "BOILER3" },
    { name: "MEDICAL SOS 3" },
];

export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const adminLinks = [
    {
        id: 1,
        title: "MainDashboard",
        link: "/admin/main-dashboard",
        icon: <MdSpaceDashboard className="text-xl" />,
    },
    {
        id: 2,
        title: "Add Lead",
        link: "/admin/add-lead",
        icon: <RiFileAddFill className="text-xl" />,
    },
    {
        id: 3,
        title: "Leads",
        link: "/admin/leads",
        icon: <MdList className="text-xl" />,
    },
    {
        id: 4,
        title: "Old Leads",
        link: "/admin/old-leads",
        icon: <MdList className="text-xl" />,
    },
    {
        id: 5,
        title: "Old LeadForms",
        link: "/admin/old-leadforms",
        icon: <MdList className="text-xl" />,
    },
    {
        id: 6,
        title: "Users",
        link: "/admin/users",
        icon: <MdPerson className="text-xl" />,
    },
    {
        id: 7,
        title: "Closers",
        link: "/admin/closers",
        icon: <MdPerson className="text-xl" />,
    },
];
export const superAdminLinks = [
    // {
    //     id: 1,
    //     title: "Dashboard",
    //     link: "/superadmin/dashboard",
    //     icon: <MdDashboard className="text-xl" />,
    // },
    {
        id: 2,
        title: "Main Dashboard",
        link: "/superadmin/main-dashboard",
        icon: <MdSpaceDashboard className="text-xl" />,
    },
    // {
    //     id: 3,
    //     title: "Attendance",
    //     link: "/superadmin/attendance",
    //     icon: <IoBookSharp className="text-xl" />,
    // },
    {
        id: 4,
        title: "Add Lead",
        link: "/superadmin/add-lead",
        icon: <RiFileAddFill className="text-xl" />,
    },
    {
        id: 5,
        title: "Leads",
        link: "/superadmin/leads",
        icon: <MdList className="text-xl" />,
    },
    {
        id: 6,
        title: "Old-Leads",
        link: "/superadmin/old-leads",
        icon: <MdList className="text-xl" />,
    },
    {
        id: 7,
        title: "Old-LeadForms",
        link: "/superadmin/old-leadforms",
        icon: <MdList className="text-xl" />,
    },
    // {
    //     id: 7,
    //     title: "Add Holiday",
    //     link: "/superadmin/add-holiday",
    //     icon: <MdEventNote className="text-xl" />,
    // },
    {
        id: 8,
        title: "All Attendance",
        link: "/superadmin/all-attendance",
        icon: <BsCalendar2EventFill className="text-xl" />,
    },
    {
        id: 9,
        title: "Monthly Attendance",
        link: "/superadmin/monthly-attendance",
        icon: <BsCalendar2EventFill className="text-xl" />,
    },
    {
        id: 10,
        title: "Users",
        link: "/superadmin/users",
        icon: <MdPerson className="text-xl" />,
    },
    {
        id: 100,
        title: "Old Users",
        link: "/superadmin/old-users",
        icon: <MdPerson className="text-xl" />,
    },
    {
        id: 11,
        title: "Process",
        link: "/superadmin/process",
        icon: <MdWorkspacePremium className="text-xl" />,
    },
    {
        id: 12,
        title: "Plan",
        link: "/superadmin/plan",
        icon: <RiBook2Fill className="text-xl" />,
    },
    {
        id: 13,
        title: "Status",
        link: "/superadmin/status",
        icon: <MdPerson className="text-xl" />,
    },
    {
        id: 14,
        title: "Teams",
        link: "/superadmin/teams",
        icon: <RiTeamFill className="text-xl" />,
    },
];

export const accountantLinks = [
    {
        id: 1,
        title: "Users",
        link: "/accountant/users",
        icon: <MdPerson className="text-xl" />,
    },
    {
        id: 2,
        title: "Closers",
        link: "/accountant/closers",
        icon: <MdPerson className="text-xl" />,
    },
    {
        id: 3,
        title: "Monthly Attendance",
        link: "/accountant/monthly-attendance",
        icon: <BsCalendar2EventFill className="text-xl" />,
    },
];
