import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaCreateComponent } from './components/views/contas/conta-create/conta-create.component';
import { ContaReadComponent } from './components/views/contas/conta-read/conta-read.component';
import { ContaSelectedComponent } from './components/views/contas/conta-selected/conta-selected.component';

import { HomeComponent } from './components/views/home/home.component';
import { InvestimentosCreateComponent } from './components/views/investimentos/investimentos-create/investimentos-create.component';
import { InvestimentosDeleteComponent } from './components/views/investimentos/investimentos-delete/investimentos-delete.component';
import { InvestimentosReadComponent } from './components/views/investimentos/investimentos-read/investimentos-read.component';
import { InvestimentosSimuladorComponent } from './components/views/investimentos/investimentos-simulador/investimentos-simulador.component';
import { InvestimentosUpdateComponent } from './components/views/investimentos/investimentos-update/investimentos-update.component';
import { InvestimentosService } from './components/views/investimentos/investimentos.service';
import { MovimentacaoCreateComponent } from './components/views/movimentacao/movimentacao-create/movimentacao-create.component';
import { MovimentacaoReadComponent } from './components/views/movimentacao/movimentacao-read/movimentacao-read.component';
import { UserCreateComponent } from './components/views/users/user-create/user-create.component';
import { UserLoginComponent } from './components/views/users/user-login/user-login.component';
import { UserReadComponent } from './components/views/users/user-read/user-read.component';
import { UserUpdateComponent } from './components/views/users/user-update/user-update.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'users',
    component: UserReadComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'create',
    component: UserCreateComponent
  },
  {
    path:'users/update/:id',
    component: UserUpdateComponent
  },



  {
    path: 'contas/:id_user',
    component: ContaReadComponent
  },
  {
    path: 'contas/:id_user/:id_conta/selected',
    component: ContaSelectedComponent
  },
  {
    path: 'contas/:id_user/create',
    component: ContaCreateComponent
  },


  {
    path: 'contas/:id_user/:id_conta/movimentacao',
    component: MovimentacaoReadComponent
  },
  {
    path: 'contas/:id_user/:id_conta/movimentacao/create',
    component: MovimentacaoCreateComponent
  },


  {
    path: 'investimentos',
    component: InvestimentosReadComponent
  },
  {
    path: 'investimentos/simular/:id_user/:id_conta',
    component: InvestimentosSimuladorComponent
  },
  {
    path: 'investimentos/create',
    component: InvestimentosCreateComponent
  },
  {
    path: 'investimentos/delete/:id',
    component: InvestimentosDeleteComponent
  },
  {
    path: 'investimentos/update/:id',
    component: InvestimentosUpdateComponent
  }

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
