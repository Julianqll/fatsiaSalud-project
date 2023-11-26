"use client";
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, ScrollArea, Skeleton, Title, Text } from '@mantine/core';
import {
    IconNotes,
    IconReportMedical,
    IconMedicineSyrup
  } from '@tabler/icons-react';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import classes from './CollapseDesktop.module.css';
import { UserButton } from '../UserButton/UserButton';
import { useSession } from 'next-auth/react';
import { ActionToggle } from '../ActionToggle/ActionToggle';


  const mockdata_profesional = [
    { label: 'Citas', icon: IconReportMedical , link: '/citas'},
    { label: 'Prescripciones', icon: IconMedicineSyrup , link: '/prescripciones'},
  ];

  const mockdata_paciente = [
    { label: 'Citas', icon: IconReportMedical, link: '/citas'},
    { label: 'Prescripciones', icon: IconMedicineSyrup , link: '/prescripciones'},
    { label: 'Historial Médico', icon: IconNotes , link: '/historial-medico'},
  ];


export function CollapseDesktop({
    children
  }: {
    children: React.ReactNode  
  }) {

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const {data : session} = useSession();
  let mockdata;

  if (session?.user.rol == 1)
  {
    mockdata = mockdata_paciente;
  }
  else if (session?.user.rol == 2)
  {
    mockdata = mockdata_profesional;
  }
  const links = mockdata?.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 310,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify='space-between'>
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Text<'a'>
                component="a"
                href="/dashboard"
            >
              <Title order={2} ta="center">
                Fatsia Salud
              </Title>
            </Text>
          </Group>
          <ActionToggle/>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="sm">
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>
        <div className={classes.footer}>
          <UserButton />
        </div>
        </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}