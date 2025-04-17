import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Gostos } from './gostos.page';

describe('Gostos', () => {
  let component: Gostos;
  let fixture: ComponentFixture<Gostos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gostos],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Gostos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
