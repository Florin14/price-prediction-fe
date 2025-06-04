import ControlPanelIcon from "../components/icons/ControlPanelIcon";
import CommunicationIcon from "../components/icons/CommunicationIcon";
import ProfileIcon from "../components/icons/ProfileIcon";
import ComplaintsIcon from "../components/icons/ComplaintsIcon";
import PropertiesIcon from "../components/icons/PropertiesIcon";
import { RouteModel } from "../models/generic/routes";

const customerRoutes: RouteModel[] = [
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

export default customerRoutes;
