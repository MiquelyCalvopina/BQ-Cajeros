import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css'],
  providers: [MessageService],
})
export class TransaccionComponent implements OnInit {
  identification!: string;
  tarjeta!: string;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  onIdentification(event: any) {
    console.log('enviar peticion: ' + this.identification);
    this.messageService.add({
      severity: 'warn',
      summary: 'Consulta',
      detail: 'Buscando cliente con CI ' + this.identification,
    });
  }

  onCarNumber(event: any) {
    console.log('enviar peticion: ' + this.tarjeta);
    this.messageService.add({
      severity: 'warn',
      summary: 'Consulta',
      detail: 'Buscando cedula con número ' + this.tarjeta,
    });
  }

  send() {
    if (this.tarjeta == null && this.identification != null) {
      console.log('enviar peticion: ' + this.identification);
      this.messageService.add({
        severity: 'warn',
        summary: 'Consulta',
        detail: 'Buscando cliente con CI ' + this.identification,
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Consulta',
        detail: 'Buscando cedula con número ' + this.tarjeta,
      });
    }
  }
}
