"use client";


import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FormularioInspeccion } from '../../../../components/FormularioInspeccion/FormularioInspeccion';

export default function InspeccionPage (){
  const {data : session} = useSession();
    if (!session) {
      redirect("/signIn")
    }  
  return (
    <FormularioInspeccion></FormularioInspeccion>   
  )
}