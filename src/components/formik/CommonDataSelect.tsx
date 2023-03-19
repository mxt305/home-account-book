import React, { useMemo } from "react";
import useSWR from "swr";

import { CommonDataValue } from "../CommonDataForm";

import { Select, SelectionItem, SelectProps } from ".";

export type CommonDataSelectProps = Omit<SelectProps, "items"> & {
  apiPath: string;
};

function CommonDataSelect<DataValue extends CommonDataValue>({
  apiPath,
  ...props
}: CommonDataSelectProps) {
  const { data } = useSWR<DataValue[]>(apiPath);
  const SelectionItem = useMemo<SelectionItem[]>(() => {
    if (data) {
      return data.map((row) => ({
        value: row.id || "",
        text: row.name,
      }));
    }
    return [];
  }, [data]);
  return <Select items={SelectionItem} {...props} />;
}

export default CommonDataSelect;
