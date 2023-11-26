// Reportes.js
"use client";
import { Paper, Text, Grid, Flex, rem, Group, Button } from '@mantine/core';
import classes from './DashboardView.module.css';
import { PieChart } from '../PieChart/PieChart';
import { TableReviews } from '../TableReviews/TableReviews';
import UserListView from '../UserListView/UserListView';
import { useSession } from 'next-auth/react';
import { IconFilePercent } from '@tabler/icons-react';
import { EmailBanner } from '../EmailBanner/EmailBanner';
import StepperDirectivas from '../StepperDirectivas/StepperDirectivas';
import { useState } from 'react';

export default function DashboardView() {
    const {data : session} = useSession();
    let table_type;
    let dataGraphs;
    let data;
    const Icon = IconFilePercent;
    const [valueAgendar, setValueAgendar] = useState(false);

  if (session?.user.rol == 2)
  {
    table_type = "citas_medico";
    dataGraphs = {
        cantidad1: "10+",
        descrip1: "Aviones inspeccionados",
        cantidad2: "1+",
        descrip2: "Informes requeridos"
    }
     data = {
        labels: ['Aviones inspeccionados', 'Aviones en mal estado'],
        datasets: [
          {
            label: '# de aviones',
            data: [12, 3],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
  }

    return (
        <div className={classes.container}>
          {session?.user.rol == 2 ?
          <>
            <Text size="xl" className={classes.header}>Reportes médicos</Text>
            <Grid align='center' columns={12} gutter="xs" className={classes.metricsWrapper}>
                <Grid.Col span={4}>
                <Paper withBorder p="md" mb={30} radius="md">
                  <Group justify="space-between">
                    <Text size="xs" c="dimmed" className={classes.title}>
                      Título
                    </Text>
                    <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
                  </Group>

                  <Group align="flex-end" gap="xs" mt={25}>
                    <Text c='teal' className={classes.value}>Value</Text>
                  </Group>

                  <Text fz="xs" c="dimmed" mt={7}>
                    Procedimiento
                  </Text>
                </Paper>
                <Paper withBorder p="md" radius="md">
                  <Group justify="space-between">
                    <Text size="xs" c="dimmed" className={classes.title}>
                      Título
                    </Text>
                    <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
                  </Group>

                  <Group align="flex-end" gap="xs" mt={25}>
                    <Text c='teal' className={classes.value}>Value</Text>
                  </Group>

                  <Text fz="xs" c="dimmed" mt={7}>
                    Procedimiento
                  </Text>
                </Paper>
                </Grid.Col>
                <Grid.Col span={8} mb={"30px"}>
                    <Paper className={classes.chartWrapper}>
                        <Text>Rendimiento del mes</Text>
                        {PieChart(data)}
                    </Paper>
                </Grid.Col>
            </Grid>

            <UserListView type={table_type}></UserListView>


          </>
           :
            <div>
              {valueAgendar ? 
              <StepperDirectivas
              value ={valueAgendar}
              setValue = {setValueAgendar}
              ></StepperDirectivas>
              :
              <EmailBanner
              value ={valueAgendar}
              setValue = {setValueAgendar}
            ></EmailBanner>
              }
            </div>
           }

        </div>
    );
}
