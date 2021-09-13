import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductsService } from 'src/app/Service/products.service';
import { CardService } from 'src/app/Service/card.service';
import { ClientsService } from 'src/app/Service/client.service';
import { ProcessService } from 'src/app/Service/process.service';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css'],
  providers: [MessageService],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  },
})
export class TransaccionComponent implements OnInit {
  identification!: string;
  tarjeta!: string;
  deuda!: string;
  statudId!: string;

  constructor(
    private messageService: MessageService,
    private clientService: ClientsService,
    private cardsService: CardService,
    private processService: ProcessService
  ) {}

  ngOnInit(): void {}

  onIdentification() {
    this.clientService.getClient('CED', this.identification).subscribe(
      (res) => {
        console.log('CLIENTE IDENTIFICADO: ' + JSON.stringify(res));
        let clientIdentified: any = { ...res };
        this.getCard(clientIdentified.id);
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.detail,
        });
      }
    );
  }

  onCarNumber() {
    this.cardsService.getCard(this.tarjeta).subscribe(
      (res) => {        
        this.messageService.add({
          severity: 'warn',
          summary: 'Cargando',
          detail: 'Realizando la búsqueda de la deuda',
        });
        let response:any = {...res}
        this.cardStatus(response.codTarjetaCliente);
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.detail,
        });
      }
    );
  }

  getCard(clientId: string) {
    this.cardsService.getClientCard(clientId).subscribe(
      (res) => {
        console.log(JSON.stringify(res));
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.detail,
        });
      }
    );
  }

  verificar() {
    if (this.tarjeta == null && this.identification != null) {
      this.onIdentification()
    } else {
      this.onCarNumber();
    }
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == '*') {
      this.limpiar();
    }
  }

  limpiar() {
    this.tarjeta = '';
    this.identification = '';
    this.deuda = '';
  }

  enviar(){
    //solo puede pagar lo que debe
    this.processService.payCardStatus(this.statudId).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Pago realizado'
        });
        this.limpiar();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.detail,
        });
      }
    );
  }

  cardStatus(clientCardId: string){
    this.processService.getCardStatus(clientCardId).subscribe(
      (res) => {
        let status:any = {...res}
        this.deuda = parseFloat(status.totalCredit).toFixed(2);
        this.statudId = status.id;
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.detail,
        });
      }
    );
  }
}
