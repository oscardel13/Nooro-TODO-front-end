import axios, { AxiosResponse } from "axios";

const API = axios.create();

const API_URL = "http://localhost:8000";

// Use a generic payload type
export type ApiPayload<T = unknown> = Record<string, T>;

export type ApiResponse<T> = AxiosResponse<T>;

export const getAPI = async <T>(path: string): Promise<ApiResponse<T>> => {
  const response = await API.get<T>(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export const postAPI = async <T>(
  path: string,
  body: ApiPayload
): Promise<ApiResponse<T>> => {
  const response = await API.post<T>(
    `${API_URL}${path}`,
    JSON.stringify(body),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response;
};

export const putAPI = async <T>(
  path: string,
  body: ApiPayload
): Promise<ApiResponse<T>> => {
  const response = await API.put<T>(`${API_URL}${path}`, JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export const deleteAPI = async <T>(
  path: string,
  body?: ApiPayload
): Promise<ApiResponse<T>> => {
  const response = await API.delete<T>(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    data: body ? JSON.stringify(body) : undefined,
  });
  return response;
};
