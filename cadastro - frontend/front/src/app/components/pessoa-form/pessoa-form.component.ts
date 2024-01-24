import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { empty } from 'rxjs';
import {Pessoa} from 'src/app/Pessoa';
import { PessoasService } from 'src/app/services/pessoas.service';


@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit{
@Output() onSubmit = new EventEmitter<Pessoa>();
@Input() btnText!: string;

pessoaForm!: FormGroup

  constructor(private readonly pessoaService: PessoasService) {}

  ngOnInit(): void {
    this.pessoaForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required,  Validators.pattern('[0-9]{3}\\.?[0-9]{3}\\.?[0-9]{3}\\-?[0-9]{2}')]),
      sexo: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      celular: new FormControl('', [Validators.required]),
    });
  }

  get nome() {
    return this.pessoaForm.get('nome')!;
  }

  get cpf() {
    return this.pessoaForm.get('cpf')!;
  }

  get email() {
    return this.pessoaForm.get('email')!;
  }

  get celular() {
    return this.pessoaForm.get('celular')!;
  }

  submit(){
    console.log(this.pessoaForm.value);

    //if (this.pessoaForm.invalid) {
     // return;
    // }

    this.onSubmit.emit(this.pessoaForm.value);
    //this.pessoaForm.reset();

  }
}
