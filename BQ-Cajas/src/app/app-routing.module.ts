import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositoComponent } from './components/deposito/deposito.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { AutentificacionComponent } from './components/autentificacion/autentificacion.component';
import { TransaccionpComponent } from './components/transaccionp/transaccionp.component';
import { TransaccionComponent } from './components/transaccion/transaccion.component';
import { RetiroComponent } from './components/retiro/retiro.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tarjeta', component: TransaccionComponent },
  { path: 'prestamo', component: TransaccionpComponent },
  { path: 'informacion', component: InformacionComponent },
  { path: 'retiro', component: RetiroComponent },
  { path: 'deposito', component: DepositoComponent },
  { path: 'login', component: AutentificacionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
