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
mutation Insertarcita($object: CitaMedica_insert_input = {}) {
  insert_CitaMedica_one(object: $object) {
    IDCita
    Hora
    Fecha
  }
}
`;

export const CITA_MEDICO = gql`
query CitaXMedico($_eq: Int) {
  CitaMedica(where: {Profesional: {IdProfesional: {_eq: $_eq}}}) {
    Fecha
    Hora
    IDCita
    TipoEstadoCitum {
      DescripEstadoCita
    }
    motivoByMotivo {
      MotivoDescrip
    }
  }
}

`;

export const CITA_MEDICO_MORE = gql`
query CitaXMedicoMore($_eq: Int) {
  CitaMedica(where: {Profesional: {IdProfesional: {_eq: $_eq}}}) {
    Fecha
    Hora
    IDCita
    TipoEstadoCitum {
      DescripEstadoCita
    }
    motivoByMotivo {
      MotivoDescrip
    }
    Paciente {
      Nombres
      Apellidos
    }
  }
}

`;

export const CITA_PACIENTE = gql`
query CitaXPaciente($_eq: Int) {
  CitaMedica(where: {Paciente: {IDPaciente: {_eq: $_eq}}}) {
    Fecha
    Hora
    IDCita
    TipoEstadoCitum {
      DescripEstadoCita
    }
    motivoByMotivo {
      MotivoDescrip
    }
    Profesional {
      Nombres
      Apellidos
    }
  }
}


`;


