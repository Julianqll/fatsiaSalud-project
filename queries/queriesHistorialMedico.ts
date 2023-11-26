import { gql } from '@apollo/client';

export const GET_HISTORIAL_MEDICO = gql`
query GetHistorialMedico {
    Historial_Medico {
      EntradasDeConsulta
      IDpaciente
      IdHistorial
    }
  }  
`;

export const INSERT_HISTORIAL_MEDICO = gql`
mutation InsertHistorialMedico($object: Historial_Medico_insert_input = {}) {
    insert_Historial_Medico_one(object: $object) {
      IdHistorial
    }
  }
`;
