import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinner } from './loading-spinner';

describe('LoadingSpinner', () => {
  let component: LoadingSpinner;
  let fixture: ComponentFixture<LoadingSpinner>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoadingSpinner]
    });
    fixture = TestBed.createComponent(LoadingSpinner);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});