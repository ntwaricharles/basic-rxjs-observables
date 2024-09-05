import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDebuggingComponent } from './error-debugging.component';

describe('ErrorDebuggingComponent', () => {
  let component: ErrorDebuggingComponent;
  let fixture: ComponentFixture<ErrorDebuggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorDebuggingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorDebuggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
