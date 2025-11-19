import { useSearchParams } from "react-router-dom";

type QueryParamValue = string | number | null | undefined;
type QueryParams = Record<string, QueryParamValue>;

function useQueryAndUpdateParams() {
  const [params, setParams] = useSearchParams();
  const searchParamsObject = Object.fromEntries([...params]);

  const updateParams = (newParams: QueryParams) => {
    const merged: QueryParams = {
      ...searchParamsObject,
      ...newParams,
    };

    const cleaned: Record<string, string> = {};

    Object.entries(merged).forEach(([key, value]) => {
      if (value == null || value === "" || value === "all") return;

      cleaned[key] = String(value);
    });

    setParams(cleaned);
  };

  return { query: searchParamsObject, updateParams };
}

export default useQueryAndUpdateParams;
