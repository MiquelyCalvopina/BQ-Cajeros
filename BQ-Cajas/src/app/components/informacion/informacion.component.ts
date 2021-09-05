import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cliente } from '../../../Model/Cliente';
import {ServiceCliente}from '../../Service/Cliente/service.cliente';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
  providers: [MessageService]
})
export class InformacionComponent implements OnInit {
  cliente :Cliente = new Cliente();
  identification!: string;
  tipoIdentificacion!:string;
  constructor(private messageService: MessageService,private service:ServiceCliente) {}

  ngOnInit(): void {
  }

  onKey(event: any) {
    console.log('enviar peticion: ' + this.identification);
    this.messageService.add({
      severity: 'warn',
      summary: 'Consulta',
      detail: 'Buscando cliente con CI ' + this.identification,
    });
  }

  send() {
    console.log('enviar peticion: ' + this.identification);
    this.messageService.add({
      severity: 'warn',
      summary: 'Consulta',
      detail: 'Buscando cliente con CI ' + this.identification,
    });
  }


  verificar(tipoId:string,id:string){
    console.log('Hola cliente'+id+tipoId);
    this.service.getClient(tipoId,id)
    .subscribe(data=>{
      this.cliente=data;
    })

  }




}
