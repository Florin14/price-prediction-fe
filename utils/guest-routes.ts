import CommunicationIcon from "../components/icons/CommunicationIcon";
import ComplaintsIcon from "../components/icons/ComplaintsIcon";
import { RouteModel } from "../models/generic/routes";

const guestRoutes: RouteModel[] = [
    {
        path: "/guest/prediction",
        name: "Prediction",
        icon: CommunicationIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/guest/history",
        name: "History",
        icon: CommunicationIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/guest/home",
        name: "Home",
        icon: ComplaintsIcon,
        isOnMenu: true,
        label: null,
    },
];

export const guestSettingRoutes: RouteModel[] = [];

export default guestRoutes;
