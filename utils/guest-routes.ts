import { RouteModel } from "../models/generic/routes";
import HomeIcon from "../components/icons/HomeIcon";
import { FiBarChart2, FiList } from "react-icons/fi";

const guestRoutes: RouteModel[] = [
    {
        path: "/home",
        name: "Home",
        icon: HomeIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/guest/prediction",
        name: "Prediction",
        icon: FiBarChart2,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/guest/history",
        name: "History",
        icon: FiList,
        isOnMenu: true,
        label: null,
    },
];
export const guestSettingRoutes: RouteModel[] = [];

export default guestRoutes;
