import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ClientsService } from 'src/app/Service/client.service';
import { ProductsService } from 'src/app/Service/products.service';
import { Client } from 'src/Model/Client';
import { Deposito } from '../../../Model/Deposito';

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
    this.productsService.createDeposit(this.depositoSave).subscribe(
      (data) => {        
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: 'Se ha registrado el deposito',
        });
        this.limpiar();
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
  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[0-9]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
      // invalid character, prevent input

    }
  }
  validadorDeCedula(cedula: String): any {
 
    if (cedula.length == 10) {
      let tercerDigito = parseInt(cedula.substring(2, 3));
      if (tercerDigito < 6) {
        // El ultimo digito se lo considera dígito verificador
        let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let verificador = parseInt(cedula.substring(9, 10));
        let suma: number = 0;
        let digito: number = 0;
        for (let i = 0; i < (cedula.length - 1); i++) {
          digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
          suma += ((parseInt((digito % 10) + '') + (parseInt((digito / 10) + ''))));
          //      console.log(suma+" suma"+coefValCedula[i]); 
        }
        suma = Math.round(suma);
        //  console.log(verificador);
        //  console.log(suma);
        //  console.log(digito);
        if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10) == verificador)) {
          return true;
        } else if ((10 - (Math.round(suma % 10))) == verificador) {
          return true;
        } else {
          return false;
        }
      } else {
         return false;
      }
    } else {
      return false;
    }
   

  }





}
