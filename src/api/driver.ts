import request from "@/utils/request";
import type { AxiosRequestConfig } from "axios";

export function getDriverPaginationApi(
  params?: Record<string, any>,
  options?: AxiosRequestConfig,
) {
  return request({
    url: "/driver/pagination",
    method: "get",
    params,
    ...options,
  });
}

export function getDriverDetailApi(id: number, options?: AxiosRequestConfig) {
  return request({
    url: "/driver/detail",
    method: "get",
    params: {
      id,
    },
    ...options,
  });
}

export function createDriverApi(
  data: Record<string, any>,
  options?: AxiosRequestConfig,
) {
  return request({
    url: "/driver/create",
    method: "post",
    data,
    ...options,
  });
}

export function updateDriverApi(
  data: Record<string, any>,
  options?: AxiosRequestConfig,
) {
  return request({
    url: "/driver/update",
    method: "post",
    data,
    ...options,
  });
}

export function deleteDriverApi(id: number, options?: AxiosRequestConfig) {
  return request({
    url: "/driver/delete",
    method: "post",
    params: {
      id,
    },
    ...options,
  });
}
