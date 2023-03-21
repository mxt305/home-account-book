import type { TFunction } from "i18next";
import * as yup from "yup";

import { CreateValidationFunction } from "./type";

const createAccountDataValidation: CreateValidationFunction = (t, isEdit) => {
  return yup.object({
    ...(isEdit
      ? {
          id: yup.string().label(t("field:id")).required(),
        }
      : {}),
    date: yup.date().label(t("field:date")).required(),
    summary: yup.string().label(t("field:summary")).required(),
    amount: yup.number().label(t("field:amount")).required(),
    invoiceNumber: yup.string().label(t("field:invoiceNumber")).nullable(),
    memberId: yup.number().label(t("field:member")).required(),
    bankAccountId: yup.number().label(t("field:bankAccount")).required(),
    accountTypeId: yup.number().label(t("field:accountType")).required(),
  });
};

export default createAccountDataValidation;
