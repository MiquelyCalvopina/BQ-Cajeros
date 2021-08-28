import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositoComponent } from './deposito.component';



@NgModule({
  declarations: [
    DepositoComponent
  ],
  imports: [
    CommonModule
  ],exports:[DepositoComponent]
})
export class PagoPrestamoModule { }
