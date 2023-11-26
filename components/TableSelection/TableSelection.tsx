import cx from 'clsx';
import { useState } from 'react';
import { Table, Checkbox, ScrollArea, Group, Avatar, Text, rem, Button } from '@mantine/core';
import classes from './TableSelection.module.css';
import { IconFileInfo } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';


export function TableSelection({
  type,
  data
}: any) {
  let rows = [];
  let headers: any[] = [];
  const router = useRouter();

  if (type === 'citas_medico_more')
  {
    headers = ["ID","Motivo", "Fecha", "Hora","Paciente", "Estado", "Detalles"];
     rows = data?.CitaMedica.map((item:any) => {
      return (
        <Table.Tr key={item.IDCita}>
          <Table.Td>
            <Group gap="sm">
              <Text size="sm" fw={500}>
                {item.IDCita}
              </Text>
            </Group>
          </Table.Td>
          <Table.Td>{item.motivoByMotivo.MotivoDescrip}</Table.Td>
          <Table.Td>{item.Fecha}</Table.Td>
          <Table.Td>{item.Hora}</Table.Td>
          <Table.Td>{item.Paciente.Nombres} {item.Paciente.Apellidos}</Table.Td>
          <Table.Td>{item.TipoEstadoCitum.DescripEstadoCita}</Table.Td>
          <Table.Td>
          <Button 
              ml={15} 
              rightSection={<IconFileInfo size={14} />} 
              >
                Ver más
            </Button>
          </Table.Td>
        </Table.Tr>
      );
    });
  }
  else if (type === 'citas_medico')
  {
    headers = ["ID","Motivo", "Fecha", "Hora", "Estado"];
     rows = data?.CitaMedica.map((item:any) => {
      return (
        <Table.Tr key={item.IDCita}>
          <Table.Td>
            <Group gap="sm">
              <Text size="sm" fw={500}>
                {item.IDCita}
              </Text>
            </Group>
          </Table.Td>
          <Table.Td>{item.motivoByMotivo.MotivoDescrip}</Table.Td>
          <Table.Td>{item.Fecha}</Table.Td>
          <Table.Td>{item.Hora}</Table.Td>
          <Table.Td>{item.TipoEstadoCitum.DescripEstadoCita}</Table.Td>
        </Table.Tr>
      );
    });
  }
  else if (type === 'citas_paciente')
  {
    headers = ["ID","Motivo", "Fecha", "Hora", "Médico", "Estado", "Detalles"];
     rows = data?.CitaMedica.map((item:any) => {
      return (
        <Table.Tr key={item.IDCita}>
          <Table.Td>
            <Group gap="sm">
              <Text size="sm" fw={500}>
                {item.IDCita}
              </Text>
            </Group>
          </Table.Td>
          <Table.Td>{item.motivoByMotivo.MotivoDescrip}</Table.Td>
          <Table.Td>{item.Fecha}</Table.Td>
          <Table.Td>{item.Hora}</Table.Td>
          <Table.Td>{item.Profesional.Nombres} {item.Profesional.Apellidos}</Table.Td>
          <Table.Td>{item.TipoEstadoCitum.DescripEstadoCita}</Table.Td>
          <Table.Td>
          <Button 
              ml={15} 
              rightSection={<IconFileInfo size={14} />} 
              >
                Ver más
            </Button>
          </Table.Td>
        </Table.Tr>
      );
    });
  }
  else if (type === 'prescripciones_paciente')
  {
    headers = ["ID","Medicamento", "Dosis", "Frecuencia","Fecha asignada", "Duracion", "Detalles"];
     rows = data?.Prescripcion.map((item:any) => {
      return (
        <Table.Tr key={item.IdPrescripcion}>
          <Table.Td>
            <Group gap="sm">
              <Text size="sm" fw={500}>
                {item.IdPrescripcion}
              </Text>
            </Group>
          </Table.Td>
          <Table.Td>{item.Medicamento}</Table.Td>
          <Table.Td>{item.Dosis}</Table.Td>
          <Table.Td>{item.Frecuencia}</Table.Td>
          <Table.Td>{item.Fecha}</Table.Td>
          <Table.Td>{item.Duracion}</Table.Td>
          <Table.Td>
          <Button 
              ml={15} 
              rightSection={<IconFileInfo size={14} />} 
              >
                Ver más
            </Button>
          </Table.Td>
        </Table.Tr>
      );
    });
  }
  if (type === 'prescripciones_medico')
  {
    headers = ["ID","Medicamento", "Dosis", "Frecuencia","Fecha asignada", "Duracion", "Paciente", "Detalles"];
     rows = data?.Prescripcion.map((item:any) => {
      return (
        <Table.Tr key={item.IdPrescripcion}>
          <Table.Td>
            <Group gap="sm">
              <Text size="sm" fw={500}>
                {item.IdPrescripcion}
              </Text>
            </Group>
          </Table.Td>
          <Table.Td>{item.Medicamento}</Table.Td>
          <Table.Td>{item.Dosis}</Table.Td>
          <Table.Td>{item.Frecuencia}</Table.Td>
          <Table.Td>{item.Fecha}</Table.Td>
          <Table.Td>{item.Duracion}</Table.Td>
          <Table.Td>{item.Paciente.Nombres} {item.Paciente.Apellidos}</Table.Td>
          <Table.Td>
          <Button 
              ml={15} 
              rightSection={<IconFileInfo size={14} />} 
              >
                Ver más
            </Button>
          </Table.Td>
        </Table.Tr>
      );
    });
  }

  let theaders = headers.map((item:any) => {
    return (
        <Table.Th>{item}</Table.Th>
    );
  });
  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            {theaders}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}