import { Parametros } from './Model/Parametros';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpModule, RequestOptions } from '@angular/http';
@Injectable()
export class ApiService {
  private baseURL = 'http://127.0.0.1:5000';

  constructor(private http: Http) { }

  get_Parameters() {
    return this.http.get(this.baseURL + '/parametros');
  }
  post_Parameters(data: Parametros) {
    return this.http.post(this.baseURL + '/parametros', JSON.stringify(data));
  }
}
