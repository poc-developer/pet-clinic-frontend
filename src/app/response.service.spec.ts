import { TestBed } from '@angular/core/testing';
import { ResponseService } from './response.service';

describe('ResponseService', () => {
  let service: ResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set response body, status code, and request data correctly', () => {
    const responseBody = { message: 'Success' };
    const statusCode = 200;
    const requestData = { id: 1, name: 'Test' };

    service.setResponse(responseBody, statusCode, requestData);

    expect(service.getResponseBody()).toEqual(responseBody);
    expect(service.getStatusCode()).toEqual(statusCode);
    expect(service.getRequestData()).toEqual(requestData);
  });

  it('should return the correct response body', () => {
    const responseBody = { message: 'Success' };
    service['responseBody'] = responseBody;

    expect(service.getResponseBody()).toEqual(responseBody);
  });

  it('should return the correct status code', () => {
    const statusCode = 200;
    service['statusCode'] = statusCode;

    expect(service.getStatusCode()).toEqual(statusCode);
  });

  it('should return the correct request data', () => {
    const requestData = { id: 1, name: 'Test' };
    service['requestData'] = requestData;

    expect(service.getRequestData()).toEqual(requestData);
  });
});
