import {
  mdiAccountSupervisor,
  mdiArchive,
  mdiCash,
  mdiFileChart,
  mdiHumanMaleFemaleChild,
  mdiViewDashboard,
  mdiWallet,
} from "@mdi/js";

export interface MenuDataRow {
  name: string;
  path?: string;
  icon?: string;
}

export const menuData: MenuDataRow[] = [
  { name: "dashboard", icon: mdiViewDashboard, path: "/" },
  { name: "user", icon: mdiAccountSupervisor },
  { name: "member", icon: mdiHumanMaleFemaleChild },
  { name: "bankAccount", icon: mdiWallet },
  { name: "accountType", icon: mdiArchive },
  { name: "accountData", icon: mdiCash },
  { name: "monthlyReport", icon: mdiFileChart },
];