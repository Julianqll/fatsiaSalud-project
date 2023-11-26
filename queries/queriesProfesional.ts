import { gql } from '@apollo/client';

export const SELECT_PROFESIONAL = gql`
query SelectProfesional {
  Profesional {
    Email
    Especialidad
    IdProfesional
    Nombre
    Telefono
    password
  }
}
`;

export const INSERT_PROFESIONAL = gql`
mutation InsertProfesional($object: Profesional_insert_input = {}) {
  insert_Profesional_one(object: $object) {
    IdProfesional
  }
}
`;