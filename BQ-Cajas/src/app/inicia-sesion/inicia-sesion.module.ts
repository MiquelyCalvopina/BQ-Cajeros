import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutentificacionComponent } from './autentificacion/autentificacion.component';



@NgModule({
  declarations: [
    AutentificacionComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[AutentificacionComponent]
})
export class IniciaSesionModule { }
