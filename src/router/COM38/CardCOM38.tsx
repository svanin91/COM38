import CardSoftwareProps from "./interface/CardHomeINterface";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../../context/LoggedContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const CardSoftware: React.FC<CardSoftwareProps> = (props) => {
  const LoggedMyContext = useContext(LoggedContext);

  const {
    immagine,
    titolo,
    descrizione,
    attivo,
    setShowPopUpNotAccess,
    setMessaggioPopUpNotAccess,
    accesso,
    in_sviluppo,
  } = props;

  // FUNZIONE PER INVIARE I DATI DEL CONTEXT LOGGEDCONTEXT ALLA APPLICAZIONE IN AVVIO

  const sendContext = async (port: number) => {
    console.log(port);

    try {
      const response = await axios.post(
        `http://localhost:${port}/receive-context`,
        {
          LoggedMyContext: LoggedMyContext,
        }
      );
      console.log("Risposta dal server:", response.data);
    } catch (error) {
      console.error("Errore nell'invio del contesto:", error);
    }
  };

  // DA BASE64 (DAL DB) A IMMAGINE PER FE

  const base64_to_image = (base64: string) => {
    return `data:image/jpeg;base64,${base64}`;
  };

  //LANCIO SCP22

  const start_SCP22 = async () => {
    try {
      await fetch("http://localhost:10000/start-SCP22");
    } catch (error) {
      console.error("Errore:", error);
      alert("Errore nell'avvio dell'applicazione SCP22");
    } finally {
      sendContext(10100);
    }
  };

  // LANCIO TAW91

  const start_TAW91 = async () => {
    try {
      await fetch("http://localhost:10000/start-TAW91");
    } catch (error) {
      console.error("Errore:", error);
      alert("Errore nell'avvio dell'applicazione TAW91");
    } finally {
      sendContext(10200);
    }
  };

  // FUNZIONE SE CLICCO IN UNA CARD

  const clickOnCard = () => {
    if (in_sviluppo === 1) {
      setMessaggioPopUpNotAccess(
        "Siamo al lavoro per sviluppare nuove funzionalità, in questo momento non é possibile accedere a questa sezione"
      );
      setShowPopUpNotAccess(true);
    } else if (attivo === 0) {
      setMessaggioPopUpNotAccess(
        "Siamo spiacenti, non hai l'autorizzazione per accedere a questa funzionalità"
      );
      setShowPopUpNotAccess(true);
    } else {
      if (titolo === "SCP22") {
        start_SCP22();
      } else if (titolo === "TAW91") {
        start_TAW91();
      }
      //lanciaLogeNaviga();
    }
  };

  return (
    <div onClick={clickOnCard}>
      <div
        className={`w-60 h-80 rounded-2xl overflow-hidden shadow-2x1 border-2 border-gray-300 ${
          attivo === 0 ? "opacity-40" : ""
        } shadow-2xl transition-transform transform hover:scale-105`}
      >
        <img
          className="w-full h-24"
          src={base64_to_image(immagine)}
          alt="Placeholder Image"
        />
        <div className="px-4 py-2">
          <div
            className="font-bold text-2xl  text-black"
            style={{ userSelect: "none" }}
          >
            {titolo}
          </div>
          <p
            className="text-gray-700 text-sm"
            style={{ userSelect: "none" }}
            dangerouslySetInnerHTML={{ __html: descrizione }}
          />
        </div>
      </div>
    </div>
  );
};
export default CardSoftware;
