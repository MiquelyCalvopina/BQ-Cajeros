import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransaccionpComponent } from './transaccionp/transaccionp.component';



@NgModule({
  declarations: [
    TransaccionpComponent
  ],
  imports: [
    CommonModule
  ],exports:[TransaccionpComponent]
})
export class PagoPrestamoModule { }
