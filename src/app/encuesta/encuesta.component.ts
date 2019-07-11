import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Encuesta } from '../models/encuesta';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  encuesta: Encuesta = {
    idTurno : '',
    puntajeEspecialista: 0,
    puntajeClinica: 0,
    review : ''
  };
  onFinishReview(){

  }
  ngOnInit() {
    const idturno = this.route.snapshot.params['id'];
  }

}
