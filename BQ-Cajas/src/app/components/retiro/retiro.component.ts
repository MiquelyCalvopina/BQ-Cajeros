import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ClientsService } from 'src/app/Service/Cliente/clientes.service';
import { ProductsService } from 'src/app/Service/Productos/products.service';
import { Retiro } from '../../../Model/Retiro';
import { ServiceRetiro } from '../../Service/retiro/service.retiro';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.css'],
  providers: [MessageService],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  },
})
export class RetiroComponent implements OnInit {
  retiroSave: Retiro = new Retiro();
  accounts: any = [];
  currentBalance: string = '';
  identification: string = '';
  @ViewChild('cedula') private cedula!: ElementRef;
  @ViewChild('cuenta') private cuenta!: ElementRef;
  @ViewChild('saldo') private saldo!: ElementRef;
  @ViewChild('monto') private monto!: ElementRef;

  constructor(
    private service: ServiceRetiro,
    private messageService: MessageService,
    private clientService: ClientsService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  limpiar() {
    this.retiroSave = new Retiro();
    this.accounts = [];
    this.cedula.nativeElement.value = '';
    this.cuenta.nativeElement.value = '';
    this.saldo.nativeElement.value = '';
    this.monto.nativeElement.value = '';
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == '*') {
      this.limpiar();
    }
  }

  getAccountTab(event: any) {}

  verificar() {
    console.log('ident:' + this.identification);
    console.log('cuenta:' + this.retiroSave.cuentaId);
    if (this.identification == '' && this.retiroSave.cuentaId != null) {
      this.getProduct(this.retiroSave.cuentaId);
    } else if (this.identification != '' && this.retiroSave.cuentaId == null) {
      this.getClient();
    } else if (this.identification != '' && this.retiroSave.cuentaId != null) {
      this.getProduct(this.retiroSave.cuentaId);
    }
  }

  getClient() {
    this.clientService.getClient('CED', this.identification).subscribe(
      (res) => {
        console.log('CLIENTE IDENTIFICADO: ' + JSON.stringify(res));
        let clientIdentified: any = { ...res };
        this.getAccounts(clientIdentified.id);
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
        if (!products[0]) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'El cliente no tiene cuentas para realizar el retiro',
          });
        } else {
          for (let product of Object.keys(products)) {
            console.log(products[product]);
            var type =
              products[product].productoPasivo.codProductoPasivo == 'GAN'
                ? 'Cuenta ahorros'
                : 'Cuenta ganadiario';
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
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El cliente no tiene cuentas para realizar el retiro',
        });
      }
    );
  }

  getProduct(accId: String) {
    this.productsService.obtainOneProduct(accId).subscribe(
      (res) => {
        console.log('PRODUCTOS: ' + JSON.stringify(res));
        var product: any = { ...res };
        var type =
          product.productoPasivo.codProductoPasivo == 'GAN'
            ? 'Cuenta ahorros'
            : 'Cuenta ganadiario';
        var productObj = {
          cuentaTipo: type,
          cuentaId: product.cuentaId,
          saldo: product.saldoDisponible,
        };
        console.log(productObj);
        this.accounts.push(productObj);
        console.log('CUENTA:' + JSON.stringify(this.accounts[0]));
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cuenta no encontrada',
        });
      }
    );
  }

  enviar() {
    this.service.createRetiro(this.retiroSave).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Retiro',
          detail: 'Registrado exitosamente',
        });
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Retiro',
          detail: err.error.detail,
        });
      }
    );
    console.log('RETIRO:' + JSON.stringify(this.retiroSave));
  }
}
