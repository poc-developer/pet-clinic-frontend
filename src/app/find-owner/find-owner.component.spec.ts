import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FindOwnerComponent } from './find-owner.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('FindOwnerComponent', () => { 
  let fixture: ComponentFixture<FindOwnerComponent>;
  let component: FindOwnerComponent;
  let compiled: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        FindOwnerComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FindOwnerComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    router = TestBed.inject(Router);
  });

  it('should create the find owner component', () => { 
    expect(component).toBeTruthy();
  });

  it('should display "Find Owners" ', () => {
    fixture.detectChanges();
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent).toContain('Find Owners');
  });

    it('should contain an input box', () => {
        fixture.detectChanges();
        const inputBox = compiled.querySelector('input');
        expect(inputBox).not.toBeNull();
    });

    it('should contain "Find Owner" and "Add Owner" buttons', () => {
        fixture.detectChanges();
        const buttons = compiled.querySelectorAll('button');
        expect(buttons.length).toBe(2);
        const buttonNames = Array.from(buttons).map(button => button.textContent ? button.textContent.trim() : '');
        expect(buttonNames).toContain('Find Owner');
        expect(buttonNames).toContain('Add Owner');
      });

      
    it('should navigate to the add owner page on button click', () => {
        const button = compiled.querySelector('.btn-add') as HTMLButtonElement;
        spyOn(router, 'navigate');
        button.click();
    
        expect(router.navigate).toHaveBeenCalledWith(['/owners/new']);
      });

      it('should navigate to the owners details page on button click', () => {
        const button = compiled.querySelector('.btn-find') as HTMLButtonElement;
        spyOn(router, 'navigate');
        button.click();
    
        expect(router.navigate).toHaveBeenCalledWith(['/owners','all']);
      });

      it('should navigate to the specific owner details page on the input', () => {
        const button = compiled.querySelector('.btn-find') as HTMLButtonElement;
        const input = compiled.querySelector('.form-control') as HTMLInputElement;
        const form = compiled.querySelector('form') as HTMLFormElement;
      
        spyOn(router, 'navigate');
        input.value = 'Davis';
        input.dispatchEvent(new Event('input'));
        form.dispatchEvent(new Event('submit'));
        expect(router.navigate).toHaveBeenCalledWith(['/owners', 'Davis']);
      });
      


});