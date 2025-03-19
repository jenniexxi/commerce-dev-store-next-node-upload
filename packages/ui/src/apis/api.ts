import { Cookies } from 'react-cookie';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type APIResponse = {
  success: boolean;
  error: {
    errorCode: string;
    message: string;
  };
};

const cookies = new Cookies();

export const cookieManager = {
  getAuthToken: (): string | undefined => cookies.get<string>(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY ?? ''),
  setAuthToken: (token: string) => {
    cookies.set(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY ?? '', token);
  },
  removeAuthToken: () => {
    cookies.remove(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY ?? '');
  },
  getSessionID: (): string | undefined => cookies.get<string>(process.env.NEXT_PUBLIC_SESSION_ID_KEY ?? ''),
  setSessionID: (token: string) => {
    cookies.set(process.env.NEXT_PUBLIC_SESSION_ID_KEY ?? '', token);
  },
};

export const axiosInstance: AxiosInstance = axios.create({
  //baseURL: process.env.NEXT_PUBLIC_COMMERCE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

const logRequest = (config: InternalAxiosRequestConfig) => {
  const baseUrl = process.env.NEXT_PUBLIC_COMMERCE_API_BASE_URL;
  const pathUrl = config.url || '';

  console.log(
    [
      '\x1b[36m[요청]\x1b[0m',
      (config.method?.toUpperCase() === 'GET'
        ? '\x1b[92m'
        : config.method?.toUpperCase() === 'POST'
          ? '\x1b[33m'
          : config.method?.toUpperCase() === 'PUT'
            ? '\x1b[95m'
            : '\x1b[97m') +
        config.method?.toUpperCase() +
        '\x1b[0m',
      '\x1b[90m' + baseUrl + '\x1b[0m' + '\x1b[97m' + pathUrl + '\x1b[0m',
    ].join(''),
  );
};

const logResponse = (response: AxiosResponse | undefined) => {
  if (!response) {
    console.log('\x1b[91m❌\x1b[0m\x1b[32m[응답]\x1b[0m 에러 발생(no response)');
    return;
  }

  const { status, statusText, config } = response;
  const statusDisplay = statusText ? `(${status}:${statusText})` : `(${status})`;
  const baseUrl = process.env.NEXT_PUBLIC_COMMERCE_API_BASE_URL;
  const pathUrl = config.url || '';

  if (pathUrl.includes('systems/logins/force-auth')) {
    return;
  }

  const errorPrefix = status >= 400 ? '\x1b[91m❌\x1b[0m' : '';

  // API 정보와 상태 표시를 먼저 조합
  const apiInfo = [
    errorPrefix,
    '\x1b[94m[응답]\x1b[0m',
    (config.method?.toUpperCase() === 'GET'
      ? '\x1b[92m'
      : config.method?.toUpperCase() === 'POST'
        ? '\x1b[33m'
        : config.method?.toUpperCase() === 'PUT'
          ? '\x1b[95m'
          : '\x1b[97m') +
      config.method?.toUpperCase() +
      '\x1b[0m',
    '\x1b[90m' +
      baseUrl +
      '\x1b[0m' +
      '\x1b[97m' +
      pathUrl +
      '\x1b[0m' +
      (status >= 200 && status < 300 ? '\x1b[32m' : '\x1b[33m') +
      statusDisplay +
      '\x1b[0m',
  ]
    .join('')
    .replace(/\s+/g, '')
    .trim();

  // 데이터를 포함한 전체 메시지 조합
  const logMessage = apiInfo + ' ' + (response.data ? JSON.stringify(response.data) : '');

  console.log(logMessage);
};

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  logRequest(config);

  const token = cookieManager.getAuthToken();
  const session = cookieManager.getSessionID();
  if (token) {
    // config.headers['Authorization'] = `Bearer ${token}`;
  }
  if (session) {
    config.headers['SESSION'] = session;
  }
  // 회원
  config.headers['Authorization'] =
    `Bearer eyJraWQiOiJFMDQ3NTA0Q0Y5NUYwNzI0QUU1ODc3QTk0NjRFRjBCMSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJURVNUMDEwQ09NTUVSQ0UiLCJpc3MiOiJodHRwOi8vMTAuMjEzLjMxLjI0ODo5MDkzL2FjY291bnQvYXV0aHNlcnZlciIsInVzZXJTZXEiOjEsImF1dGhvcml0aWVzIjpbIlVTRVIiLCJSRVNPVVJDRSJdLCJwbGF0Zm9ybXMiOlt7InBsYXRmb3JtQ2QiOiIwMTBDT01NRVJDRSIsInBsYXRmb3JtVXNlclNlcSI6IiJ9XSwiYXVkIjoicnJvdW5kY2xpZW50MSIsIm5iZiI6MTczNzA4NzE3Mywic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MzI1MDM2Nzk5OTksImlhdCI6MTczNzA4NzE3MywianRpIjoiZTA2YTQ4MWYtZTlhOC00NWYyLTg2MzUtMTI1YWI3ZTExMWE5IiwiYXV0aERldmljZVNlcSI6MX0.ZpOwbDzEFZtkRbxXoGFllvFu3mLNpzK2XmJ3Cd-UWey17wfwYBhYrODRDAdB8RMFC_rTRArtYSh6i75wDXuYTsPJoBGOfFKMyglZa14zpgPinabiCH1C2MykUDJLzCj_M6SiRRWJ9_5YNMRtpdww1AA-x_FJMLBVjAB7LzKELx0SYdNkDgGbZp9zMcuWdtrI6LsSW44EUkQlhOsdpkYNt3KEm5_iqlA7-6slCnHvUgo6ZFGlwJb03Fa2g2VZFKlDmJB7vELt00Dez-sIh-SEvpuyP8m0-CXg0NnKxT6j5qruUtkFQKX7e3E_pv3gKVO8x1VxK3XZW0GJi3idfG3azg`;

  // config.headers['Authorization'] = `Basic cnJvdW5kY2xpZW50Mjpycm91bmRjbGllbnQyc2VjcmV0==`;
  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    logResponse(response);
    return response;
  },
  (error: AxiosError) => {
    logResponse(error.response);
    return Promise.reject(error);
  },
);

export const fetchData = <T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  switch (method) {
    case 'get':
      return axiosInstance.get<T>(url, config).then((resp) => resp.data);
    case 'post':
      return axiosInstance.post<T>(url, data, config).then((resp) => resp.data);
    case 'put':
      return axiosInstance.put<T>(url, data, config).then((resp) => resp.data);
    case 'delete':
      return axiosInstance.delete<T>(url, config).then((resp) => resp.data);
    default:
      throw new Error('Invalid HTTP method');
  }
};
