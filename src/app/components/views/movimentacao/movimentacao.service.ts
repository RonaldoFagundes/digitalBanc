import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movimentacao } from './movimentacao.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})


export class MovimentacaoService {

  baseUrl:String = environment.baseUrl;



  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

 

  

  findAllByConta(id_conta:String):Observable<Movimentacao[]>{
    const url = `${this.baseUrl}movimentacao?contas=${id_conta}`
    return this.http.get<Movimentacao[]>(url)
 }




  create(movimentacao:Movimentacao, id_conta:String):Observable<Movimentacao>{
    const url = `${this.baseUrl}movimentacao?contas=${id_conta}`
    return this.http.post<Movimentacao>(url,movimentacao);
  }



  mensagem(str:String):void{
    this._snack.open(`${str}`,'OK', {
      horizontalPosition:'end',
      verticalPosition:'top',
      duration:3000
    })
  }
  
  
}
