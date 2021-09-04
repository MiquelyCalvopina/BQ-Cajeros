import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Deposito } from '../../../Model/Deposito';
import { ServiceDeposito } from '../../Service/deposito/service.deposito';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css'],
  providers: [MessageService],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  },
})
export class DepositoComponent implements OnInit {
  depositoSave: Deposito = new Deposito();
  identification!: string;
  constructor(
    private service: ServiceDeposito,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}
  enviar() {
    console.table(this.depositoSave);
    this.service.createDeposito(this.depositoSave).subscribe((data) => {
      console.log('depositoS: ' + data);
      alert('Se Envio con Exito...!!!');
    });
  }
}
