import "@/styles/globals.css";
import "@/i18n";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import type { AppProps } from "next/app";
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

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps, emotionCache = clientSideEmotionCache } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SWRConfig value={{ fetcher }}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
            <Toaster position="bottom-center" />
            <LoadingBackdrop />
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </SWRConfig>
  );
}
