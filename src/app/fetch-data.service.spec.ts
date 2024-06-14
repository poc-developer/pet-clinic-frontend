import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FetchDataService } from './fetch-data.service';
import { Iowner } from './owner';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

describe('FetchDataService', () => {
  let service: FetchDataService;
  let httpMock: HttpTestingController;

  const mockOwners: Iowner[] = [
    { name: 'John Doe', address: '123 Main St', city: 'Anytown', telephone: '555-1234', pets: 'Dog' },
    { name: 'Jane Smith', address: '456 Elm St', city: 'Othertown', telephone: '555-5678', pets: 'Cat' },
    { name: 'Betty Davis', address: '638 Cardinal Ave.', city: 'Sun Prairie', telephone: '6085551749', pets: 'Basil' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FetchDataService]
    });
    service = TestBed.inject(FetchDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all owners', () => {
    service.getOwners().subscribe(response => {
      const owners = response.body as Iowner[];
      if (Array.isArray(owners)) {
        expect(owners.length).toBe(3);
        expect(owners).toEqual(mockOwners);
      }
    });

    const req = httpMock.expectOne('assets/Data/owners.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockOwners);
  });

  it('should fetch owner by last name', (done) => {
    service.getOwnerByLastName('Davis').subscribe(response => {
      const owners = response.body as Iowner[];
      if (Array.isArray(owners)) {
        expect(owners.length).toBe(1);
        expect(owners).toEqual([mockOwners[2]]);
        done();
      }
    });

    const req = httpMock.expectOne('assets/Data/owners.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockOwners);
  });

  it('should handle no owner found', () => {
    service.getOwnerByLastName('Nonexistent').subscribe(response => {
      const owners = response.body as Iowner[];
      if (Array.isArray(owners)) {
        expect(owners).toEqual([]);
      }
    });

    const req = httpMock.expectOne('assets/Data/owners.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockOwners);
  });

  it('should handle HTTP error', (done) => {
    service.getOwners().subscribe({
      next: (response) => {
        console.log("response", response.status, "message", response.body);
        const body = response.body as { message: string };
        if (body !== null) {
          expect(body.message).toContain('Http failure');
        }
        done();
      },
      error: (error) => {
        console.error("Error occurred", error);
        expect(error.status).toBe(503);
        const body = error.error as { message: string };
        if (body !== null) {
          expect(body.message).toBe('Service Unavailable: Server Timeout');
        }
        done();
      }
    });

    const req = httpMock.expectOne('assets/Data/owners.json');
    expect(req.request.method).toBe('GET');
    req.error(new ProgressEvent('timeout'));

    const retryReq = httpMock.expectOne('assets/Data/owners.json');
    expect(retryReq.request.method).toBe('GET');
    retryReq.error(new ProgressEvent('timeout'));
  });

});
