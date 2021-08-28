import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacionComponent } from './informacion.component';



@NgModule({
  declarations: [
    InformacionComponent
  ],
  imports: [
    CommonModule
  ],exports:[InformacionComponent]
})
export class PagoPrestamoModule { }
