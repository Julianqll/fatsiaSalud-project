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
