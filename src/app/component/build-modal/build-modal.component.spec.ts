import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildModalComponent } from './build-modal.component';

describe('BuildModalComponent', () => {
  let component: BuildModalComponent;
  let fixture: ComponentFixture<BuildModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
