import React, { useState } from "react";
import { DocumentNode, useQuery } from "@apollo/client";
import { Combobox, InputBase, Input, useCombobox, Text } from "@mantine/core";
import { GET_MOTIVO } from "../../queries/queriesMotivo";

interface SelectorProps {
  type: string;
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
}

const Selector: React.FC<SelectorProps> = ({ type, value, setValue }) => {
  const [selectedOption, setSelectedOption] = useState({ id: null, text: '' });
  let nombre_selector;
  let query_type : DocumentNode;
  let onOptionSubmit;

  if (type === "motivo")
  {
    query_type = GET_MOTIVO;
    nombre_selector = "Motivo";
  }

  const { data, loading, error } = useQuery(query_type!);
  
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  let options = [];

  if (type === "motivo")
  {
    options = data && data.Motivo ? data.Motivo.map((item: any) => (
      <Combobox.Option value={item.IdMotivo} key={item.IdMotivo}>
        {item.MotivoDescrip}
      </Combobox.Option>
    )) : [];  

    onOptionSubmit = (val:any) => {
      const selectedText = data.Motivo.find((item: { IdMotivo: any; }) => item.IdMotivo === val)?.MotivoDescrip;
      setSelectedOption({ id: val, text: selectedText || '' });
      setValue(val);
      combobox.closeDropdown();
    };
  }


  return (
    <div>
      <Text>{nombre_selector}</Text>
      <Combobox
        width="md"
        store={combobox}
        onOptionSubmit={onOptionSubmit}
      >
      <Combobox.Target>
        <InputBase
          component="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
        >
          {selectedOption.text || <Input.Placeholder>Seleccione</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

export default Selector;
