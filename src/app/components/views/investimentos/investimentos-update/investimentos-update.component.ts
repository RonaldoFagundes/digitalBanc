import { Component, OnInit } from '@angular/core';
import { Investimentos } from '../investimentos.model';
import { InvestimentosService} from '../investimentos.service';
import { Router, ActivatedRoute,} from '@angular/router';






@Component({
  selector: 'app-investimentos-update',
  templateUrl: './investimentos-update.component.html',
  styleUrls: ['./investimentos-update.component.css']
})


export class InvestimentosUpdateComponent implements OnInit {


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


  
  update():void{
    this.investimentoservice.update(this.investimentos).subscribe((resposta)=>{

     this.router.navigate(['investimentos'])
     this.investimentoservice.mensagem('investimento atualizado com sucesso!');
    }, err=> {
       this.investimentoservice.mensagem('validar se todos campos estão preenchidos corretamente!');
    });
  }



   cancelar():void{
    this.router.navigate(['investimentos'])
   }

}
