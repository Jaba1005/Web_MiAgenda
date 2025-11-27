import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosComponente } from './usuarios-componente';

describe('UsuariosComponente', () => {
  let component: UsuariosComponente;
  let fixture: ComponentFixture<UsuariosComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosComponente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosComponente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
