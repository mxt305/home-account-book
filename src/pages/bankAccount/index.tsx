import React, { ReactElement } from "react";

import Layout from "@/components/layout/MainLayout";

function BankAccount() {
  return <div>index</div>;
}

export default BankAccount;

BankAccount.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
