import type { TFunction } from "i18next";
import { Schema } from "yup";

export type CreateValidationFunction = (
  t: TFunction,
  isEdit?: boolean
) => Schema;
