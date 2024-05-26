import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionRegimeFiscaleComponent } from './description-regime-fiscale.component';

describe('DescriptionRegimeFiscaleComponent', () => {
  let component: DescriptionRegimeFiscaleComponent;
  let fixture: ComponentFixture<DescriptionRegimeFiscaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescriptionRegimeFiscaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriptionRegimeFiscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
