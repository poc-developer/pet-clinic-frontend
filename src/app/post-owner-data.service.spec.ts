import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostOwnerDataService } from './post-owner-data.service';
import { INewOwner } from './new-owner';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

describe('PostOwnerDataService', () => {
  let service: PostOwnerDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostOwnerDataService]
    });
    service = TestBed.inject(PostOwnerDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle successful owner addition', () => {
    const newOwner: INewOwner = {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'Anytown',
      telephone: '1234567890'
    };

    service.addOwner(newOwner).subscribe(
      (response: HttpResponse<any>) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(newOwner);
      },
      (error) => {
        fail('should not have thrown an error');
      }
    );

    const req = httpMock.expectOne(service.api_url);
    expect(req.request.method).toBe('POST');
    req.flush(newOwner, { status: 200, statusText: 'OK' });
  });

  it('should handle HTTP error', (done) => {
    const newOwner: INewOwner = {
      firstName: 'Betty',
      lastName: 'Davis',
      address: '638 Cardinal Ave',
      city: 'Sun Prairie',
      telephone: '6085551749'
    };

    service.addOwner(newOwner).subscribe({
      next: (response) => {
        console.log("response", response.status, "message", response.body);
        const body = response.body as { message: string };
        if (body !== null) {
          expect(body.message).toContain('Http failure');
        }
        done();
      },
      error: (error) => {
        fail('should not have thrown an error');
        done();
      }
    });

    const req = httpMock.expectOne(service.api_url);
    expect(req.request.method).toBe('POST');
    req.error(new ProgressEvent('timeout'));

    const retryReq = httpMock.expectOne(service.api_url);
    expect(retryReq.request.method).toBe('POST');
    retryReq.error(new ProgressEvent('timeout'));
  });

  


 
});