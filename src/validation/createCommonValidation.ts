import type { TFunction } from "i18next";
import * as yup from "yup";

import { CreateValidationFunction } from "./type";

const createCommonValidation: CreateValidationFunction = (t, isEdit) => {
  return yup.object({
    ...(isEdit
      ? {
          id: yup.number().label(t("field:id")).required(),
        }
      : {}),
    name: yup.string().label(t("field:name")).required(),
    note: yup.string().label(t("field:note")).nullable(),
  });
};

export default createCommonValidation;
