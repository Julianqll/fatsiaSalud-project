import { gql } from '@apollo/client';

export const SELECT_PRESCRIPCION = gql`
query SelectPrescripcion {
    Historial_Medico {
      EntradasDeConsulta
      IDpaciente
      IdHistorial
    }
  }
`;

export const INSERT_PRESCRIPCION = gql`
mutation InsertPrescripcion($object: Prescripcion_insert_input = {}) {
    insert_Prescripcion_one(object: $object) {
      IdPrescripcion
    }
  }
`;


export const PRESCRIPCIONES_PACIENTE= gql`
query prespaciente($_eq: Int) {
  Prescripcion(where: {Paciente: {IDPaciente: {_eq: $_eq}}}) {
    Dosis
    Duracion
    Fecha
    Frecuencia
    IdPrescripcion
    Medicamento
  }
}
`;

export const PRESCRIPCIONES_MEDICO= gql`
query presprof($_eq: Int) {
  Prescripcion(where: {Profesional: {IdProfesional: {_eq: $_eq}}}) {
    Dosis
    Duracion
    Fecha
    Frecuencia
    IdPrescripcion
    Medicamento
    Paciente {
      Nombres
      Apellidos
    }
  }
}

`;
