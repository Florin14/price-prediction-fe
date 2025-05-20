import CommunicationIcon from "../components/icons/CommunicationIcon";
import ComplaintsIcon from "../components/icons/ComplaintsIcon";
import { RouteModel } from "../models/generic/routes";

const guestRoutes: RouteModel[] = [
    {
        path: "/guest/communications",
        name: "Communications",
        icon: CommunicationIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/guest/complaints",
        name: "Complaints",
        icon: ComplaintsIcon,
        isOnMenu: true,
        label: null,
    },
];

export const guestSettingRoutes: RouteModel[] = [];

export default guestRoutes;
