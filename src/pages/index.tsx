import React, { ReactElement } from "react";

import Layout from "../components/layout/MainLayout";

function Home() {
  return <div>index</div>;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
