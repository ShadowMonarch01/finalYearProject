import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";

export const SidebarData = [
    {
        title:"Dashboard",
        path:"/ahome/",
        icon: <AiIcons.AiOutlineDashboard />
    },
    {
        title:"Scripts",
        path:"/ahome/scripts",
        icon: <BsIcons.BsBookHalf />
    },
    {
        title:"Upload",
        path:"/ahome/upload",
        icon: <FaIcons.FaUpload/>
    },
    {
        title:"Settings",
        path:"/ahome/settings",
        icon: <AiIcons.AiFillSetting />
    },
    {
        title:"Logout",
        path:"/alogin",
        icon: <AiIcons.AiOutlineLogout />
    },
]