"use client";

import { useSession } from "next-auth/react";
import UserListView from "../../../components/UserListView/UserListView";
import { redirect } from "next/navigation";

export default function PrescripcionesPage() {
    const {data : session} = useSession();
    if (!session) {
      redirect("/signIn")
    }
    let type;
  
    if (session?.user.rol == 1)
    {
      type = "prescripciones_paciente";
    }
    else if (session?.user.rol == 2)
    {
      type = "prescripciones_medico";
  
    }
    return (
        <UserListView type={type}></UserListView>
    );
}