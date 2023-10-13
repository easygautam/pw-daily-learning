import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class HttpUtilService {
  constructor(private httpService: HttpService) {}

  async request<T = any>(config: AxiosRequestConfig<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.request(config).subscribe({
        next(res) {
          resolve(res.data);
        },
        error(err) {
          console.log(err);
          reject(err);
        },
      });
    });
  }

  async get(url, params, headers) {
    const options: AxiosRequestConfig = {
      url: url,
      params,
      headers,
    };

    return new Promise((resolve, reject) => {
      this.httpService
        .get(url, options)
        .pipe(map((response) => response.data))
        .subscribe({
          next: (data) => resolve(data?.data),
          error: (error) => {
            console.log(error);
            if (error.response && error.response.data) {
              const { error: err, message, statusCode } = error.response.data;
              //nestjs projects
              if (message && statusCode) {
                reject(new HttpException(new Error(message), statusCode));
              }
              //penpencil backend
              else if (err && err.message && err.status) {
                reject(new HttpException(new Error(err.message), err.status));
              }
              //429 and others
              else {
                const msg = error.response.data;
                const statusCode = error.response.statusCode || 500;
                reject(new HttpException(new Error(msg), statusCode));
              }
            } else {
              //connection error
              reject(new HttpException(new Error(error?.message), 500));
            }
          },
        });
    });
  }

  async post(url, data, headers, isThirdParty=false) {
    const options: AxiosRequestConfig = {
      headers,
    };
    
    return new Promise((resolve, reject) => {
      this.httpService
        .post(url, data, options)
        .pipe(map((response) => response.data))
        .subscribe({
          next: (data) => resolve( isThirdParty? data : data?.data),
          error: (error) => {
            console.log(error);
            if (error.response && error.response.data) {
              const { error: err, message, statusCode } = error.response.data;
              //nestjs projects
              if (message && statusCode) {
                reject(new HttpException(new Error(message), statusCode));
              }
              //penpencil backend
              else if (err && err.message && err.status) {
                reject(new HttpException(new Error(err.message), err.status));
              }
              //429 and others
              else {
                const msg = error.response.data;
                const statusCode = error.response.statusCode || 500;
                reject(new HttpException(new Error(msg), statusCode));
              }
            } else {
              //connection error
              reject(new HttpException(new Error(error?.message), 500));
            }
          },
        });
    });
  }

  async put(url, data, headers) {
    const options: AxiosRequestConfig = {
      headers,
    };
    return new Promise((resolve, reject) => {
      this.httpService
        .put(url, data, options)
        .pipe(map((response) => response.data))
        .subscribe({
          next: (data) => resolve(data?.data),
          error: (error) => {
            console.log(error);
            if (error.response && error.response.data) {
              const { error: err, message, statusCode } = error.response.data;
              //nestjs projects
              if (message && statusCode) {
                reject(new HttpException(new Error(message), statusCode));
              }
              //penpencil backend
              else if (err && err.message && err.status) {
                reject(new HttpException(new Error(err.message), err.status));
              }
              //429 and others
              else {
                const msg = error.response.data;
                const statusCode = error.response.statusCode || 500;
                reject(new HttpException(new Error(msg), statusCode));
              }
            } else {
              //connection error
              reject(new HttpException(new Error(error?.message), 500));
            }
          },
        });
    });
  }

  async delete(url, headers) {
    const options: AxiosRequestConfig = {
      headers,
    };

    return new Promise((resolve, reject) => {
      this.httpService
        .delete(url, options)
        .pipe(map((response) => response.data))
        .subscribe({
          next: (data) => resolve(data?.data),
          error: (error) => {
            console.log(error)
            if (error.response && error.response.data) {
              const { error: err, message, statusCode } = error.response.data;
              //nestjs projects
              if (message && statusCode) {
                reject(new HttpException(new Error(message), statusCode));
              }
              //penpencil backend
              else if (err && err.message && err.status) {
                reject(new HttpException(new Error(err.message), err.status));
              }
              //429 and others
              else {
                const msg = error.response.data;
                const statusCode = error.response.statusCode || 500;
                reject(new HttpException(new Error(msg), statusCode));
              }
            } else {
              //connection error
              reject(new HttpException(new Error(error?.message), 500));
            }
          },
        });
    });
  }
}
