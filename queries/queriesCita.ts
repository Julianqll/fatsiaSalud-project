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
