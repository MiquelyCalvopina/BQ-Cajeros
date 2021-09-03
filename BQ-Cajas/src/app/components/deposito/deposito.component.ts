import { Component, OnInit } from '@angular/core';
import { Deposito } from '../../../Model/Deposito';
import { ServiceDeposito } from '../../Service/deposito/service.deposito';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css'],
})
export class DepositoComponent implements OnInit {
  depositoSave: Deposito = new Deposito();
  constructor(private service: ServiceDeposito) {}

  ngOnInit(): void {}
  enviar() {
    console.table(this.depositoSave);
    this.service.createDeposito(this.depositoSave).subscribe((data) => {
      console.log('depositoS: ' + data);
      alert('Se Envio con Exito...!!!');
    });
  }
}
