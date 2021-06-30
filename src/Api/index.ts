import {forEach, replace, keys } from "lodash";
//TODO need to change method name as method support both Post and Put request
export function fetchPostRequest(controller: AbortController, url: string, token: string, body: any, method?: string, headers?: Headers): Promise<any> {
  return fetch(url, {
    method: method || 'Post',
    signal: controller.signal,
    headers: checkAndAppendHeaders(headers!, token, body),
    body: body instanceof FormData ? body : JSON.stringify(body)
  }).then(handleResponse);
}

export function fetchGetRequest(controller: AbortController, url: string, token: string, method?: string, headers?: Headers): Promise<any> {
  return fetch(url, {
    method: method || 'get',
    signal: controller.signal,
    headers: checkAndAppendHeaders(headers!, token),
  }).then(handleResponse);
}

function checkAndAppendHeaders(headers: Headers, token: string, body?: any): Headers {
  if(!headers) {
    headers = new Headers();
  }
  if(token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if(!body || (body && !(body instanceof FormData))) {
    if(!headers.get('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
  }
  return headers;
}

export function generateUrlWithRequestParams(url: string, requestParams: { [key: string]: any}): string {
  forEach(keys(requestParams), (key: string) => {
    url = replace(url, `:${key}`, encodeURIComponent(requestParams[key]))
  });
  return url;
}

export function generateQueryParamsString(queryParams: { [key: string]: any }): string {
  let query = "";
  const queryParamsKeys = keys(queryParams);
  forEach(keys(queryParams), (key: string, index: number) => {
    query += `${key}=${encodeURIComponent(queryParams[key])}`;
    if (index < queryParamsKeys.length - 1) {
      query += `&`
    }
  });
  return query;
}

function handleResponse(response: Response) {
  return new Promise((resolve, reject) => {
    if (response.status === 400) {
      let err = new Error("Bad Request");
      reject(err);
    }
    if (response.status === 401) {
      let err = new Error("Unauthorized");
      window.location.reload();
      reject(err);
    }
    if (response.status === 404) {
      let err = new Error("Not Found");
      reject(err);
    }
    if (response.status === 405) {
      let err = new Error("Not Allowed");
      reject(err);
    }
    
    if (response.status === 422) {
      let err = new Error("Payload Mismatch");
      reject(err);
    }

    if (response.status === 500) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        response.json().then(json => {
          let err = new Error(json.message);
           reject(err);
        });
      } else {
        let err = new Error("Critical");
        reject(err);
      }
    }

    if ((response.status >= 200 && response.status < 300) || response.status === 400) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        response.json().then(json => {
          resolve(json);
        });
      } else {
        let err = new Error("Error while parsing result");
        reject(err);
      }
    }
  });
}