import ControlPanelIcon from "../components/icons/ControlPanelIcon";
import RegistryIcon from "../components/icons/RegistryIcon";
import CommunicationIcon from "../components/icons/CommunicationIcon";
import AccountsIcon from "../components/icons/AccountsIcon";
import { RouteModel } from "../models/generic/routes";

const adminRoutes: RouteModel[] = [
    {
        path: "/dashboard/control-panel",
        name: "ControlPanel",
        icon: ControlPanelIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/registry/registry",
        name: "Registry",
        icon: RegistryIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/registry/components",
        name: "Components",
        icon: ControlPanelIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/registry/communications",
        name: "Communications",
        icon: CommunicationIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/registry/modals",
        name: "Modals",
        icon: CommunicationIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/registry/validate-accounts",
        name: "ValidateAccounts",
        icon: AccountsIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/registry/valid-accounts",
        name: "ValidAccounts",
        icon: AccountsIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/registry/manage-communications",
        name: "ManageCommunications",
        icon: CommunicationIcon,
        isOnMenu: true,
        label: null,
    },
    {
        path: "/dashboard/registry/manage-users",
        name: "ManageUsers",
        icon: AccountsIcon,
        isOnMenu: true,
        label: null,
    },
];

export default adminRoutes;
