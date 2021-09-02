import { Component, OnInit } from '@angular/core';
import { Retiro } from '../../../Model/Retiro';
import {ServiceRetiro}from '../../Service/retiro/service.retiro';


@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.css']
})
export class RetiroComponent implements OnInit {
  retiroSave:Retiro = new Retiro();
  constructor(private service:ServiceRetiro) { }

  ngOnInit(): void {
  }
  enviar(){
    console.table(this.retiroSave)
    this.service.createRetiro(this.retiroSave)
    .subscribe(data=>{
      console.log("retiroo: "+data)
      alert("Se Envio con Exito...!!!");
    })
  }

}
