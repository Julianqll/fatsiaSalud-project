import { useState } from 'react';
import { Stepper, Button, Group, Textarea, Flex } from '@mantine/core';
import FormularioDirectivas from '../FormularioDirectivas/FormularioDirectivas';
import { useQuery } from '@apollo/client';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import Selector from '../Selector/Selector';
import { DateInput, TimeInput } from '@mantine/dates';

function StepperDirectivas() { 
  const [active, setActive] = useState(0);
  const [valueMotivo, setValueMotivo] = useState<string | null>(null);
  const [valueHora, setValueHora] = useState("");
  const [valueFecha, setValueFecha] = useState<Date|null>(new Date());
  const [arrayForms, setArrayForms] = useState<any>([]);

  const addFormDirectiva = () => {
    let formDirectiva = {
        fechaDirectiva:valueFecha,
        idAsignacionAvion:1,
        idEstadoDir:1,
    }
    setArrayForms((prevForms: any) => [...prevForms, formDirectiva]);
  };
  const nextStep = () => {
    if (active < 3) {
      addFormDirectiva();
      setActive(current => current + 1);
    }
  };

  const prevStep = () => {
    if (active > 0) {
      setArrayForms((prevForms: any) => prevForms.slice(0, -1));
      setActive(current => current - 1);
    }
  };

  const handleRegister = async () => {
    console.log(arrayForms);
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

        const directiva = {
            //nombreTipoDirectiva: valueNombreDirectiva,
            //descripTipoDirectiva: valueDescripcionDirectiva,
        };
    
        try {
            notifications.show({
            color: 'green',
            title: 'Tipo Directiva Registrada',
            message: <>
            </>,
            icon: <IconCheck size="1rem" />,
            autoClose: false
            });
        } catch (error) {
            console.log(error);
            notifications.show({
                color: 'red',
                title: 'Error en el registro',
                message: 'Hubo un error registrando la directiva',
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
              description="Input description"
              placeholder="Añada una descripción más de su caso"
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
