"use client";
import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import classes from './HeroImageBackground.module.css';

export function HeroImageBackground() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Fatsia Salud
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
          Clínica Fatsia es un centro de referencia en fisioterapia y diagnóstico avanzado. Nuestra misión es proporcionar servicios de salud de la más alta calidad, centrados en la atención personalizada y el uso de tecnologías de vanguardia.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button 
            className={classes.control} 
            variant="white" 
            size="lg"
            onClick={() => window.location.href="/signIn"}
          >
            Ingresar
          </Button>
        </div>
      </div>
    </div>
  );
}