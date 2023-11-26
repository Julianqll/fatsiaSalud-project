import { gql } from '@apollo/client';

export const SELECT_TRATAMIENTO= gql`
query GetTratamiento {
    Tratamiento {
      Descripcion
      Fecha
      IDPaciente
      IDProfesional
      IdTratamiento
      Observaciones
      Resultados
    }
}
`;

export const INSERT_TRATAMIENTO = gql`
    mutation InsertTratamiento($object: Tratamiento_insert_input = {}) {
        insert_Tratamiento_one(object: $object) {
        IdTratamiento
        }
    }
`;