import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ClientsService } from 'src/app/Service/Cliente/clientService.service';
import { ProductsService } from 'src/app/Service/Productos/products.service';
import { Client } from 'src/Model/Client';
import { Deposito } from '../../../Model/Deposito';
import { ServiceDeposito } from '../../Service/deposito/service.deposito';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css'],
  providers: [MessageService],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  }
})
export class DepositoComponent implements OnInit {
  depositoSave!: Deposito; 
  client!: Client;
  accounts: any = [];
  identification!: string;
  beneficiaryName!: string;
  constructor(
    private service: ServiceDeposito,
    private messageService: MessageService,
    private clientService: ClientsService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.depositoSave = new Deposito();
    this.client = new Client();
  }

  getClient() {
    this.client = new Client();
    this.accounts = [];
    this.clientService.getClient('CED', this.identification).subscribe(
      (res) => {
        console.log('CLIENTE IDENTIFICADO: ' + JSON.stringify(res));
        let clientIdentified: any = { ...res };
        this.client = {
          id: clientIdentified.id,
          tipoIdentificacion: clientIdentified.tipoIdentificacion,
          identificacion: clientIdentified.identificacion,
          apellidoPaterno: clientIdentified.apellidoPaterno,
          apellidoMaterno: clientIdentified.apellidoMaterno,
          nombre1: clientIdentified.nombre1,
          nombre2: clientIdentified.nombre2,
          provincia: clientIdentified.provincia,
          canton: clientIdentified.canton,
          parroquia: clientIdentified.parroquia,
          direccion: clientIdentified.direccion,
          telefono: clientIdentified.telefono,
          email: clientIdentified.email,
          fechaNacimiento: clientIdentified.fechaNacimiento,
          estadoCivil: clientIdentified.estadoCivil,
          estadoBancaWeb: clientIdentified.estadoBancaWeb,
          estado: clientIdentified.estado,
        };        
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cliente no encontrado',
        });
      }
    );
  }

  enviar() {
    console.table(this.depositoSave);
    this.service.createDeposito(this.depositoSave).subscribe(
      (data) => {        
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: 'Se ha registrado el deposito',
        });
    },
    (err) => {
      console.log("ERROR:"+JSON.stringify(err))
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err.error.detail,
      });
    }
    );
  }

  getProduct() {
    this.productsService.obtainOneProduct(this.depositoSave.cuentaId).subscribe(
      (res) => {
        console.log('CUENTA: ' + JSON.stringify(res));
        var product: any = { ...res };
        this.clientService.getClientByID(product.codCliente).subscribe(
          (data) => {
            let dataVar:any = {...data}
            this.beneficiaryName = dataVar.nombre1 + " " + dataVar.nombre2 + " " + dataVar.apellidoPaterno + " " + dataVar.apellidoMaterno;
            console.log(JSON.stringify(data))
          }
        );
      },
      (err) => {
        this.beneficiaryName = ""
      }
    );
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == '*') {
      this.limpiar();
    }
  }

  limpiar(){
    this.depositoSave = new Deposito();
    this.identification = "";
  }
}
