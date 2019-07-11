export interface Roles {
  alumno?: boolean;
  profesor?: boolean;
  admin?: boolean;
}

export interface UserInterface {
  id?: string;
  email?: string;
  clave?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  foto?: any;
  roles: Roles;
}
