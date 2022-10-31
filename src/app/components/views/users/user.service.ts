import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';



@Injectable({
  providedIn: 'root'
})


export class UserService {

  baseUrl:String = environment.baseUrl;
      

  constructor(private http: HttpClient , private _snack: MatSnackBar) { }


  findAll():Observable<User[]>{
    const url = `${this.baseUrl}users`  
    return this.http.get<User[]>(url);
  }



  
  findById(id:String):Observable<User>{
    const url = `${this.baseUrl}users/${id}`
    return this.http.get<User>(url);
  }




  create(user:User):Observable<User>{
    const url = `${this.baseUrl}users`
     return this.http.post<User>(url,user);
  }


 update(user:User):Observable<void>{
    const url = `${this.baseUrl}users/${user.id}`
     return this.http.put<void>(url ,user)
 }

  
mensagem(str:String):void{
  this._snack.open(`${str}`,'OK', {
    horizontalPosition:'end',
    verticalPosition:'top',
    duration:3000
  })
}




}