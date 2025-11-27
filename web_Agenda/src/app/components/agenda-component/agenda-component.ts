import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendaService, AgendaItem } from '../../services/agenda-service';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agenda-component.html',
  styleUrls: ['./agenda-component.css']
})
export class AgendaComponent implements OnInit {

  lista: AgendaItem[] = [];

  nuevo: AgendaItem = {
    nombre: '',
    descripcion: '',
    tipo: 'personal',
    fechaInicio: '',
    fechaFin: '',
    cooperativo: false,
    recordatorio: false
  };

  editando: AgendaItem | null = null;

  constructor(private agendaService: AgendaService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.agendaService.getAll().subscribe({
      next: data => {
        // Convertir fechas ISO a YYYY-MM-DD
        this.lista = data.map(e => ({
          ...e,
          fechaInicio: e.fechaInicio?.substring(0,10),
          fechaFin: e.fechaFin?.substring(0,10)
        }));
      },
      error: err => console.error("Error al cargar eventos", err)
    });
  }

  guardar() {
    this.agendaService.create(this.nuevo).subscribe({
      next: () => {
        this.nuevo = {
          nombre: '',
          descripcion: '',
          tipo: 'personal',
          fechaInicio: '',
          fechaFin: '',
          cooperativo: false,
          recordatorio: false
        };
        this.cargarDatos();
      },
      error: err => console.error("Error creando evento", err)
    });
  }

  seleccionar(item: AgendaItem) {
    // Recortar fecha ISO → YYYY-MM-DD
    this.editando = {
      ...item,
      fechaInicio: item.fechaInicio?.substring(0,10),
      fechaFin: item.fechaFin?.substring(0,10)
    };
  }

  actualizar() {
    if (!this.editando?._id) return;

    this.agendaService.update(this.editando._id, this.editando).subscribe({
      next: () => {
        this.editando = null;
        this.cargarDatos();
      },
      error: err => console.error("Error actualizando evento", err)
    });
  }

  eliminar(id?: string) {
    if (!id) return;

    this.agendaService.delete(id).subscribe({
      next: () => this.cargarDatos(),
      error: err => console.error("Error eliminando evento", err)
    });
  }
}
