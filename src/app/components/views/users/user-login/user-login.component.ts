import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})


export class UserLoginComponent implements OnInit {



  user: User = {
    id: '',
    name: '',
    login: '',
    password: ''
  }


  
  login = new FormControl("", [Validators.minLength(3)])
  password = new FormControl("", [Validators.minLength(10)])


  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
  }




  logar(): void {
    this.service.findById(this.user.id!).subscribe((resposta) => {

      if (this.user.login === resposta.login && this.user.password === resposta.password) {
        this.router.navigate([`contas/${this.user.id}`]);
        console.log("credenciais ok  ")
      } else {
        this.service.mensagem("Dados de Validação incorretos! ");
        console.log(" error nas credenciais ")
      }


    })
  }


  cadastrar(): void {
    this.router.navigate(["create"]);
  }



  getMessage() {

    if (this.login.invalid) {
      return "O campo LOGIN deve ter entre 3 e 40 caracteres "
    }
    if (this.password.invalid) {
      return "O campo PASSWORD deve ter entre 10 e 12 caracteres "
    }
    return false;
  }



}
