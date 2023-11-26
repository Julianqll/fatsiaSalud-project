import { Text, Title, TextInput, Button, Image } from '@mantine/core';
import classes from './EmailBanner.module.css';

export function EmailBanner(
  {value, setValue}:any
) {
  function handleClic(): void {
    setValue(true);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Agenda tu cita con nosostros</Title>
        <Text fw={500} fz="lg" mb={5}>
          ¿Tienes algún dolor en el cuerpo?
        </Text>
        <Text fz="sm" c="dimmed">
        Prioriza tu bienestar y alivia tus molestias. 
        Agenda una cita médica con nuestros expertos hoy mismo y comienza tu camino hacia una mejor salud. ¡Tu cuerpo te lo agradecerá!
        </Text>

        <Button 
        onClick={handleClic}
        mt={20}
        >Agendar</Button>

      </div>
      <Image src="/image.svg" className={classes.image} />
    </div>
  );
}