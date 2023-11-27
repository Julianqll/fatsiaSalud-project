"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import FormularioRegistroPrescripcion from "../../../components/FormularioRegistroPrescripcion/FormularioRegistroPrescripcion";

function RegistroPrescripcionPage() {
    const {data : session} = useSession();
    if (!session) {
      redirect("/signIn")
    }
    return (<FormularioRegistroPrescripcion></FormularioRegistroPrescripcion>);
}

export default RegistroPrescripcionPage;
