import {
  mdiAccountSupervisor,
  mdiArchive,
  mdiCash,
  mdiFileChart,
  mdiHumanMaleFemaleChild,
  mdiViewDashboard,
  mdiWallet,
} from "@mdi/js";

export const sideMenuWidth = "200px";

export interface MenuDataRow {
  name: string;
  path?: string;
  icon?: string;
}

export const menuData: MenuDataRow[] = [
  { name: "dashboard", icon: mdiViewDashboard, path: "/" },
  { name: "user", icon: mdiAccountSupervisor },
  { name: "member", icon: mdiHumanMaleFemaleChild, path: "/member" },
  { name: "bankAccount", icon: mdiWallet, path: "/bankAccount" },
  { name: "accountType", icon: mdiArchive, path: "/accountType" },
  { name: "accountData", icon: mdiCash },
  { name: "monthlyReport", icon: mdiFileChart },
];
