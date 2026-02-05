import request from "@/utils/request";
import type { AxiosRequestConfig } from "axios";

export function getVehicleOptionsApi(options?: AxiosRequestConfig) {
  return request({
    url: "/vehicle/options",
    method: "get",
    ...options,
  });
}

export function getVehiclePaginationApi(
  params?: Record<string, any>,
  options?: AxiosRequestConfig,
) {
  return request({
    url: "/vehicle/pagination",
    method: "get",
    params,
    ...options,
  });
}

export function getVehicleDetailApi(id: number, options?: AxiosRequestConfig) {
  return request({
    url: "/vehicle/detail",
    method: "get",
    params: {
      id,
    },
    ...options,
  });
}

export function createVehicleApi(
  data: Record<string, any>,
  options?: AxiosRequestConfig,
) {
  return request({
    url: "/vehicle/create",
    method: "post",
    data,
    ...options,
  });
}

export function updateVehicleApi(
  data: Record<string, any>,
  options?: AxiosRequestConfig,
) {
  return request({
    url: "/vehicle/update",
    method: "post",
    data,
    ...options,
  });
}

export function deleteVehicleApi(id: number, options?: AxiosRequestConfig) {
  return request({
    url: "/vehicle/delete",
    method: "post",
    params: {
      id,
    },
    ...options,
  });
}
