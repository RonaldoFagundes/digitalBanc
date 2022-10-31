import { Component, OnInit } from '@angular/core';
import { Investimentos } from '../investimentos.model';
import { InvestimentosService} from '../investimentos.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-investimentos-create',
  templateUrl: './investimentos-create.component.html',
  styleUrls: ['./investimentos-create.component.css']
})


export class InvestimentosCreateComponent implements OnInit {


  investimentos:Investimentos={
    id: '',
    nome: '',
    taxa:0  
  }



  constructor(
    private investimentoservice: InvestimentosService, 
    private router: Router
  ) { }



  ngOnInit(): void {
  }



   create():void{
     this.investimentoservice.create(this.investimentos).subscribe((resposta)=>{
       this.router.navigate(['investimentos']);
       this.investimentoservice.mensagem("Investimentos add com sucesso!");
        
     }, err =>{
      for(let i = 0 ; i < err.error.errors.length; i++  ) {
        this.router.navigate(['investimentos']);
        this.investimentoservice.mensagem(err.error.errors[i].message)
    }
     })
   }
  

}
