import { gql } from '@apollo/client';

export const SIGN_IN = gql`
query SignInUser($_eq: String) {
    Usuario(where: {Correo: {_eq: $_eq}}) {
      Correo
      TipoUsuario
      Pacientes {
        IDPaciente
        Nombres
        Apellidos
      }
      Profesionals {
        IdProfesional
        Nombres
        Apellidos
      }
      Contrasena
    }
  }
  
`;