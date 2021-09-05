import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transaccionp',
  templateUrl: './transaccionp.component.html',
  styleUrls: ['./transaccionp.component.css'],
  providers: [MessageService]
})
export class TransaccionpComponent implements OnInit {

  identification!: string;
  constructor(private messageService: MessageService) { }

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

  enviar() {
    console.log('enviar peticion: ' + this.identification);
    this.messageService.add({
      severity: 'warn',
      summary: 'Consulta',
      detail: 'Buscando cliente con CI ' + this.identification,
    });
  }

  limpiar(){
    this.identification = "";
  }

}
