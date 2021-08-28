import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IniciaSesionModule } from './inicia-sesion/inicia-sesion.module';
import { SharedModule } from './shared/shared.module';
import { TransaccionComponent } from './pago-tarjeta/transaccion/transaccion.component';
import { TransaccionpComponent } from './pago-prestamo/transaccionp/transaccionp.component';
import { AutentificacionComponent } from './inicia-sesion/autentificacion/autentificacion.component';


const routes: Routes = [
  { path: 'tarjeta', component: TransaccionComponent },
  { path: 'prestamo', component: TransaccionpComponent },
  { path: 'login', component: AutentificacionComponent }

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    IniciaSesionModule,
    RouterModule.forRoot(routes)
  ],exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

