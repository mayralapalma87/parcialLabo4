import { UserInterface } from './../models/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {

  constructor() { }
  @Input() usuarios: UserInterface[];
  usuariosMostrar : any;
  ngOnInit() {
    this.usuariosMostrar = this.usuarios;
  }

}
