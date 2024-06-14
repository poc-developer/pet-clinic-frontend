import { TestBed, ComponentFixture } from '@angular/core/testing';
import { OwnerDetailsComponent } from './owner-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of,throwError } from 'rxjs';
import { FetchDataService } from '../fetch-data.service';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Iowner } from '../owner';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ResponseService } from '../response.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('OwnerDetailsComponent', () => {
  let component: OwnerDetailsComponent;
  let fixture: ComponentFixture<OwnerDetailsComponent>;
  let fetchDataService: FetchDataService;
  let responseService: ResponseService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        OwnerDetailsComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'name' ? 'all' : null
              }
            }
          }
        },
        FetchDataService,
        ResponseService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerDetailsComponent);
    component = fixture.componentInstance;
    fetchDataService = TestBed.inject(FetchDataService);
    responseService = TestBed.inject(ResponseService);
    router = TestBed.inject(Router);
  });

  it('should create the owner details component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all owners if route param "name" is "all"', () => {
    const mockOwners: Iowner[] = [{ name: "Betty Davis", address: "638 Cardinal Ave.", city: "Sun Prairie", telephone: "6085551749", pets: "Basil" }];
    const mockResponse = new HttpResponse({
      body: mockOwners,
      status: 200,
      statusText: 'OK',
    });
    spyOn(fetchDataService, 'getOwners').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(component.allOwners).toBeTrue();
    expect(fetchDataService.getOwners).toHaveBeenCalled();
    expect(component.owners).toEqual(mockOwners);
  });

  it('should fetch a specific owner by last name', () => {
    const mockOwner: Iowner = { name: "Betty Davis", address: "638 Cardinal Ave.", city: "Sun Prairie", telephone: "6085551749", pets: "Basil" };
    const mockResponse = new HttpResponse({
      body: [mockOwner],
      status: 200,
      statusText: 'OK',
    });
    spyOn(fetchDataService, 'getOwnerByLastName').and.returnValue(of(mockResponse));
    component['route'].snapshot.paramMap.get = () => 'Davis';
    component.ngOnInit();
    expect(component.allOwners).toBeFalse();
    expect(fetchDataService.getOwnerByLastName).toHaveBeenCalledWith('Davis');
    expect(component.owners).toEqual([mockOwner]);
  });

  it('should handle no owner found', () => {
    const mockResponse = new HttpResponse<Iowner[]>({
      status: 200,
      body: []
    });

    spyOn(fetchDataService, 'getOwnerByLastName').and.returnValue(of(mockResponse));
    component['route'].snapshot.paramMap.get = () => 'Nonexistent';
    component.ngOnInit();

    expect(component.allOwners).toBeFalse();
    expect(fetchDataService.getOwnerByLastName).toHaveBeenCalledWith('Nonexistent');
    expect(component.owners).toEqual([]);
  });

  it('should handle error response from getOwners', () => {
    const mockErrorResponse = new HttpResponse<Iowner[]>({
      status: 500,
      body: [] 
    });
    spyOn(fetchDataService, 'getOwners').and.returnValue(of(mockErrorResponse));
    spyOn(responseService, 'setResponse');
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(component.allOwners).toBeTrue();
    expect(fetchDataService.getOwners).toHaveBeenCalled();
    expect(responseService.setResponse).toHaveBeenCalledWith('Internal Server Error', 500, {});
    expect(router.navigate).toHaveBeenCalledWith(['/response']);
  });

  it('should handle error response from getOwnerByLastName', () => {
    const mockErrorResponse = new HttpResponse<Iowner[]>({
      status: 500,
      body: [] 
    });
    spyOn(fetchDataService, 'getOwnerByLastName').and.returnValue(of(mockErrorResponse));
    spyOn(responseService, 'setResponse');
    spyOn(router, 'navigate');

    component['route'].snapshot.paramMap.get = () => 'Davis';
    component.ngOnInit();

    expect(component.allOwners).toBeFalse();
    expect(fetchDataService.getOwnerByLastName).toHaveBeenCalledWith('Davis');
    expect(responseService.setResponse).toHaveBeenCalledWith('Internal Server Error', 500, {});
    expect(router.navigate).toHaveBeenCalledWith(['/response']);
  });

  
});
