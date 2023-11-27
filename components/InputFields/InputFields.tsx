import React, { useEffect, useState } from "react";
import { TextInput, Flex } from "@mantine/core";
import Selector from "../Selector/Selector";
import { DateInput } from "@mantine/dates";

interface InputFieldsProps {
  values: {
    valueMedicamento: string ;
    valueDosis: string ;
    valueFrecuencia: string;
    valueDuracion: string;
    valueFecha: Date | null;
  };
  setters: {
    setValueMedicamento: React.Dispatch<React.SetStateAction<string>>;
    setValueDosis: React.Dispatch<React.SetStateAction<string>>;
    setValueFrecuencia: React.Dispatch<React.SetStateAction<string>>;
    setValueDuracion: React.Dispatch<React.SetStateAction<string>>;
    setValueFecha: React.Dispatch<React.SetStateAction<Date | null>>;
  };
}

const InputFields: React.FC<InputFieldsProps> = ({ values, setters }) => {


  return (
    <div>
      <Flex direction="column" align="center" style={{ gap: "20px" }}>
        <Flex mih={50} gap="xl" justify="center" align="flex-start" direction="row" wrap="wrap">
          <TextInput
            label="Medicamento"
            placeholder="Ingrese el medicamento"
            value={values.valueMedicamento}
            onChange={(event) => setters.setValueMedicamento(event.currentTarget.value)}
          />
          <TextInput
            label="Dosis"
            placeholder="Ingrese la dosis"
            value={values.valueDosis}
            onChange={(event) => setters.setValueDosis(event.currentTarget.value)}
          />
        </Flex>
        <Flex mih={50} gap="xl" justify="center" align="flex-start" direction="row" wrap="wrap">
          <TextInput
            label="Frecuencia"
            placeholder="Ingrese la frecuencia"
            value={values.valueFrecuencia}
            onChange={(event) => setters.setValueFrecuencia(event.currentTarget.value)}
          />
          <TextInput
            label="Duracion"
            placeholder="Ingrese la duración"
            value={values.valueDuracion}
            onChange={(event) => setters.setValueDuracion(event.currentTarget.value)}
          />
        </Flex>
        <Flex mih={50} gap="xl" justify="center" align="flex-start" direction="row" wrap="wrap">
          <DateInput
              description="Seleccione la fecha"
              value={values.valueFecha}
              onChange={setters.setValueFecha}
              label="Fecha de la prescripcion"
              placeholder="Seleccione la fecha"
            />
        </Flex>
      </Flex>
    </div>
  );
}

export default InputFields;
