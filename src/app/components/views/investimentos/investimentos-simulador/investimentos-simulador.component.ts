import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Investimentos } from '../investimentos.model';
import { InvestimentosService } from '../investimentos.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-investimentos-simulador',
  templateUrl: './investimentos-simulador.component.html',
  styleUrls: ['./investimentos-simulador.component.css']
})


export class InvestimentosSimuladorComponent implements OnInit {


  valorValid = new FormControl('', [Validators.minLength(4)])



  id_user: String = ''
  id_conta: String = ''


  investimentos: Investimentos = {
    id: '',
    nome: '',
    taxa: 0
  }



  id_selic: String = '1';
  selic: number = 0

  id_invest: String = ''




  investimento_id: string = '';

  investOpcao: any = [
    'Resgate 0',
    '6M + 1',
    '12M + 1',
    '24M + 1'
  ];




  ir180: number = 22.5 / 100
  ir181_360: number = 20 / 100
  ir361_720: number = 17.5 / 100
  ir721: number = 15 / 100

  valor: number = 0.00
  bruto: number = 0.00
  liquido: number = 0.00
  ir: number = 0

  brutoStr: String = ""
  liquidoStr: String = ""
  irStr: String = ""

  tipo_name: String = ""





  constructor(
    private investimentoservice: InvestimentosService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }





  ngOnInit(): void {
    this.id_user = this.route.snapshot.paramMap.get("id_user")!;
    this.id_conta = this.route.snapshot.paramMap.get("id_conta")!;
    this.getSelic();
  }




  getSelic(): void {

    this.investimentoservice.findById(this.id_selic!).subscribe((resposta) => {
    this.investimentos.nome = resposta.nome;
    this.investimentos.taxa = resposta.taxa
    this.selic = this.investimentos.taxa
    })

  }



  findInvestimentoById(id: String): void {

    this.investimentoservice.findById(id!).subscribe((resposta) => {
    this.investimentos.nome = resposta.nome;
    this.investimentos.taxa = resposta.taxa

    })

  }




  calcularInvestimentos(): void {

    this.bruto = this.valor * (this.selic / 100 / 12) * (this.investimentos.taxa / 100);

    this.brutoStr = this.bruto.toFixed(2);


    if (this.id_invest === '2') {

      this.ir = this.bruto * this.ir180
      this.irStr = this.ir.toFixed(2);

      this.liquido = this.bruto - this.ir;

      this.liquidoStr = this.liquido.toFixed(2)
    }


    if (this.id_invest === '3') {

      this.ir = this.bruto * this.ir181_360
      this.irStr = this.ir.toFixed(2);

      this.liquido = this.bruto - this.ir;

      this.liquidoStr = this.liquido.toFixed(2)
    }


    if (this.id_invest === '4') {

      this.ir = this.bruto * this.ir361_720
      this.irStr = this.ir.toFixed(2);

      this.liquido = this.bruto - this.ir;

      this.liquidoStr = this.liquido.toFixed(2)
    }


    if (this.id_invest === '5') {

      this.ir = this.bruto * this.ir721
      this.irStr = this.ir.toFixed(2);

      this.liquido = this.bruto - this.ir;

      this.liquidoStr = this.liquido.toFixed(2)
    }


  }








  limpar(): void {

    this.investimentos.nome = ""

    this.id_invest = ""

    this.investimentos.taxa = 0

    this.bruto = 0

    this.valor = 0

    this.brutoStr = ""

    this.irStr = ""

    this.liquidoStr = ""

    this.tipo_name = ""
  }







  radioChangeHandler(event: any) {
    this.investimento_id = event.target.value;


    if (this.investimento_id === 'Resgate 0') {
      this.id_invest = '2'
    }

    if (this.investimento_id === '6M + 1') {
      this.id_invest = '3'
    }

    if (this.investimento_id === '12M + 1') {
      this.id_invest = '4'
    }

    if (this.investimento_id === '24M + 1') {
      this.id_invest = '5'
    }

    this.findInvestimentoById(this.id_invest);
  }




  voltar(): void {
    this.router.navigate([`contas/${this.id_user}/${this.id_conta}/selected`])
  }



  getValidate() {

    if (this.valor >= 1000 && this.valorValid.valid) {
      return false
    } else {
      return 'minimo R$ 1000,00'
    }
  }


}

