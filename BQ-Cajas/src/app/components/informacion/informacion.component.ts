import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ClientsService } from 'src/app/Service/Cliente/clientService.service';
import { ProductsService } from 'src/app/Service/Productos/products.service';
import { Client } from 'src/Model/Client';
import { Retiro } from 'src/Model/Retiro';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
  providers: [MessageService],
})
export class InformacionComponent implements OnInit {
  identification!: string;
  client!: Client;
  retiroSave!: Retiro;
  accounts: any = [];

  constructor(
    private messageService: MessageService,
    private clientService: ClientsService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.retiroSave = new Retiro();
    console.log(this.retiroSave);
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
        this.getAccounts(this.client.id);
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

  getAccounts(id: string) {
    this.productsService.obtainProducts(id).subscribe(
      (res) => {
        console.log('PRODUCTOS: ' + JSON.stringify(res));
        var products: any = { ...res };
        for (let product of Object.keys(products)) {
          console.log(products[product]);
          var type =
            products[product].productoPasivo.codProductoPasivo == 'GAN'
              ? 'Ahorros'
              : 'Ganadiario';
          var productObj = {
            cuentaTipo: type,
            cuentaId: products[product].cuentaId,
            saldo: products[product].saldoDisponible,
          };
          console.log(productObj);
          this.accounts.push(productObj);
        }
        console.log('AHORRO:' + JSON.stringify(this.accounts[0]));
        console.log('GANADIARIO:' + JSON.stringify(this.accounts[1]));
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El cliente no tiene cuentas activas',
        });
      }
    );
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


  
}
