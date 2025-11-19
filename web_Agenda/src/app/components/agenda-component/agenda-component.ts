import { Component } from '@angular/core';
import { AgendaService } from '../../services/agenda-service';

@Component({
  selector: 'app-agenda-component',
  imports: [],
  templateUrl: './agenda-component.html',
  styleUrl: './agenda-component.css',
})
export class AgendaComponent {
  agendaList: any = [];

  constructor(private agendaService: AgendaService) { }

  getAllUsers() {
    this.agendaService.getAllAgendaData().subscribe((data: {}) => {
      this.agendaList = data;
    });
  }
  ngOnInit() {
    this.getAllUsers();
  }

}
