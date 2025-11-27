import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService, UsuarioItem } from '../../services/usuarios-service';

@Component({
  selector: 'app-usuarios-componente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-componente.html',
  styleUrl: './usuarios-componente.css',
})

export class UsuariosComponente implements OnInit{
  lista: UsuarioItem[] = [];

  nuevo: UsuarioItem = {
      nombre: '',
      correo: '',
      numero: '',
      contrasena: '',
  }

  editando: UsuarioItem | null = null;

  constructor(private usuariosService: UsuariosService) {}
  
    ngOnInit(): void {
      this.cargarDatos();
    }

    cargarDatos() {
    this.usuariosService.getAll().subscribe({
    next: data => {
      this.lista = data.map(usuario => ({
        _id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        numero: usuario.numero,
        contrasena: ''
      }));
      },
      error: err => console.error("Error al cargar usuarios", err)
    });
  }

  crear() {
    this.usuariosService.createUser(this.nuevo).subscribe({
      next: () => {
        this.nuevo = {
          nombre: '',
          correo: '',
          numero: '',
          contrasena: ''
        };
        this.cargarDatos();
      },
      error: err => console.error("Error creando usuario", err)
    });
  }

  seleccionar(item: UsuarioItem) {
    if (this.editando && this.editando._id === item._id) {
    this.editando = null;
  }else{
    this.editando = {
      _id: item._id,
      nombre: item.nombre,
      correo: item.correo,
      numero: item.numero,
      contrasena: ''
      }
  }
  }

  actualizar() {
    if (!this.editando?._id) return;

    this.usuariosService.updateUser(this.editando._id, this.editando).subscribe({
      next: () => {
        this.editando = null;
        this.cargarDatos();
      },
      error: err => console.error("Error actualizando usuario", err)
    });
  }

}

