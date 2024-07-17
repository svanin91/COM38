import React, { useState } from "react";
import { LoggedContext } from "../LoggedContext";
export const LoggedContextProvider = ({
  children,
}: React.PropsWithChildren<object>) => {
  const [isLogged, setIsLogged] = useState(Boolean);
  const [logoutClick, setLogOutClick] = useState(Boolean);
  const [A4_03_TabRig_utenti_M_01_nome, setA4_03_TabRig_utenti_M_01_nome] =
    useState("");
  const [
    A4_03_TabRig_utenti_M_02_cognome,
    setA4_03_TabRig_utenti_M_02_cognome,
  ] = useState("");
  const [A4_03_TabRig_utenti_M_03_grado, setA4_03_TabRig_utenti_M_03_grado] =
    useState("");
  const [
    A4_03_TabRig_utenti_M_04_matricola,
    setA4_03_TabRig_utenti_M_04_matricola,
  ] = useState("");
  const [
    A4_03_TabRig_utenti_M_05_nome_utente,
    setA4_03_TabRig_utenti_M_05_nome_utente,
  ] = useState("");
  const [A4_03_TabRig_utenti_M_07_attivo, setA4_03_TabRig_utenti_M_07_attivo] =
    useState<number | undefined>(undefined);
  const [A4_03_TabRig_utenti_id_record, setA4_03_TabRig_utenti_id_record] =
    useState<number | undefined>(undefined);
  const [
    A4_03_TabRig_utenti_M_08_data_ultimo_accesso,
    setA4_03_TabRig_utenti_M_08_data_ultimo_accesso,
  ] = useState("");
  const [
    A4_03_TabRig_utenti_M_09_ora_ultimo_accesso,
    setA4_03_TabRig_utenti_M_09_ora_ultimo_accesso,
  ] = useState("");
  const [
    A4_03_TabRig_utenti_M_10_cognome_nome,
    setA4_03_TabRig_utenti_M_10_cognome_nome,
  ] = useState("");

  return (
    <LoggedContext.Provider
      value={{
        isLogged,
        setIsLogged,
        logoutClick,
        setLogOutClick,
        A4_03_TabRig_utenti_M_01_nome,
        setA4_03_TabRig_utenti_M_01_nome,
        A4_03_TabRig_utenti_M_02_cognome,
        setA4_03_TabRig_utenti_M_02_cognome,
        A4_03_TabRig_utenti_M_03_grado,
        setA4_03_TabRig_utenti_M_03_grado,
        A4_03_TabRig_utenti_M_04_matricola,
        setA4_03_TabRig_utenti_M_04_matricola,
        A4_03_TabRig_utenti_M_05_nome_utente,
        setA4_03_TabRig_utenti_M_05_nome_utente,
        A4_03_TabRig_utenti_M_07_attivo,
        setA4_03_TabRig_utenti_M_07_attivo,
        A4_03_TabRig_utenti_id_record,
        setA4_03_TabRig_utenti_id_record,
        A4_03_TabRig_utenti_M_08_data_ultimo_accesso,
        setA4_03_TabRig_utenti_M_08_data_ultimo_accesso,
        A4_03_TabRig_utenti_M_09_ora_ultimo_accesso,
        setA4_03_TabRig_utenti_M_09_ora_ultimo_accesso,
        A4_03_TabRig_utenti_M_10_cognome_nome,
        setA4_03_TabRig_utenti_M_10_cognome_nome,
      }}
    >
      {children}
    </LoggedContext.Provider>
  );
};
