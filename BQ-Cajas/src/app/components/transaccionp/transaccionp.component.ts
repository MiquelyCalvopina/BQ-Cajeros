import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ClientsService } from 'src/app/Service/client.service';
import { LoanService } from 'src/app/Service/loan.service';

@Component({
  selector: 'app-transaccionp',
  templateUrl: './transaccionp.component.html',
  styleUrls: ['./transaccionp.component.css'],
  providers: [MessageService],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  }
})
export class TransaccionpComponent implements OnInit {

  identification!: string;
  constructor(private messageService: MessageService, private clientService: ClientsService, private loanService: LoanService) { }

  ngOnInit(): void {
  }

  onIdentification() {
    this.clientService.getClient('CED', this.identification).subscribe(
      (res) => {
        console.log('CLIENTE IDENTIFICADO: ' + JSON.stringify(res));
        let clientIdentified: any = { ...res };
        
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

  enviar() {
    console.log('enviar peticion: ' + this.identification);
    this.messageService.add({
      severity: 'warn',
      summary: 'Consulta',
      detail: 'Buscando cliente con CI ' + this.identification,
    });
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == '*') {
      this.limpiar();
    }
  }
  
  limpiar(){
    this.identification = "";
  }

  getPrestamo(clientId: string){
    this.loanService.getClientLoan(clientId).subscribe(
      (res) => {
        
      },
      (err) => {

      }
    );
  }

}
