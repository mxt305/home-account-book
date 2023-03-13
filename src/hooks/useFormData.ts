import useSWR from "swr";

import useCUD from "./useCUD";

interface FormDataConfig {
  apiPath: string;
  id?: number | string;
  isCopy?: boolean;
}

function useFormData<Values>({ apiPath, id, isCopy = false }: FormDataConfig) {
  const { data, mutate } = useSWR<Values>(id ? `${apiPath}/${id}` : null);
  const { handleCreate, handleUpdate, handleDelete } = useCUD();
  const saveData = async (dataToSave: Values) => {
    if (isCopy || !id) {
      return await handleCreate(apiPath, dataToSave).then(() => {
        mutate();
      });
    } else {
      return await handleUpdate(apiPath, dataToSave).then(() => {
        mutate();
      });
    }
  };
  const deleteData = async () => {
    return await handleDelete(`${apiPath}/${id}`).then(() => {
      mutate();
    });
  };
  return { data, mutate, saveData, deleteData };
}

export default useFormData;
