import { useQuery } from "@apollo/client";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "../../../../apolloClient";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { SIGN_IN } from "../../../../queries/queriesGenerales";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            try {
              const { data } = await client.query({
                query: SIGN_IN,
                variables: {
                  _eq: credentials!.username,
                }
              });
          
              if (data && data.Usuario.length > 0) {
                console.log(data.Usuario)
                let passwordMatches = await bcrypt.compare(credentials!.password, data.Usuario[0].Contrasena);
                if (passwordMatches)
                {
                  if (data.Usuario[0].TipoUsuario == 1)
                  {
                    //paciente
                    const user = {
                      id: data.Usuario[0].Pacientes[0].IdPaciente, // Assuming your user has an id field.
                      name: `${data.Usuario[0].Pacientes[0].Nombres} ${data.Usuario[0].Pacientes[0].Apellidos}`,
                      email: data.Usuario[0].Correo,
                      rol: data.Usuario[0].TipoUsuario,
                    };
                    return user;
                  }
                  else 
                  {
                    //profesinal
                    const user = {
                      id: data.Usuario[0].Profesionals[0].IdProfesional, // Assuming your user has an id field.
                      name: `${data.Usuario[0].Profesionals[0].Nombres} ${data.Usuario[0].Profesionals[0].Apellidos}`,
                      email: data.Usuario[0].Correo,
                      rol: data.Usuario[0].TipoUsuario,
                    };
                    return user;
                  }
                }else {
                  throw new Error("Las credenciales proporcionadas son incorrectas.");
                }
              } else {
              throw new Error("Usuario no encontrado.");
              }
            } catch (error) {
              console.error("Error authorizing user:", error);
              return null;
            }
          }
        })
      ],
      callbacks: {
        async jwt({ token, user, session }:any) {
          if (user) {
            return {
              ...token,
              id:user.id,
              rol: user.rol,
            };
          }
          return token;
        },
      
        async session({ session, token, user }) {
          return {
            ...session,
            user :{
              ...session.user,
              id:token.id,
              rol: token.rol,
            }
          };
          return session;
        },
      },
      secret: process.env.NEXTAUTH_SECRET,
      
}

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};