import { GetStaticPropsResult } from "next";
import { ScriptProps } from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getI18nProps(
  locale: string | undefined,
  nameSapce: string[]
): Promise<GetStaticPropsResult<any>> {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", nameSapce)),
    },
  };
}
