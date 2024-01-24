import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Pessoa } from '../Pessoa';
import { Response } from '../Response';

import { tap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { MessagesService } from './messages.service';



@Injectable({
    providedIn: 'root'
})

export class PessoasService {

  private apiUrl = 'api/pessoas/inserir'
  private pessoaSubject = new BehaviorSubject<IDadosPessoas[]>([]);
  private listaPessoas: IDadosPessoas[] = [];

    constructor(
        private readonly http: HttpClient,
        private readonly messagesService: MessagesService
    ) { }

    get(): Observable<IDadosPessoas[]> {
      return this.pessoaSubject.asObservable();
    }

    gravarPessoa(pessoa: IDadosPessoas): Observable<IDadosPessoas> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return this.http.post<IDadosPessoas>(this.apiUrl, pessoa, { headers })
        .pipe(
          tap(() => this.atualizarListaPessoas())
        );
    }

    private atualizarListaPessoas() {
      if (!this.listaPessoas) {
        this.listaPessoas = [];
      }

      this.http.get<IDadosPessoas[]>('/api/pessoas/')
        .subscribe({
          next: (dadosPessoas: IDadosPessoas[]) => {
            this.listaPessoas = dadosPessoas;
            this.pessoaSubject.next(this.listaPessoas);
          }
        });
    }

    getByCpf(cpf: string): Observable<IDadosPessoas | null> {
      return this.http.get<IDadosPessoas | null>(`/api/pessoas/buscarPorCpf/${cpf}`)
          .pipe(
              catchError(() => {
                  this.messagesService.add('CPF não encontrado', true);
                  return of(null);
              })
          );
  }

}

export interface IDadosPessoas {
    nome: string;
    cpf: string;
    sexo: string;
    email: string;
    celular: string;
}
