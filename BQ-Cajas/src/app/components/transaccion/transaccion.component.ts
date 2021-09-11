import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductsService } from 'src/app/Service/products.service';
import { CardService } from 'src/app/Service/card.service';
import { ClientsService } from 'src/app/Service/client.service';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css'],
  providers: [MessageService],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  }
})
export class TransaccionComponent implements OnInit {
  identification!: string;
  tarjeta!: string;

  constructor(private messageService: MessageService,private clientService: ClientsService,private cardsService: CardService) {}

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
          detail: err.error.detail
        });
      }
    );
  }

  onCarNumber(event: any) {
    console.log('enviar peticion: ' + this.tarjeta);
    this.messageService.add({
      severity: 'warn',
      summary: 'Consulta',
      detail: 'Buscando cedula con número ' + this.tarjeta,
    });
  }

  getCard(clientId: string){
    this.cardsService.getClientCard(clientId).subscribe(
      (res) => {
        console.log(JSON.stringify(res))
      },
      (err) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Consulta',
          detail: err.error.detail
        });
      }
    );
  }

  enviar() {
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

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == '*') {
      this.limpiar();
    }
  }

  limpiar(){
    
  }
}
