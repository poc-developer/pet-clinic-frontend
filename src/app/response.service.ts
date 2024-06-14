import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private responseBody: any;
  private statusCode: number = 0;
  private requestData: any;

  setResponse(responseBody: any, statusCode: number, requestData: any) {
    this.responseBody = responseBody;
    this.statusCode = statusCode;
    this.requestData = requestData;
    console.log(this.responseBody, this.statusCode);
  }

  getResponseBody(): any {
    return this.responseBody;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getRequestData(): any {
    return this.requestData;
  }
}
