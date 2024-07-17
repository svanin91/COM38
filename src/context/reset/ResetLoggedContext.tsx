const resetLoggedContext = async (LoggedMyContext: any) => {
  LoggedMyContext.setIsLogged(false);
  LoggedMyContext.setLogOutClick(false);
  LoggedMyContext.setA4_03_TabRig_utenti_M_01_nome("");
  LoggedMyContext.setA4_03_TabRig_utenti_M_02_cognome("");
  LoggedMyContext.setA4_03_TabRig_utenti_M_03_grado("");
  LoggedMyContext.setA4_03_TabRig_utenti_M_04_matricola("");
  LoggedMyContext.setA4_03_TabRig_utenti_M_05_nome_utente("");
  LoggedMyContext.setA4_03_TabRig_utenti_M_07_attivo(undefined);
  LoggedMyContext.setA4_03_TabRig_utenti_M_08_data_ultimo_accesso("");
  LoggedMyContext.setA4_03_TabRig_utenti_M_09_ora_ultimo_accesso("");
  LoggedMyContext.setA4_03_TabRig_utenti_id_record(undefined);
  LoggedMyContext.setA4_03_TabRig_utenti_M_10_cognome_nome("");
};
export default resetLoggedContext;
