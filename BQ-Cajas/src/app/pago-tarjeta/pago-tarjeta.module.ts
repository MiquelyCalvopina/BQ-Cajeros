import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransaccionComponent } from './transaccion/transaccion.component';



@NgModule({
  declarations: [
    TransaccionComponent
  ],
  imports: [
    CommonModule
  ], exports:[TransaccionComponent]
})
export class PagoTarjetaModule { }
