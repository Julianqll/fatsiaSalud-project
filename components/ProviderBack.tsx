"use client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apolloClient";

export const ProviderBack = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
