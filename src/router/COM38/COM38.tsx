"use client";
import CardSoftware from "./CardCOM38";
import { LoggedContext } from "../../context/LoggedContext";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NotAccessPopUp from "../PopUp/NotAccessPopUp";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import axios from "axios";

const COM38 = () => {
  const LoggedMyContext = useContext(LoggedContext);
  const [showPopUpNotAccess, setShowPopUpNotAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [software_Sofitel, setSoftware_Sofitel] = useState([]);
  const [messaggioPopUpNotAccess, setMessaggioPopUpNotAccess] = useState("");

  useEffect(() => {
    getSoftwareSofitel();
  }, []);

  // LOGOUT DOPO INATTIVITà

  useEffect(() => {
    let timeoutId: number;

    const resetTimer = () => {
      clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        // Ricarica la pagina dopo 10 minuti di inattività
        axios.post("http://localhost:10000/logLogoutInattivita", {
          nomeUtente: LoggedMyContext.A4_03_TabRig_utenti_M_05_nome_utente,
          loggato: LoggedMyContext.isLogged,
        });

        window.location.reload();
      }, 10 * 60 * 1000); // 10 minuti in millisecondi 10 * 60 * 1000)
    };

    // Aggiungi gli event listener per resettare il timer su interazione dell'utente
    window.addEventListener("mousemove", resetTimer); // Questo evento si verifica quando l'utente sposta il mouse sopra la pagina web
    window.addEventListener("keydown", resetTimer); // Si verifica quando l'utente preme un tasto sulla tastiera
    window.addEventListener("click", resetTimer); // Si verifica quando l'utente fa clic su un elemento della pagina web con il mouse
    window.addEventListener("scroll", resetTimer); // Questo evento si verifica quando l'utente scorre la pagina web

    // Inizializza il timer quando il componente si monta
    resetTimer();

    // Rimuovi gli event listener quando il componente viene smontato
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      clearTimeout(timeoutId);
    };
  }, []);

  const override = css`
  display: block,
  margin: 0 auto
`;

  // PRENDE I DATI PER I SOTFTWARE NELLE CARD

  const getSoftwareSofitel = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:10000/getSoftwareSofitel"
      );
      setSoftware_Sofitel(response.data);
    } catch (error) {
      console.error("Errore durante la richiesta:", error);
    }
    setLoading(false);
  };

  const closeNotAccessPopUp = () => {
    setShowPopUpNotAccess(false);
  };

  const cardSoftware = software_Sofitel.map((item, index: number) => (
    <CardSoftware
      titolo={item.fieldData.S_01_nome_applicativo}
      descrizione={item.fieldData.S_02_descrizione_applicativo}
      link={item.fieldData.S_06_link}
      attivo={item.fieldData.S_04_attivo}
      accesso={item.fieldData.S_05_accesso}
      key={index}
      immagine={item.fieldData.S_03_immagine_card_applicativo}
      setShowPopUpNotAccess={setShowPopUpNotAccess}
      setMessaggioPopUpNotAccess={setMessaggioPopUpNotAccess}
      in_sviluppo={item.fieldData.S_07_in_sviluppo}
    />
  ));

  if (!LoggedMyContext.isLogged) {
    return <Navigate to="/authentication" replace />;
  }
  return (
    <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
      {loading ? (
        <div className="spinner flex fixed inset-0 z-10 justify-center items-center	w-full h-full">
          <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>
          <BeatLoader
            color={"rgb(223, 166, 0)"}
            loading={loading}
            cssOverride={override}
            size={30}
          />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-20 px-8">{cardSoftware}</div>
      )}
      {showPopUpNotAccess && (
        <NotAccessPopUp
          onClose={closeNotAccessPopUp}
          messaggio={messaggioPopUpNotAccess}
        />
      )}
    </div>
  );
};
export default COM38;
