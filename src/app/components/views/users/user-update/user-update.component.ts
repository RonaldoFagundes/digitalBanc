import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})


export class UserUpdateComponent implements OnInit {


  user: User = {
    id: '',
    name: '',
    login: '',
    password: ''
  }



  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private userservice : UserService
  ) { }


  ngOnInit(): void {
    this.user.id = this.route.snapshot.paramMap.get('id')!;
    this.findByid();
  }



  findByid():void{
    this.userservice.findById(this.user.id!).subscribe((resposta)=>{
        this.user.name = resposta.name;
        this.user.login = resposta.login;
        this.user.password = resposta.password;
    })

  }



  update():void{
      this.userservice.update(this.user).subscribe((resposta)=>{
          this.router.navigate(['users'])
          this.userservice.mensagem('user atualizado com sucesso!');
      },err=>{
          this.userservice.mensagem('validar se todos campos estão preenchidos corretamente!');   
      });
  }

  
  cancelar():void{
    this.router.navigate(['users'])
   }


}
