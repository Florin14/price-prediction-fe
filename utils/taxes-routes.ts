import ControlPanelIcon from "../components/icons/ControlPanelIcon";
import RegistryIcon from "../components/icons/RegistryIcon";
import CommunicationIcon from "../components/icons/CommunicationIcon";
import AccountsIcon from "../components/icons/AccountsIcon";
import PropertiesIcon from "../components/icons/PropertiesIcon";
import { RouteModel } from "../models/generic/routes";

const taxesRoutes: RouteModel[] = [
    {
        path: "/dashboard/control-panel",
        name: "ControlPanel",
        icon: ControlPanelIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/taxes/properties",
        name: "Properties",
        icon: PropertiesIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/taxes/registry",
        name: "Registry",
        icon: RegistryIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/taxes/communications",
        name: "Communications",
        icon: CommunicationIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/taxes/valid-accounts",
        name: "ValidAccounts",
        icon: AccountsIcon,
        isOnMenu: true,
        label: null,
    },
];

export const taxesSettingRoutes: RouteModel[] = [];

export default taxesRoutes;
