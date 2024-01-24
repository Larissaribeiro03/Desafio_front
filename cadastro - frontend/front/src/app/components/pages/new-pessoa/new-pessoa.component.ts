import { PessoasService } from './../../../services/pessoas.service';
import { Pessoa } from 'src/app/Pessoa';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDadosPessoas } from './../../../services/pessoas.service';
import { MessagesService } from 'src/app/services/messages.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-new-pessoa',
  templateUrl: './new-pessoa.component.html',
  styleUrls: ['./new-pessoa.component.css']
})
export class NewPessoaComponent implements OnInit{
  btnText = 'Cadastrar!';

  constructor(private pessoasService: PessoasService,
              private messagesService: MessagesService,
              private router: Router
              ){}

  ngOnInit(): void {

  }

  createHandler(pessoa: Pessoa) {
    console.log("ok");

    const novaPessoa: IDadosPessoas = {
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      sexo: pessoa.sexo,
      email: pessoa.email,
      celular: pessoa.celular
    };

    this.pessoasService.gravarPessoa(novaPessoa).subscribe(
      (response) => {
        console.log('Pessoa gravada com sucesso:', response);
        this.messagesService.add('Pessoa cadastrada com sucesso!');
      },
      (error) => {
        console.error('Erro ao gravar pessoa:', error);
        this.messagesService.add('Erro ao cadastrar pessoa! Verifique dados informados.');
      }
    );

  }

}


