import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { NewPessoaComponent } from './components/pages/new-pessoa/new-pessoa.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pessoa/new', component: NewPessoaComponent},
  {path: 'about', component: AboutComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
