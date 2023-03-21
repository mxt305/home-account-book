import "@/styles/globals.css";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

import LoadingBackdrop from "@/components/layout/LoadingBackdrop";

import { wrapper } from "../store";

import createEmotionCache from "./_createEmotionCache";
import theme from "./_theme";

const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const fetcher = (url: string) => axios(url).then((res) => res.data);

function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps, emotionCache = clientSideEmotionCache } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SWRConfig value={{ fetcher }}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Provider store={store}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
              <Toaster position="bottom-center" />
              <LoadingBackdrop />
            </Provider>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </SWRConfig>
  );
}

export default appWithTranslation(App);
