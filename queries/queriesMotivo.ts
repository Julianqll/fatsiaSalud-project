import { gql } from "@apollo/client";

export const GET_MOTIVO = gql`
query GetMotivo {
    Motivo {
      IdMotivo
          MotivoDescrip
    }
  }
`;
