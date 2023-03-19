import type { TFunction } from "i18next";
import * as yup from "yup";

import { CreateValidationFunction } from "./type";

const createUserValidation: CreateValidationFunction = (t, isEdit) => {
  return yup.object({
    ...(isEdit
      ? {
          id: yup.string().label(t("field:id")).required(),
        }
      : {
          username: yup.string().label(t("field:username")).required(),
          password: yup.string().label(t("field:password")).required(),
        }),
    name: yup.string().label(t("field:name")).required(),
    type: yup.number().label(t("field:type")).required(),
    memberId: yup.number().label(t("field:member")).nullable(),
  });
};

export default createUserValidation;
