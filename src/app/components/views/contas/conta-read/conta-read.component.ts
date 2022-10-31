import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../users/user.model';
import { UserService } from '../../users/user.service';

import { Contas } from '../contas.model';
import { ContasService } from '../contas.service';


@Component({
  selector: 'app-conta-read',
  templateUrl: './conta-read.component.html',
  styleUrls: ['./conta-read.component.css']
})


export class ContaReadComponent implements OnInit {


 contas: Contas[] = [] 

// displayedColumns: string[] = [ 'id', 'numero', 'saldo', 'tipo' ,'movimentacao','acoes'];
 displayedColumns: string[] = [ 'id', 'numero', 'saldo', 'tipo' ,'movimentacao'];


 id_user:String = "" 
 


 add_conta:Boolean=true; 
 new_conta:Boolean=true;



  user: User = {
    id: '',
    name: '',
    login: '',
    password:''    
  }





  
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private contaservice : ContasService,

    private userservice: UserService, 
     ) { }



  ngOnInit(): void { 
  this.id_user = this.route.snapshot.paramMap.get('id_user')! 
  this.findAllContas();
  this.findUserById();
  }



  findUserById(): void {
    this.userservice.findById(this.id_user!).subscribe((resposta) => {
    this.user.name = `User : ${resposta.name}`;   
  })
}  






/*
findAllContas(){
  this.contaservice.findAll().subscribe(resposta=> {
    this.contas= resposta;
    console.log(resposta)
  })
 }

*/


findAllContas(){
   this.contaservice.findAllByUser(this.id_user).subscribe((resposta)=>{
    this.contas=resposta;
      if (this.contas.length === 0){
            this.new_conta = false;
            this.add_conta = true;
            console.log("não existe conta ")
      }else{
        this.new_conta = true;
        this.add_conta = false;
         console.log( " existe contas" )
      }
   })
}






 openCont():void{
  this.router.navigate([`contas/${this.id_user}/create`]);
 }


 selectConta(id:String):void{
 // this.router.navigate([`contas/${id}/selected`]); 
  this.router.navigate([`contas/${this.id_user}/${id}/selected`]); 
 }


 

 /*
 readMovimentacao(id:String):void{
 this.router.navigate([`contas/${id}/movimentacao`]); 
 }

 lancarMovimentacao(id:String):void{
  this.router.navigate([`contas/${id}/movimentacao/create`]);
 } 
 */






}
