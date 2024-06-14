import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ResponseComponent } from './response.component';
import { ResponseService } from '../response.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('ResponseComponent', () => {
  let component: ResponseComponent;
  let fixture: ComponentFixture<ResponseComponent>;
  let responseService: jasmine.SpyObj<ResponseService>;

  beforeEach(async () => {
    const responseServiceSpy = jasmine.createSpyObj('ResponseService', ['getResponseBody', 'getStatusCode', 'getRequestData']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ResponseComponent],
      providers: [
        { provide: ResponseService, useValue: responseServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResponseComponent);
    component = fixture.componentInstance;
    responseService = TestBed.inject(ResponseService) as jasmine.SpyObj<ResponseService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with data from the ResponseService', () => {
    const mockResponseBody = { message: 'Success' };
    const mockStatusCode = 200;
    const mockRequestData = { firstName: 'John', lastName: 'Doe' };

    responseService.getResponseBody.and.returnValue(mockResponseBody);
    responseService.getStatusCode.and.returnValue(mockStatusCode);
    responseService.getRequestData.and.returnValue(mockRequestData);

    fixture.detectChanges(); // triggers ngOnInit

    expect(component.responseBody).toEqual(mockResponseBody);
    expect(component.statusCode).toBe(mockStatusCode);
    expect(component.requestData).toEqual(mockRequestData);
    expect(responseService.getResponseBody).toHaveBeenCalled();
    expect(responseService.getStatusCode).toHaveBeenCalled();
    expect(responseService.getRequestData).toHaveBeenCalled();
  });

  it('should log response body and status code on initialization', () => {
    const mockResponseBody = { message: 'Success' };
    const mockStatusCode = 200;
    const mockRequestData = { firstName: 'John', lastName: 'Doe' };

    responseService.getResponseBody.and.returnValue(mockResponseBody);
    responseService.getStatusCode.and.returnValue(mockStatusCode);
    responseService.getRequestData.and.returnValue(mockRequestData);

    spyOn(console, 'log');
    fixture.detectChanges(); // triggers ngOnInit

    expect(console.log).toHaveBeenCalledWith('Response body: ' + mockResponseBody + ' Status code: ' + mockStatusCode);
  });
});
