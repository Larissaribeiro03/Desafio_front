import { Component, OnInit } from '@angular/core';
import { PessoasService } from 'src/app/services/pessoas.service';
import { IDadosPessoas } from 'src/app/services/pessoas.service';
import { Pessoa } from 'src/app/Pessoa';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit{
  faTimes = faTimes;
  pessoas: IDadosPessoas[] = [];

  cpf: string = '';
  pessoa: IDadosPessoas | null = null;
  erro: string | null = null;


  constructor(private readonly pessoasService: PessoasService, public readonly messagesService: MessagesService){}

  ngOnInit(): void {
      this.pessoasService.get().subscribe({
        next: (dadosPessoas: IDadosPessoas[]) => {
          this.pessoas = dadosPessoas;
          if (dadosPessoas.length === 0) {
            this.messagesService.cpfNotFound = 'CPF não encontrado.';
          } else {
            this.messagesService.cpfNotFound = null;
          }
          this.messagesService.clear();
        }
      });
  }

  buscarPorCpf(cpf: string): void {
    this.pessoa = null;
    this.pessoasService.getByCpf(cpf).subscribe({
      next: (pessoa: IDadosPessoas | null) => {
        if (pessoa) {
          this.pessoa = pessoa;
          this.messagesService.clear();
        }
      }
    });
  }

}
