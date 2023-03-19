import type { TFunction } from "next-i18next";

import { SelectionItem } from "@/components/formik";

export const typeKeyMapping: Record<number, string> = {
  1: "user:types.1",
  2: "user:types.2",
};

export function getTypeName(t: TFunction, value: number | string): string {
  const nValue = Number(value) as keyof typeof typeKeyMapping;
  if (nValue in typeKeyMapping) {
    return t(typeKeyMapping[nValue]);
  }
  return "-";
}

export function getTypeSelectionItem(t: TFunction): SelectionItem[] {
  return Object.keys(typeKeyMapping).map((value) => ({
    text: t(typeKeyMapping[Number(value)]),
    value: Number(value),
  }));
}
