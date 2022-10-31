import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Investimentos } from './investimentos.model';




@Injectable({
  providedIn: 'root'
})


export class InvestimentosService {

  baseUrl: String = environment.baseUrl;



  constructor(private http: HttpClient, private _snack: MatSnackBar) { }





  findAll(): Observable<Investimentos[]> {
    const url = `${this.baseUrl}investimentos`
    return this.http.get<Investimentos[]>(url);
  }






  getSelic(id_invest: String): Observable<Investimentos> {
    const url = `${this.baseUrl}investimentos/${id_invest}`
    return this.http.get<Investimentos>(url);
  }





  findById(id_invest: String): Observable<Investimentos> {
    const url = `${this.baseUrl}investimentos/${id_invest}`
    return this.http.get<Investimentos>(url);
  }





  create(investimentos: Investimentos): Observable<Investimentos> {
    const url = `${this.baseUrl}investimentos`
    return this.http.post<Investimentos>(url, investimentos)
  }





  update(investimentos: Investimentos): Observable<void> {
    const url = `${this.baseUrl}investimentos/${investimentos.id}`
    return this.http.put<void>(url, investimentos);
  }





  delete(id: String): Observable<void> {
    const url = `${this.baseUrl}investimentos/${id}`
    return this.http.delete<void>(url);
  }







  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }












}
