// Reportes.js
"use client";
import { Button, Text } from '@mantine/core';
import classes from './UserListView.module.css';
import { TableSelection } from '../TableSelection/TableSelection';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { IconFileInfo } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { CITA_MEDICO, CITA_MEDICO_MORE, CITA_PACIENTE } from '../../queries/queriesCita';
import { PRESCRIPCIONES_MEDICO, PRESCRIPCIONES_PACIENTE } from '../../queries/queriesPrescripcion';

export default function UserListView({type}: any) {
    const router = useRouter();

    const {data : session} = useSession();
    let query_type;
    let title;
    let variables = false;
    if (type === 'citas_medico')
    {       
        query_type = CITA_MEDICO;
        title = "Citas del mes";
        variables = true;
    }
    if (type === 'citas_medico_more')
    {       
        query_type = CITA_MEDICO_MORE;
        title = "Citas agendadas";
        variables = true;
    }
    else if (type === 'citas_paciente')
    {
        query_type = CITA_PACIENTE;
        title = "Citas agendadas";
        variables = true;
    }
    else if (type === 'prescripciones_paciente')
    {
        query_type = PRESCRIPCIONES_PACIENTE;
        title = "Mis prescripciones";
        variables = true;
    }
    else if (type === 'prescripciones_medico')
    {
        query_type = PRESCRIPCIONES_MEDICO;
        title = "Prescripciones asignadas";
        variables = true;
    }

    const { data, loading, error } = variables ?
    useQuery(query_type!, {
        variables: { _eq: session?.user.id},
    })
     : useQuery(query_type!);
    if (loading)
    {
        return (<div>Cargando contenido</div>)
    }
    console.log(session?.user.id);


    return (
        <div className={classes.container}>
            <div>
                <Text size="xl" className={classes.header}>{title}</Text>
                {type === "usuarios"?
                                <Button 
                                ml={15} 
                                rightSection={<IconFileInfo size={14} />} 
                                onClick={() => router.push(`/registro`)}
                                >
                                Registrar Usuario
                                </Button>
                :
                null}
                <TableSelection type={type} data={data}></TableSelection>
            </div>
        </div>
    );
}
