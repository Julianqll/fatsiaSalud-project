import { gql } from '@apollo/client';

export const GET_CITA = gql`
query GetCita {
    CitaMedica {
      Fecha
      Hora
      IDCita
      IDPaciente
      IDProfesional
      Motivo
    }
  }
`;

export const INSERT_CITA = gql`
mutation InsertCita($object: CitaMedica_insert_input = {}) {
    insert_CitaMedica_one(object: $object) {
      IDCita
    }
  }
`;

export const CITA_MEDICO = gql`
query CitaXMedico($_eq: Int) {
  CitaMedica(where: {Profesional: {IdProfesional: {_eq: $_eq}}}) {
    Fecha
    Hora
    Motivo
    IDCita
    TipoEstadoCitum {
      DescripEstadoCita
    }
  }
}
`;