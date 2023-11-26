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

  if (type === 'citas_medico')
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
          <Table.Td>{item.Motivo}</Table.Td>
          <Table.Td>{item.Fecha}</Table.Td>
          <Table.Td>{item.Hora}</Table.Td>
          <Table.Td>{item.TipoEstadoCitum.DescripEstadoCita}</Table.Td>
        </Table.Tr>
      );
    });
  }
  else if (type === 'formularios')
  {
    headers = ["Tipo Formulario","Nombre", "Id Avion", "Ver más"];
    rows = data.formulario!.map((item:any) => {
      return (
        <Table.Tr key={item.idFormulario}>
          <Table.Td>
            <Group gap="sm">
              <Avatar size={26} radius={26} />
              <Text size="sm" fw={500}>
                {item.tipoFormulario.tipoFormulario}
              </Text>
            </Group>
          </Table.Td>
          <Table.Td>{item.nombre}</Table.Td>
          <Table.Td>{item.idAvion}</Table.Td>
          <Table.Td>
          <Button 
              ml={15} 
              rightSection={<IconFileInfo size={14} />} 
              onClick={() => router.push(`/formulario/${item.idFormulario}`)}
              >
                Ver más
            </Button>
          </Table.Td>
        </Table.Tr>
      );
    });
  }
  else if (type === 'formularios_por_tecnico')
  {
    headers = ["Tipo Formulario","Nombre", "Id Avion", "Ver más"];
    rows = data.formulario?.map((item:any) => {
      return (
        <Table.Tr key={item.idFormulario}>
          <Table.Td>
            <Group gap="sm">
              <Avatar size={26} radius={26} />
              <Text size="sm" fw={500}>
                {item.tipoFormulario.tipoFormulario}
              </Text>
            </Group>
          </Table.Td>
          <Table.Td>{item.nombre}</Table.Td>
          <Table.Td>{item.idAvion}</Table.Td>
          <Table.Td>
          <Button 
              ml={15} 
              rightSection={<IconFileInfo size={14} />} 
              onClick={() => router.push(`/formulario/${item.idFormulario}`)}
              >
                Ver más
            </Button>
          </Table.Td>
        </Table.Tr>
      );
    });
  }
  else if(type === "formularios_avion")
  {
    headers = ["Tipo Formulario","Nombre", "Id Avion", "Fecha"];
    rows = data?.formulario?.map((item:any) => {
      return (
        <Table.Tr key={item.idFormulario}>
          <Table.Td>
            <Group gap="sm">
              <Avatar size={26} radius={26} />
              <Text size="sm" fw={500}>
                {item.tipoFormulario.tipoFormulario}
              </Text>
            </Group>
          </Table.Td>
          <Table.Td>{item.nombre}</Table.Td>
          <Table.Td>{item.idAvion}</Table.Td>
          <Table.Td>
          <Button 
              ml={15} 
              rightSection={<IconFileInfo size={14} />} 
              onClick={() => router.push(`/formulario/${item.idFormulario}`)}
              >
                Ver más
            </Button>
          </Table.Td>
        </Table.Tr>
      );
    });
  }
  else if(type === "propeller")
  {
    headers = ["AD Directiva","Documento de Instruccion", "Documento de Referencia", "Fecha"];
    rows = data?.directiva?.map((item:any) => {
      return (
        <Table.Tr key={item.idDirectiva}>
          <Table.Td>
              <Text size="sm" fw={500}>
                {item.ad}
              </Text>
          </Table.Td>
          <Table.Td>{item.docInstruc}</Table.Td>
          <Table.Td>{item.documentoRef}</Table.Td>
          <Table.Td>{item.fechaDirectiva}</Table.Td>
        </Table.Tr>
      );
    });
  }

    else if(type === "propeller"||type === "engine"||type === "aircraft"||type === "magneto"||type === "appliance")
  {
    headers = ["AD Directiva","Documento de Instruccion", "Documento de Referencia", "Fecha"];
    rows = data?.directiva?.map((item:any) => {
      return (
        <Table.Tr key={item.idDirectiva}>
          <Table.Td>
              <Text size="sm" fw={500}>
                {item.ad}
              </Text>
          </Table.Td>
          <Table.Td>{item.docInstruc}</Table.Td>
          <Table.Td>{item.documentoRef}</Table.Td>
          <Table.Td>{item.fechaDirectiva}</Table.Td>
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