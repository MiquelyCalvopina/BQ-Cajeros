import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BQAuthService } from '../../Service/bqauth.service';
import { MessageService } from 'primeng/api';
import { User } from '../../../Model/User';
import { OtpRQ } from '../../../Model/OtpRQ';
import { ViewChild } from '@angular/core';
import { OtpValidationRQ } from 'src/Model/OtpValRQ';

import { ProcessService } from 'src/app/Service/process.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ClientsService } from '../../Service/Cliente/clientService.service';
@Component({
  selector: 'app-autentificacion',
  templateUrl: './autentificacion.component.html',
  styleUrls: ['./autentificacion.component.css'],
  providers: [MessageService]
})
export class AutentificacionComponent implements OnInit {
  username!: string;
  password!: string;
  display: boolean = false;
  otpRQ!: OtpRQ;
  otpValRQ!: OtpValidationRQ;
  otpPin!: string;
  user!: User;
  loginForm!: FormGroup;
  @ViewChild('ngOtpInput') ngOtpInputRef: any;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private bqauthService: BQAuthService,
    private processService: ProcessService,
    private clientService: ClientsService
  ) {}

  ngOnInit(): void {
    this.user = new User();
    this.loginForm= new FormGroup({
      'username': new FormControl(this.username, [
        Validators.required
      ]),
      'password': new FormControl(this.password, [
        Validators.required
      ]),
    });
  }

  send(): void {    
    this.username= this.loginForm.value.username;
    this.password= this.loginForm.value.password;
    const credentials = { username: this.username, password: this.password };
    this.bqauthService.login(credentials).subscribe(
      (res) => {
        console.log('cuenta:' + JSON.stringify(res));
        let account: any = { ...res };
        this.getClient(account.identifierType, account.identifier);
      },
      (err) => {
        console.log('err ' + JSON.stringify(err));
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.detail,
        });
      }
    );
  }

  getClient(identifierType: string, identifier: string) {
    this.clientService.getClient(identifierType, identifier).subscribe(
      (res) => {
        let response: any = { ...res };
        this.display = true;
        this.user = {
          id: response.id,
          tipoIdentificacion: response.tipoIdentificacion,
          identificacion: response.identificacion,
          fullName: response.nombre1 + " " + response.nombre2 + " " + response.apellidoPaterno + " " + response.apellidoMaterno,          
          provincia: response.provincia,
          canton: response.canton,
          parroquia: response.parroquia,
          direccion: response.direccion,
          telefono: response.telefono,
          email: response.email,
          fechaNacimiento: response.fechaNacimiento,
          estadoCivil: response.estadoCivil,
          estadoBancaWeb: response.estadoBancaWeb,
          estado: response.estado,
        };
        this.otp();
      },
      (err) => {
        console.log('err ' + JSON.stringify(err));
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Usted no es cliente del banco',
        });
      }
    );
  }

  otp() {
    this.otpRQ = {
      email: this.user.email,
      fullName: this.user.fullName.toUpperCase(),
      type: 'access_pin',
    };
    console.log('otpRquest:' + JSON.stringify(this.otpRQ));
    this.processService.generateLogOTP(this.otpRQ).subscribe(
      (res) => {
        console.log('OTPRQ:' + JSON.stringify(res));
        this.display = true;
      },
      (err) => {
        console.log('OTPVAL:' + JSON.stringify(err));
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.detail,
        });
      }
    );
  }

  onOtpChange(otp: string) {
    this.otpPin = otp;
  }

  validateOtp() {
    this.otpValRQ = {
      email: this.user.email,
      pin: this.otpPin,
      type: 'access_pin',
    };
    console.log('validation:' + JSON.stringify(this.otpValRQ));
    this.processService.validateLogOTP(this.otpValRQ).subscribe(
      (res) => {
        console.log('OTPVAL:' + JSON.stringify(res));
        this.display = false;
        sessionStorage.setItem(
          'currentUserName',
          this.user.fullName.toUpperCase()
        );
        sessionStorage.setItem(
          'currentUserID',          
            this.user.id
        );
        sessionStorage.setItem(
          'currentUserEmail',          
            this.user.email
        );
        this.router.navigate(['/welcome']);
      },
      (err) => {
        console.log('OTPVAL:' + JSON.stringify(err));
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.detail,
        });
      }
    );
  }
}
