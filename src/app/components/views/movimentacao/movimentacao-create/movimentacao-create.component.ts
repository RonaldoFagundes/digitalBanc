import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movimentacao } from '../movimentacao.model';
import { MovimentacaoService } from '../movimentacao.service';
import { ContasService } from '../../contas/contas.service';
import { Contas } from '../../contas/contas.model';



@Component({
  selector: 'app-movimentacao-create',
  templateUrl: './movimentacao-create.component.html',
  styleUrls: ['./movimentacao-create.component.css']
})


export class MovimentacaoCreateComponent implements OnInit {


  data: Date = new Date();
  dia: String = ""
  mes: String = ""
  ano: number = 0
  today: String = ""


  id_user: String = ""

  receitas = null
  despesas = null

  tipoMovimentacao: String = ""


  movimentacao: Movimentacao = {
    id: '',
    data: '',
    tipo: '',
    descricao: '',
    valor: 0
  }




  contas: Contas = {
    id: '',
    numero: '',
    saldo: 0,
    tipo: ''
  }




  valorTransacao: number = 0


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movimentacaoService: MovimentacaoService,
    private contaService: ContasService,

  ) { }




  ngOnInit(): void {
    this.id_user = this.route.snapshot.paramMap.get('id_user')!;
    this.contas.id = this.route.snapshot.paramMap.get('id_conta')!;
    this.getContaSaldo();
    this.setToday();
  }



  setToday(): void {
    this.dia = this.data.getDate().toString().padStart(2, '0');
    this.mes = (this.data.getMonth() + 1).toString().padStart(2, '0');
    this.ano = this.data.getFullYear();
    this.today = `${this.dia}/${this.mes}/${this.ano}`;
  }



  getContaSaldo(): void {
    this.contaService.findById(this.contas.id!).subscribe((resposta) => {
      this.contas.numero = resposta.numero;
      this.contas.tipo = resposta.tipo;
      this.contas.saldo = resposta.saldo;
      console.log(resposta)
    })
  }




  lancarMovimentacao(): void {

    this.movimentacao.data = this.today;

    this.movimentacaoService.create(this.movimentacao, this.contas.id!).subscribe((resposta) => {

      this.router.navigate([`contas/${this.id_user}/${this.contas.id}/movimentacao`]);
      this.movimentacaoService.mensagem('Movimentação lançada com sucesso! ');
      this.updateSaldoConta();

    }, err => {
      this.movimentacaoService.mensagem("erro ao lançar movimentação")
    })
  }






  telaConta(): void {
    this.router.navigate([`contas/${this.id_user}/${this.contas.id}/selected`]);
  }






  updateSaldoConta(): void {

    if (this.tipoMovimentacao === "Receitas") {
      this.contas.saldo += + this.movimentacao.valor
    }
    if (this.tipoMovimentacao === "Despesas") {
      this.contas.saldo = this.contas.saldo - this.movimentacao.valor
    }

    this.contaService.update(this.contas).subscribe((resposta) => {
    })

  }




  selecionarTipo(receitas: boolean, despesas: boolean): void {

    if (receitas === true && despesas === false) {
      this.tipoMovimentacao = "Receitas"
    }

    if (receitas === false && despesas === true) {
      this.tipoMovimentacao = "Despesas"
    }

  }




}













  




