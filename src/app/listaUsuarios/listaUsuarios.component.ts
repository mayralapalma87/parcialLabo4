import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../models/user';
import { DataApiService } from '../services/data-api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-listaUsuarios',
  templateUrl: './listaUsuarios.component.html',
  styleUrls: ['./listaUsuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  public usuarios: UserInterface[];
  public isAdmin: any = null;
  public userId: string = null;
  public arrayDeUsuariosOriginalParaFiltrar: UserInterface[] = [];
  public usuariosModal: UserInterface[] = [];
  ngOnInit() {
    this.getUsuarios();
    this.getCurrentUser();
  }
  getUsuarios() {
    this.dataApi.getUsers().subscribe( usuarios => {
      this.usuarios = usuarios;
      this.arrayDeUsuariosOriginalParaFiltrar = usuarios;
    });
  }
  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userId = auth.uid;
        this.authService.isUserAdmin(this.userId).subscribe(userRole => {
          this.isAdmin = userRole.roles.admin;
        });
      }
    });
  }

  cancelarUsuario(idUser: string) {
    const confirmacion = confirm('Esta seguro que desea cancelar este usuario?');
    if (confirmacion) {
      this.dataApi.borrarTurno(idUser);
    }
  }
  modificarUsuario(user: UserInterface) {
    this.dataApi.selectedUser = Object.assign({}, user);
  }
  //Metodos de busqueda:
  mostrarDatos(Usuarios) {
    console.log(Usuarios);
    this.usuariosModal = Usuarios;
  }
  public reiniciar() {
    this.usuarios = [];
  }

  seBorro(id: any) {
    this.usuarios = this.usuarios.filter( usuario => usuario.id !== id);
  }
}
