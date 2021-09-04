import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autentificacion',
  templateUrl: './autentificacion.component.html',
  styleUrls: ['./autentificacion.component.css']
})
export class AutentificacionComponent implements OnInit {

  user!: string;
  password!: string;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  send(){
    console.log(this.user + " : " + this.password);
    let user = {username: this.user, password: this.password, name: "miquely estefany calvopiña jacome"};
    this.router.navigate(['/system/info']);
  }
}
