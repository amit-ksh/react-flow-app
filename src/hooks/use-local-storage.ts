import { useQuery, useQueryClient } from "@tanstack/react-query";

type StorageKey = string;

function getLocalStorage<T>(key: StorageKey, initialValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  } catch {
    return initialValue;
  }
}

function setLocalStorage<T>(key: StorageKey, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useLocalStorageQuery<T>(
  key: StorageKey,
  initialValue: T
) {
  const queryClient = useQueryClient();

  const query = useQuery<T>({
    queryKey: ["localStorage", key],
    queryFn: () => getLocalStorage<T>(key, initialValue),
    initialData: () => getLocalStorage<T>(key, initialValue),
  });

  const setValue = (value: T) => {
    setLocalStorage(key, value);
    queryClient.setQueryData(["localStorage", key], value);
  };

  return {
    ...query,
    setValue,
  };
}
