import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Contas } from './contas.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})


export class ContasService {

  baseUrl:String = environment.baseUrl;


  constructor( private http: HttpClient , private _snack: MatSnackBar ) { }

 
  
  findAllByUser(id_user:String):Observable<Contas[]>{
    const url = `${this.baseUrl}contas?users=${id_user}`
    return this.http.get<Contas[]>(url);
  }



  findById(id_conta:String):Observable<Contas>{
    const url = `${this.baseUrl}contas/${id_conta}`
    return this.http.get<Contas>(url);
  }
  


  create(contas:Contas, id_user:String):Observable<Contas>{
    const url = `${this.baseUrl}contas?users=${id_user}`
     return this.http.post<Contas>(url,contas);
  }


  

  update(contas:Contas):Observable<void>{
    const url = `${this.baseUrl}contas/${contas.id}`
     return this.http.put<void>(url,contas);
  }




  mensagem(str:String):void{
    this._snack.open(`${str}`,'OK', {
      horizontalPosition:'end',
      verticalPosition:'top',
      duration:3000
    })
  }
  

}
