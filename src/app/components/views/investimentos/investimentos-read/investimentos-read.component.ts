import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Investimentos } from '../investimentos.model';
import { InvestimentosService } from '../investimentos.service';

@Component({
  selector: 'app-investimentos-read',
  templateUrl: './investimentos-read.component.html',
  styleUrls: ['./investimentos-read.component.css']
})

export class InvestimentosReadComponent implements OnInit {

  

  displayedColumns: string[] = ['id', 'nome', 'taxa', 'acoes']; 

  investimentos: Investimentos [] = []

  
  constructor(
    private service:InvestimentosService,
    private router: Router,
    ) { }




  ngOnInit(): void {
    this.findAll();
  }


  findAll(){
    this.service.findAll().subscribe(resposta=> {
      this.investimentos = resposta;
      console.log(resposta)
    })
   }





   addInvestimento():void{
    this.router.navigate([`investimentos/create`]); 
   }




}
