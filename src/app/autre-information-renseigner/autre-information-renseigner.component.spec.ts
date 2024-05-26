import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutreInformationRenseignerComponent } from './autre-information-renseigner.component';

describe('AutreInformationRenseignerComponent', () => {
  let component: AutreInformationRenseignerComponent;
  let fixture: ComponentFixture<AutreInformationRenseignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutreInformationRenseignerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutreInformationRenseignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
