"use client";

import { useSession } from "next-auth/react";
import UserListView from "../../../components/UserListView/UserListView";

export default function CitasPage() {
    const {data : session} = useSession();
    let type;
  
    if (session?.user.rol == 1)
    {
      type = "citas_paciente";
    }
    else if (session?.user.rol == 2)
    {
      type = "citas_medico_more";
  
    }
    return (
        <UserListView type={type}></UserListView>
    );
}