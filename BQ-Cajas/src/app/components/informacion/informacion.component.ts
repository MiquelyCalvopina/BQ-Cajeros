import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
  providers: [MessageService]
})
export class InformacionComponent implements OnInit {

  identification!: string;
  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  onKey(event: any){
console.log("enviar peticion: "+ this.identification);
this.messageService.add({
  severity: 'error',
  summary: 'Consulta',
  detail: "Buscando cliente con CI "+this.identification,
});
  }
}
