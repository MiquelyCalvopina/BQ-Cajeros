import { Component, OnInit } from '@angular/core';
import { Retiro } from '../Model/Retiro';
import {ServiceRetiro}from '../Service/retiro/service.retiro';


@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.css']
})
export class RetiroComponent implements OnInit {
  retiro:Retiro = new Retiro();
  constructor(private service:ServiceRetiro) { }

  ngOnInit(): void {
  }
  enviar(){
    this.service.createRetiro(this.retiro)
    .subscribe(data=>{
      alert("Se Envio con Exito...!!!");
    })
  }

}
