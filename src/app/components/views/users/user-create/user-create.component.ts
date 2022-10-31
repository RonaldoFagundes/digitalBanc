import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})


export class UserCreateComponent implements OnInit {

  user: User = {
    id: '',
    name: '',
    login: '',
    password: ''
  }

  name = new FormControl("", [Validators.minLength(3)])
  login = new FormControl("", [Validators.minLength(3)])
  password = new FormControl("", [Validators.minLength(10)])



  constructor(
    private service: UserService,
    private router: Router
  ) { }




  ngOnInit(): void {
  }





  create(): void {

    this.service.create(this.user).subscribe((resposta) => {

      this.router.navigate(['login']);
      this.service.mensagem("Usuario criado com sucesso!");

    }, err => {
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    })

  }


  getMessage() {

    if (this.name.invalid) {
      return "O campo USER deve ter entre 3 e 40 caracteres "
    }
    if (this.login.invalid) {
      return "O campo LOGIN deve ter entre 3 e 40 caracteres "
    }
    if (this.password.invalid) {
      return "O campo PASSWORD deve ter entre 10 e 12 caracteres "
    }
    return false;
  }



}
