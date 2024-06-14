import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => { 
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
        
      ],
    
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => { 
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PetClinic :: a Spring Framework demonstrationdefault'`, () => {
    expect(app.title).toEqual('PetClinic :: a Spring Framework demonstrationdefault');
  });

  it('should have navigation links', () => {
    fixture.detectChanges();
    const navLinks = compiled.querySelectorAll('.nav-button');
    expect(navLinks.length).toBe(2);
    expect(navLinks[0].textContent).toContain('Home');
    expect(navLinks[1].textContent).toContain('Find Owner');
  });
  
  it('should contain a router-outlet', () => {
    fixture.detectChanges();
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).not.toBeNull();
  });
  
  it('should contain the Pivotal logo image', () => {
    fixture.detectChanges();
    const image = compiled.querySelector('.image-container img');
    expect(image).not.toBeNull();
    expect(image?.getAttribute('src')).toBe('assets/spring-pivotal-logo.png');
    expect(image?.getAttribute('alt')).toBe('Pivotal-logo');
  });

  it('Background colour dark Grey', () => {
    fixture.detectChanges();
    const navButtonDebug = fixture.debugElement.query(By.css('.nav-button'));
    const navButton = navButtonDebug.nativeElement;
    expect(navButton).not.toBeNull();
    let style = window.getComputedStyle(navButton);
    expect(style.backgroundColor).toBe('rgb(51, 51, 51)');

  });
  
  

});
