import { useState } from 'react';
import { Stepper, Button, Group, Textarea, Flex } from '@mantine/core';
import FormularioDirectivas from '../FormularioDirectivas/FormularioDirectivas';
import { useQuery } from '@apollo/client';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import Selector from '../Selector/Selector';
import { DateInput, TimeInput } from '@mantine/dates';
import { useSession } from 'next-auth/react';
import { client } from '../../apolloClient';
import { INSERT_CITA } from '../../queries/queriesCita';

function StepperDirectivas({value, setValue} : any) { 
  const [active, setActive] = useState(0);
  const [valueMotivo, setValueMotivo] = useState<string | null>(null);
  const [valueHora, setValueHora] = useState("");
  const [valueDescripcion, setValueDescripcion] = useState("");
  const [valueFecha, setValueFecha] = useState<Date|null>(new Date());
  const [arrayForms, setArrayForms] = useState<any>([]);
  const {data : session} = useSession();


  const nextStep = () => {
    if (active < 3) {
      setActive(current => current + 1);
    }
  };

  const prevStep = () => {
    if (active > 0) {
      setActive(current => current - 1);
    }
  };

  const handleRegister = async () => {
    if (!valueMotivo || !valueFecha || !valueHora) {
        notifications.show({
            color: 'red',
            title: 'Completar todos los campos',
            message: 'Por favor completa todos los campos',
            icon: <IconX size="1rem" />,
            autoClose: false
          });
    }
        else {
          console.log(session?.user.id);

        const cita = {
          Fecha : valueFecha,
          EstadoCita : 1,
          IDPaciente: session?.user.id,
          Motivo: valueMotivo,
          Descripcion: valueDescripcion,
          Hora: valueHora,
          IDProfesional: 1,
        };
        console.log(session?.user.id);
    
        const { data } = await client.mutate({
          mutation: INSERT_CITA,
          variables: { object: cita}
        });
        if (data) {
          setValue(false);
            notifications.show({
            color: 'green',
            title: 'Cita agendada',
            message: <>
            Su cita ha sido agendada con exito
            </>,
            icon: <IconCheck size="1rem" />,
            autoClose: false
            });
        } else {
            notifications.show({
                color: 'red',
                title: 'Error en el agendado',
                message: 'Hubo un error agendando la cita',
                icon: <IconX size="1rem" />,
                autoClose: false
                });
        }    
    }
  };

  return (
    <>
      <Stepper active={active} onStepClick={setActive} mb={50}>
        <Stepper.Step label="Motivo" description="Coloque su motivo">
        <Flex
            gap={100}
            mt={50}
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
        >
          <Selector
            type="motivo"
            value={valueMotivo}
            setValue={setValueMotivo}
          ></Selector>
            <Textarea
              label="Descripción"
              description="Describa su caso"
              placeholder="Añada una descripción más de su caso"
              value={valueDescripcion}
              onChange={(event) => setValueDescripcion(event.currentTarget.value)}
            />
        </Flex>
        </Stepper.Step>
        <Stepper.Step label="Fecha" description="Coloque la fecha">
        <Flex
            gap={100}
            mt={50}
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
        >
          <DateInput
            description="Seleccione la fecha más adecuada para su cita"
            value={valueFecha}
            onChange={setValueFecha}
            label="Fecha de la cita"
            placeholder="Seleccione la fecha"
          />
        </Flex>

        </Stepper.Step>
        <Stepper.Step label="Hora" description="Coloque la hora">
        <Flex
            gap={100}
            mt={50}
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
        >
            <TimeInput
              variant="filled"
              label="Hora de la cita"
              value={valueHora}
              onChange={(event) => setValueHora(event.currentTarget.value)}
              description="Seleccione la hora más adecuada para su cita"
              placeholder="Seleccione la hora"
            />
        </Flex>
        </Stepper.Step>
        <Stepper.Completed>
          <Flex
            gap={20}
            mt={50}
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
        >
            Se completaron todos los campos necesarios, para confirmar la cita debe dar clic en agendar
            <Button onClick={handleRegister}>Agendar</Button>
        </Flex>

        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl" mb={50}>
        <Button variant="default" onClick={prevStep}>Atrás</Button>
        {active == 3 ? 
        null
        :
         <Button onClick={nextStep}>Siguiente</Button>
        }
      </Group>
    </>
  );
}

export default StepperDirectivas;
