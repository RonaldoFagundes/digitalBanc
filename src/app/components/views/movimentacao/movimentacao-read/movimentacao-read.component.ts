import { Component, OnInit } from '@angular/core';
import { Movimentacao } from '../movimentacao.model';
import { MovimentacaoService } from '../movimentacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-movimentacao-read',
  templateUrl: './movimentacao-read.component.html',
  styleUrls: ['./movimentacao-read.component.css']
})



export class MovimentacaoReadComponent implements OnInit {


 movimentacao: Movimentacao[] = []

 
 displayedColumns: string[] = ['id', 'data', 'tipo', 'descricao','valor'];


 id_conta:String =""
 id_user:String =""


  constructor(
    private service:MovimentacaoService, 
    private route:ActivatedRoute,
    private router: Router,
    private userService:UserService
    ) { }

    

  ngOnInit(): void {
    this.id_user = this.route.snapshot.paramMap.get('id_user')!;
    this.id_conta = this.route.snapshot.paramMap.get('id_conta')!;
    this.findAllMovimentacaoByConta();
  }



  findAllMovimentacaoByConta():void{
    this.service.findAllByConta(this.id_conta).subscribe((resposta)=>{
       this.movimentacao = resposta;
       console.log(resposta);
    })
  }



  telaConta():void{
    this.router.navigate([`contas/${this.id_user}/${this.id_conta}/selected`]);
  }


}
