import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => { 
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the home component', () => { 
    expect(component).toBeTruthy();
  });

  it('should render "Welcome" ', () => {
    fixture.detectChanges();
    const h1 = compiled.querySelector('h1');
    expect(h1?.textContent).toContain('Welcome');
  });

  it('should render the welcome image with the correct src and alt attributes', () => {
    fixture.detectChanges();
    const img = compiled.querySelector('img.welcome-image');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('assets/pets.png');
    expect(img?.getAttribute('alt')).toBe('Welcome Image');
  });
});
