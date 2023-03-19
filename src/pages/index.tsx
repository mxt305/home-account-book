import { GetStaticProps } from "next";
import { ScriptProps } from "next/script";
import React, { ReactElement } from "react";

import { getI18nProps } from "@/lib/getStatic";

import Layout from "../components/layout/MainLayout";

function Home() {
  return <div>dashboard</div>;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<ScriptProps> = async ({ locale }) =>
  getI18nProps(locale, ["common", "menu", "message"]);

export default Home;
