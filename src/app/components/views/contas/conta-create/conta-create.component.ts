import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContasService } from '../contas.service';
import { Contas} from '../contas.model';


@Component({
  selector: 'app-conta-create',
  templateUrl: './conta-create.component.html',
  styleUrls: ['./conta-create.component.css']
})


export class ContaCreateComponent implements OnInit {



  id_user:String=''

  new_conta:number=0


  contas:Contas ={
    id:'',
    numero:'',
    saldo:0,
    tipo:''
  }

 

  contaTipo: any = [
    'Conta Corrente',
    'Poupança',
    'Investimento',   
  ];



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contaservice : ContasService,
  ) { }


  ngOnInit(): void {
    this.id_user=this.route.snapshot.paramMap.get("id_user")!;
  }




   createConta():void{
      this.gerarConta();
       this.contaservice.create(this.contas,this.id_user).subscribe(resposta=>{
         this.router.navigate([`contas/${this.id_user}`])
          this.contaservice.mensagem("Conta criada com sucesso")
       },err=>{
          this.router.navigate([`contas/${this.id_user}`])
           this.contaservice.mensagem(" Erro ao Criar conta")
       })
   }





   gerarConta():void{      

    const min = 1 ;
    const max = 999;
                  
    this.new_conta = Math.floor(Math.random()*(max - min))
    this.contas.numero = this.new_conta.toString();
    
   }




   radioChangeHandler(event: any) {
     this.contas.tipo = event.target.value;
   }

   


}
