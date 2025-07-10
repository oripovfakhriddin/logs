import axiosInstance from "@/services/axios-instance";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

const DEFAULT_STALE_TIME = 1000 * 5;

export type UseGetArgs<TData = any, TQueryFnData = unknown, TError = any> = {
  deps?: any[];
  options?: Partial<UseQueryOptions<TQueryFnData, TError, TData>>;
  config?: Omit<AxiosRequestConfig, "params">;
  params?: Record<string, unknown>;
};

export const getRequest = (url: string, config?: AxiosRequestConfig) =>
  axiosInstance.get(`/${url}`, config).then((res) => res.data);

export const useGet = <TData = any, TQueryFnData = unknown, TError = any>(
  url: string,
  args?: UseGetArgs<TData, TQueryFnData, TError>,
) => {
  const { deps, config, options, params } = args || {};

  return useQuery<TQueryFnData, TError, TData>({
    queryKey: (() => {
      const paramValues = Object.values(params || {});
      const hasParams = paramValues.length > 0;

      if (deps) {
        return hasParams ? [url, ...deps, ...paramValues] : [url, ...deps];
      }

      return hasParams ? [url, ...paramValues] : [url];
    })(),
    queryFn: () => getRequest(url, { ...config, params }),
    ...(options || { staleTime: DEFAULT_STALE_TIME }),
  });
};
