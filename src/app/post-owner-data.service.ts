import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, TimeoutError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { INewOwner } from './new-owner';

@Injectable({
  providedIn: 'root'
})
export class PostOwnerDataService {

  api_url: string = 'http://localhost:3000/owners/new';

  constructor(private http: HttpClient) { }

  addOwner(owner: INewOwner): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.api_url, owner, { observe: 'response' }).pipe(
      timeout(1000), 
      retry(1), 
      catchError((error: HttpErrorResponse | TimeoutError | ProgressEvent) => {
        console.log( "error is :",error);
        if (error instanceof TimeoutError || error instanceof ProgressEvent) {
          const message = 'Service Unavailable: Server Timeout';
          return of(new HttpResponse({
            body: { message },
            status: 503,
          }));
        } else {
          return of(new HttpResponse({
            body: { message: error.message },
            status: error.status,
            statusText: error.statusText
          }));
        }
      })
    );
  }
}
