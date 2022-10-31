import { Component, OnInit } from '@angular/core';
import { Investimentos } from '../investimentos.model';
import { InvestimentosService} from '../investimentos.service';
import { Router, ActivatedRoute,} from '@angular/router';


@Component({
  selector: 'app-investimentos-delete',
  templateUrl: './investimentos-delete.component.html',
  styleUrls: ['./investimentos-delete.component.css']
})


export class InvestimentosDeleteComponent implements OnInit {


  investimentos:Investimentos={
    id: '',
    nome: '',
    taxa:0  
  }





  constructor(
    private investimentoservice: InvestimentosService, 
    private router: Router,
    private route : ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.investimentos.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }



  findById():void{
    this.investimentoservice.findById(this.investimentos.id!).subscribe((resposta)=>{
      this.investimentos.nome = resposta.nome;
      this.investimentos.taxa = resposta.taxa;
    })
  }




  deletar():void{
    this.investimentoservice.delete(this.investimentos.id!).subscribe((resposta)=>{
      this.router.navigate(['investimentos'])
      this.investimentoservice.mensagem(`Investimentos id Nº ${this.investimentos.id} deletedo com sucesso! `   )
    } , err=>{
      this.investimentoservice.mensagem(err.error.error);
    })

  }


  cancelar():void{
  this.router.navigate(['investimentos']) 

  }


}
