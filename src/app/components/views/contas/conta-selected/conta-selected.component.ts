import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../users/user.model';
import { UserService } from '../../users/user.service';
import { ContasService } from '../contas.service';


@Component({
  selector: 'app-conta-selected',
  templateUrl: './conta-selected.component.html',
  styleUrls: ['./conta-selected.component.css']
})


export class ContaSelectedComponent implements OnInit {



  id_user: String = ""
  id_conta: String = ""
  contaId: String = ""
  contaNumero: String = ''
  contaTipo: String = ''
  contaSaldo: String = ''



  user: User = {
    id: '',
    name: '',
    login: '',
    password: ''
  }




  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contaservice: ContasService,
    private userservice: UserService,
  ) { }




  ngOnInit(): void {
    this.id_user = this.route.snapshot.paramMap.get('id_user')!
    this.id_conta = this.route.snapshot.paramMap.get('id_conta')!
    this.findUserById();
    this.findContaSelected();
  }



  findUserById(): void {
    this.userservice.findById(this.id_user!).subscribe((resposta) => {
      this.user.name = ` User :  ${resposta.name}`;
    })
  }



  findContaSelected() {
    this.contaservice.findById(this.id_conta).subscribe(resposta => {
      this.contaId = resposta.id!
      this.contaNumero = `Nº : ${resposta.numero}`
      this.contaTipo = ` Tipo : ${resposta.tipo}`
      this.contaSaldo = ` Saldo R$ ${resposta.saldo.toFixed(2)}`
     })
  }



  readMovimentacao(id_user: String, id_conta: String): void {
    this.router.navigate([`contas/${id_user}/${id_conta}/movimentacao`]);
  }

  lancarMovimentacao(id_user: String, id_conta: String): void {
    this.router.navigate([`contas/${id_user}/${id_conta}/movimentacao/create`]);
  }

  selecionarConta() {
    this.router.navigate([`contas/${this.id_user}`]);
  }

  simularInvestimentos(id_user: String, id_conta: String) {
    this.router.navigate([`investimentos/simular/${id_user}/${id_conta}`]);
  }




}
