import { NextApiResponse } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { CreateValidationFunction } from "@/validation";

async function validateServerSide(
  data: any,
  createValidation: CreateValidationFunction,
  isEdit = false
): Promise<void> {
  await serverSideTranslations("zh-TW", ["field"]);
  if (i18n) {
    const schema = createValidation(i18n.t, isEdit);
    await schema.validate(data);
  }
}

export default validateServerSide;
