import {
  useState,
  useContext,
  ChangeEvent,
  useEffect,
  useCallback,
} from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import ErrorPopup from "../PopUp/ErrorPopup";
import { LoggedContext } from "../../context/LoggedContext";
import resetLoggedContext from "../../context/reset/ResetLoggedContext";

const Authentication = () => {
  const LoggedMyContext = useContext(LoggedContext);
  const [nomeUtente, setNomeUtente] = useState("");
  const [password, setPassword] = useState("");
  const [showAuthError, setShowAuthError] = useState(false);
  const [messaggioPopUp, setMessaggioPopUp] = useState("");

  fetch("/public/ini/ini.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel caricamento dei dati");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });

  const handleAuthenticationError = (testo: string) => {
    setMessaggioPopUp(testo);
    setShowAuthError(true);
  };

  const closeErrorPopup = () => {
    setShowAuthError(false);
  };

  // questo é il body che invio per il login, eliminando eventuali spazi con trim

  const body = {
    query: [
      { M_05_nome_utente: nomeUtente.trim() },
      { M_06_password: password.trim() },
    ],
  };

  /**
   * chiamata per autenticazione e setState di varibili contenenti dati operatore loggato
   */

  const funcLogin = async (event) => {
    event.preventDefault(); // Previene il comportamento di default del form

    const oggi = new Date();

    // Formattazione della data nel formato GG/MM/AAAA
    LoggedMyContext.setA4_03_TabRig_utenti_M_08_data_ultimo_accesso(
      `${oggi.getDate()}/${oggi.getMonth() + 1}/${oggi.getFullYear()}`
    );

    // Formattazione dell'ora e dei minuti
    LoggedMyContext.setA4_03_TabRig_utenti_M_09_ora_ultimo_accesso(
      `${oggi.getHours()}:${oggi.getMinutes()}`
    );

    try {
      const response = await axios.post(
        "http://localhost:10000/authentication",
        body
      );
      if (response.data.error === "La passsword non é corretta") {
        handleAuthenticationError("La password non è corretta");
      } else if (response.data.M_07_attivo === "no") {
        handleAuthenticationError("Utente non più attivo");
      } else if (response.data.error === "Nome utente mancante") {
        handleAuthenticationError("Non hai inserito il nome utente.");
      } else {
        LoggedMyContext.setA4_03_TabRig_utenti_id_record(
          response.data.id_record
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_01_nome(
          response.data.M_01_nome
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_02_cognome(
          response.data.M_02_cognome
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_04_matricola(
          response.data.M_04_matricola
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_03_grado(
          response.data.M_03_grado
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_05_nome_utente(
          response.data.M_05_nome_utente
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_07_attivo(
          response.data.M_07_attivo
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_10_cognome_nome(
          response.data.M_01_nome + " " + response.data.M_02_cognome
        );
        LoggedMyContext.setIsLogged(true);
      }
    } catch (error) {
      handleAuthenticationError("Utente non trovato");
      console.error("Errore durante la richiesta:", error);
    }
  };

  // questo script permette di inserire in tabella la data e l'ora dell ultimo login

  const runScriptUpdateDataOraLastLogin = useCallback(async () => {
    const body = { id_record: LoggedMyContext.A4_03_TabRig_utenti_id_record };
    await axios.post(
      "http://localhost:10000/runScriptUpdateDataOraLastLogin",
      body
    );
  }, [LoggedMyContext.A4_03_TabRig_utenti_id_record]);

  /*useEffect(() => {
    const fetchData = async () => {
      if (LoggedMyContext.A4_03_TabRig_utenti_id_record) {
        await runScriptUpdateDataOraLastLogin();
      }
    };
    fetchData();
  }, [
    LoggedMyContext.A4_03_TabRig_utenti_id_record,
    runScriptUpdateDataOraLastLogin,
  ]);
  */

  const handleNomeUtente = (e: ChangeEvent<HTMLInputElement>) => {
    const valueNomeUtente = e.target.value;
    setNomeUtente(valueNomeUtente);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const valuePassword = e.target.value;
    setPassword(valuePassword);
  };

  if (LoggedMyContext.isLogged) {
    return <Navigate to="/COM38" replace />;
  }

  return (
    <div className="bg-gray-200 w-screen h-screen flex items-center justify-center">
      <div className="h-2/6 w-3/12 bg-gialloSofitel border-2 border-gialloBordo rounded-xl flex flex-col items-center justify-center py-44">
        <div className="w-7/12 mb-4 text-center">
          <p
            className="text-4xl text-center mb-4"
            style={{ userSelect: "none" }}
          >
            Autenticazione
          </p>
          <p className="text-center" style={{ userSelect: "none" }}>
            Le password sono sensibili
          </p>
          <p className="text-center " style={{ userSelect: "none" }}>
            al maiuscolo / minuscolo
          </p>
        </div>
        <div className="w-7/12 flex flex-col items-center justify-center mb-4">
          <form onSubmit={funcLogin} className="w-full">
            <input
              className="w-full mb-2 px-3 py-2 border-2 border-gray-700 rounded-lg text"
              type="text"
              placeholder="Nome Utente"
              value={nomeUtente}
              onChange={handleNomeUtente}
            />
            <input
              className="w-full mb-2 px-3 py-2 border-2 border-gray-700 rounded-lg text"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-400 hover:bg-gray-500 border-2 border-gray-700 rounded-lg text-xl text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      {showAuthError && (
        <ErrorPopup
          title={"Errore di autenticazione"}
          message={messaggioPopUp}
          onClose={closeErrorPopup}
        />
      )}
    </div>
  );
};
export default Authentication;
