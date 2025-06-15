import { RouteModel } from "../models/generic/routes";
import HomeIcon from "../components/icons/HomeIcon";
import { FiBarChart2, FiList } from "react-icons/fi";

const customerRoutes: RouteModel[] = [
    {
        path: "/home",
        name: "Home",
        icon: HomeIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/customer/prediction",
        name: "Prediction",
        icon: FiBarChart2,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/customer/history",
        name: "History",
        icon: FiList,
        isOnMenu: true,
        label: null,
    },
];
export const customerSettingRoutes: RouteModel[] = [];

export default customerRoutes;
