import { gql } from '@apollo/client';

export const SELECT_PACIENTE = gql`
query GetPaciente {
  Paciente {
    FechaNac
		IDPaciente
		Telefono
		UsuarioId
		Alergias
		Apellidos
		DNI
		Direccion
		Nombres
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

