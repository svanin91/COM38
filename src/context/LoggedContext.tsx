import React from "react";
import MyContextLoggedType from "./interface/LoggedInterface";

export const LoggedContext = React.createContext<MyContextLoggedType>({
  isLogged: false,
  setIsLogged: () => {},
  logoutClick: false,
  setLogOutClick: () => {},
  A4_03_TabRig_utenti_M_01_nome: "",
  setA4_03_TabRig_utenti_M_01_nome: () => {},
  A4_03_TabRig_utenti_M_02_cognome: "",
  setA4_03_TabRig_utenti_M_02_cognome: () => {},
  A4_03_TabRig_utenti_M_03_grado: "",
  setA4_03_TabRig_utenti_M_03_grado: () => {},
  A4_03_TabRig_utenti_M_04_matricola: "",
  setA4_03_TabRig_utenti_M_04_matricola: () => {},
  A4_03_TabRig_utenti_M_05_nome_utente: "",
  setA4_03_TabRig_utenti_M_05_nome_utente: () => {},
  A4_03_TabRig_utenti_M_07_attivo: undefined,
  setA4_03_TabRig_utenti_M_07_attivo: () => {},
  A4_03_TabRig_utenti_M_08_data_ultimo_accesso: "",
  setA4_03_TabRig_utenti_M_08_data_ultimo_accesso: () => {},
  A4_03_TabRig_utenti_M_09_ora_ultimo_accesso: "",
  setA4_03_TabRig_utenti_M_09_ora_ultimo_accesso: () => {},
  A4_03_TabRig_utenti_id_record: undefined,
  setA4_03_TabRig_utenti_id_record: () => {},
  A4_03_TabRig_utenti_M_10_cognome_nome: "",
  setA4_03_TabRig_utenti_M_10_cognome_nome: () => {},
});
