import ControlPanelIcon from "../components/icons/ControlPanelIcon";
import CommunicationIcon from "../components/icons/CommunicationIcon";
import ProfileIcon from "../components/icons/ProfileIcon";
import ComplaintsIcon from "../components/icons/ComplaintsIcon";
import PropertiesIcon from "../components/icons/PropertiesIcon";
import { RouteModel } from "../models/generic/routes";

const customerRoutes: RouteModel[] = [
    {
        path: "/dashboard/control-panel",
        name: "ControlPanel",
        icon: ControlPanelIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/citizen/taxes/properties",
        name: "Properties",
        icon: PropertiesIcon,
        isOnMenu: true,
        section: "Taxes",
        label: null,
    },
    {
        path: "/dashboard/citizen/taxes/communications",
        name: "Communications",
        icon: CommunicationIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/citizen/communications",
        name: "Communications",
        icon: CommunicationIcon,
        isOnMenu: true,
        section: "CommunicationsComplaints",
        label: null,
    },
    {
        path: "/dashboard/citizen/complaints",
        name: "Complaints",
        icon: ComplaintsIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/citizen/profile",
        name: "Profile",
        icon: ProfileIcon,
        isOnMenu: true,
        section: "Others",
        label: null,
    },
];

export default customerRoutes;
