import { InscripcionInterface } from './../models/inscripcionInterface';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { turnoInteface } from '../models/turnoInterface';
import { UserInterface } from '../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modalNuevaInscripcion',
  templateUrl: './modalNuevaInscripcion.component.html',
  styleUrls: ['./modalNuevaInscripcion.component.css']
})
export class ModalNuevaInscripcionComponent implements OnInit {
  constructor(public dataApi: DataApiService) {
  }

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userId: string;
  @Input() cliente: string;

  public inscripcion: InscripcionInterface;
  public usuarios: UserInterface[];
  public turnos: turnoInteface[];
  public turno: turnoInteface;

  ngOnInit() {
    this.getTurnos();
  }
  getTurnos() {
    this.dataApi.getTurnos().subscribe( turnos => {
      this.turnos = turnos;
    });
  }

  onSaveInscripcion(inscripcionForm: NgForm): void {
    this.inscripcion = inscripcionForm.value;
    this.inscripcion.userId = this.userId;
    this.inscripcion.estado = 'Inscripto';
    if (inscripcionForm.value.id == null) {
      // New
      this.dataApi.agregarInscripcion(this.inscripcion);
    } else {
      // Update
      this.dataApi.modificarInscripcion(this.inscripcion);
    }
    this.inscripcion = null;
    inscripcionForm.resetForm();
    this.btnClose.nativeElement.click();
  }
  setMateriaValues(materia){
    this.dataApi.selectedInscripcion.profesor = materia;
  }

}
