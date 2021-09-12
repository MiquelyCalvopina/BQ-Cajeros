import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from '../constants';
import { OtpRQ } from 'src/Model/OtpRQ';
import { OtpValidationRQ } from 'src/Model/OtpValRQ';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  
  url = constants.processApi.url;
  constructor(private httpClient: HttpClient) {}

  generateLogOTP(otpRQ: OtpRQ) {
    let headers = new HttpHeaders().set(
      'Type-content',
      'application/json, charset=UTF-8'
    );
    console.log(this.url+'otp/'+JSON.stringify(otpRQ));
    return this.httpClient.post(this.url + 'otp/', otpRQ, {
      headers,
    });
  }

  validateLogOTP(otpValRQ: OtpValidationRQ) {
    let headers = new HttpHeaders().set(
      'Type-content',
      'application/json, charset=UTF-8'
    );
    console.log(this.url+'otp/validate/'+JSON.stringify(otpValRQ));
    return this.httpClient.post(this.url + 'otp/validate/', otpValRQ, {
      headers,
    });
  }
  
}
