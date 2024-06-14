import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, TimeoutError } from 'rxjs';
import { catchError, map, retry, timeout } from 'rxjs/operators';
import { Iowner } from './owner';

type OwnerResponseBody = Iowner[] | { message: string };

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  api_url: string = 'assets/Data/owners.json';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse | TimeoutError): Observable<HttpResponse<OwnerResponseBody>> {
    if (error instanceof TimeoutError) {
      return of(new HttpResponse({
        body: { message: 'Service Unavailable: Server Timeout' },
        status: 503,
      }));
    } else {
      return of(new HttpResponse({
        body: { message: error.message },
        status: error.status,
      }));
    }
  }

  getOwners(): Observable<HttpResponse<OwnerResponseBody>> {
    return this.http.get<Iowner[]>(this.api_url, { observe: 'response' }).pipe(
      timeout(1000),
      retry(1),
      catchError(this.handleError.bind(this))
    );
  }

  getOwnerByLastName(lastName: string): Observable<HttpResponse<OwnerResponseBody>> {
    return this.getOwners().pipe(
      map(response => {
        if (response.status !== 200) {
          return response;
        }

        const owners = response.body as Iowner[];
        const lowerCaseLastName = lastName.trim().toLowerCase();
        const foundOwners = owners.filter(owner => {
          const ownerLastName = owner.name.split(' ').pop()?.toLowerCase();
          return ownerLastName === lowerCaseLastName;
        });

        return new HttpResponse({
          body: foundOwners,
          status: response.status,
        });
      }),
      catchError(this.handleError.bind(this))
    );
  }
}
