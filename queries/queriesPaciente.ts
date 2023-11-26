import { gql } from '@apollo/client';

export const SELECT_PACIENTE = gql`
query SelectPaciente {
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

export const INSERT_PACIENTE = gql`
mutation InsertPaciente($object: Paciente_insert_input = {}) {
    insert_Paciente_one(object: $object) {
      IDPaciente
    }
  }
`;

