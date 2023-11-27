"use client";
import React, { useEffect, useState } from "react";
import { Button, Flex} from "@mantine/core";
import { useMutation } from "@apollo/client";
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import InputFields from "../InputFields/InputFields";
import Selector from "../Selector/Selector";
import { useSession } from "next-auth/react";
import { client } from "../../apolloClient";
import { INSERT_PRESCRIPCION } from "../../queries/queriesPrescripcion";
import { useRouter } from "next/navigation";

function FormularioRegistroPrescripcion() {
  const {data : session} = useSession();
  const router = useRouter();

    const [valueMedicamento, setValueMedicamento] = useState('');
    const [valueDosis, setValueDosis] = useState('');
    const [valueFrecuencia, setValueFrecuencia] = useState('');
    const [valueDuracion, setValueDuracion] = useState('');
    const [valuePaciente, setValuePaciente] = useState<string | null>('');
    const [valueFecha, setValueFecha] = useState<Date | null>(new Date());
  

  const handleRegister = async () => {
    if (!valueMedicamento || !valueDosis || !valueFrecuencia || !valueDuracion || !valuePaciente || !valueFecha) {
        notifications.show({
            color: 'red',
            title: 'Completar campos',
            message: 'Por favor completa todos los campos',
            icon: <IconX size="1rem" />,
            autoClose: false
          });
    }
         else {

            const prescripcion = {
              Fecha: valueFecha,
              Medicamento: valueMedicamento,
              Dosis: valueDosis,
              Frecuencia: valueFrecuencia,
              Duracion: valueDuracion,
              IdProfesional: session?.user.id,
              IdPaciente: valuePaciente,
            };
        
            const { data } = await client.mutate({
              mutation: INSERT_PRESCRIPCION,
              variables: { object: prescripcion}
            });
            if (data) {
              notifications.show({
                color: 'green',
                title: 'Prescripción Registrada',
                message: <>
                La prescripcion se registró con éxito
                </>,
                icon: <IconCheck size="1rem" />,
                autoClose: false
              });
            } else {
                notifications.show({
                    color: 'red',
                    title: 'Error en el registro',
                    message: 'Hubo un error registrando la prescripcion',
                    icon: <IconX size="1rem" />,
                    autoClose: false
                  });
            }    
        }
  };

  return (
    <div>
      <Flex direction="column" align="center" style={{ gap: "20px" }}>
        <InputFields 
          values={{ valueMedicamento ,valueDosis ,valueFrecuencia ,valueDuracion ,valueFecha}}
          setters={{ setValueMedicamento ,setValueDosis ,setValueFrecuencia ,setValueDuracion ,setValueFecha}}
        />
        <Selector type="paciente" value={valuePaciente} setValue={setValuePaciente} />
        <Button onClick={() => router.push(`/prescripciones`)}>Volver</Button>
        <Button onClick={handleRegister}>Registrar prescripción</Button>
      </Flex>
    </div>
  );

}

export default FormularioRegistroPrescripcion;
