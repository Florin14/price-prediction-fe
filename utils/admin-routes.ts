import { RouteModel } from "../models/generic/routes";
import HomeIcon from "../components/icons/HomeIcon";
import { FiBarChart2, FiList } from "react-icons/fi";

const adminRoutes: RouteModel[] = [
    {
        path: "/home",
        name: "Home",
        icon: HomeIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/admin/prediction",
        name: "Prediction",
        icon: FiBarChart2,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/admin/history",
        name: "History",
        icon: FiList,
        isOnMenu: true,
        label: null,
    },
];
export const adminSettingRoutes: RouteModel[] = [];

export default adminRoutes;
