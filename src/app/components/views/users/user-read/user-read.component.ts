import { Component, OnInit } from '@angular/core';
import { User} from '../user.model'
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})


export class UserReadComponent implements OnInit {

  users: User[] = []

  displayedColumns: string[] = ['id', 'name', 'login', 'password', 'acoes'];

  constructor( private service:UserService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta=> {
      this.users = resposta;    
    })
   }

  
  

}
