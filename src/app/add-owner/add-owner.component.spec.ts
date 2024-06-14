import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOwnerComponent } from './add-owner.component';
import { PostOwnerDataService } from '../post-owner-data.service';
import { ResponseService } from '../response.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

describe('AddOwnerComponent', () => {
  let component: AddOwnerComponent;
  let fixture: ComponentFixture<AddOwnerComponent>;
  let postOwnerDataService: PostOwnerDataService;
  let responseService: ResponseService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOwnerComponent, HttpClientTestingModule, FormsModule],
      providers: [
        PostOwnerDataService,
        ResponseService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddOwnerComponent);
    component = fixture.componentInstance;
    postOwnerDataService = TestBed.inject(PostOwnerDataService);
    responseService = TestBed.inject(ResponseService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set formSubmitted to true on submit', () => {
    const form = {} as NgForm;
    component.onSubmit(form);
    expect(component.formSubmitted).toBeTrue();
  });

    it('should not add owner if form is invalid', () => {
        const form = { valid: false } as NgForm;
        component.onSubmit(form);
        spyOn(postOwnerDataService, 'addOwner');
        expect(postOwnerDataService.addOwner).not.toHaveBeenCalled();
    });

    it('should call addOwner and navigate to /response on successful submit', () => {
        const form = {
          valid: true,
          value: {
            firstName: 'Betty',
            lastName: 'Davis',
            address: '638 Cardinal Ave',
            city: 'Sun Prairie',
            telephone: '6085551749'
          }
        } as NgForm;
      
        const mockResponse = new HttpResponse({
            status: 200,
            body: { message: 'Owner Data Added Successfully' }
          });
      
        spyOn(postOwnerDataService, 'addOwner').and.returnValue(of(mockResponse));
        spyOn(responseService, 'setResponse');
      
        component.onSubmit(form);
      
        expect(postOwnerDataService.addOwner).toHaveBeenCalledWith(component.usermodel);
        expect(responseService.setResponse).toHaveBeenCalledWith(mockResponse.body, mockResponse.status, component.usermodel);
        expect(router.navigate).toHaveBeenCalledWith(['/response']);
      });

      it('should navigate to /response and show display error on unsuccessful submit', () => {
        const form = {
          valid: true,
          value: {
            firstName: 'Betty',
            lastName: 'Davis',
            address: '638 Cardinal Ave',
            city: 'Sun Prairie',
            telephone: '6085551749'
          }
        } as NgForm;
      
        const mockResponse = new HttpResponse({
            status: 500,
            body: { message: 'Internal server' }
          });
      
        spyOn(postOwnerDataService, 'addOwner').and.returnValue(of(mockResponse));
        spyOn(responseService, 'setResponse');
        
      
        component.onSubmit(form);
      
        expect(postOwnerDataService.addOwner).toHaveBeenCalledWith(component.usermodel);
        expect(responseService.setResponse).toHaveBeenCalledWith(mockResponse.body, mockResponse.status, component.usermodel);
        expect(router.navigate).toHaveBeenCalledWith(['/response']);
        
      });
 
  
});
