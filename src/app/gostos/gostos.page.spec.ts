import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GostosPage } from './gostos.page';

describe('Gostos', () => {
  let component: GostosPage;
  let fixture: ComponentFixture<GostosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GostosPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GostosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
