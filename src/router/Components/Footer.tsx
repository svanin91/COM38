import { useContext, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import SendScreenPopUp from "../PopUp/SendScreenPopUp";
import EsitoPopUp from "../PopUp/EsitoPopUp";
import { LoggedContext } from "../../context/LoggedContext";

const Footer = () => {
  const LoggedMyContext = useContext(LoggedContext);
  const [dataFooter, setDataFooter] = useState("");
  const [showSendScreen, setShowSendScreen] = useState(false);
  const [showPopUpEsito, setShowPopUpEsito] = useState(false);
  const [messaggioPopUpSendScreenEsito, setmessaggioPopUpSendScreenEsito] =
    useState("");
  const [messaggioPopUpSendScreen, setmessaggioPopUpSendScreen] = useState("");
  const [screenshotImage, setScreenshotImage] = useState("");
  const [titlePopUpSendScreen, setTitlePopUpSendScreen] = useState("");

  const closeErrorPopup = () => {
    setShowSendScreen(false);
  };
  const closeEsitoPopUp = () => {
    setShowPopUpEsito(false);
  };
  // CALCOLA LA DATA PER IL FOOTER
  const calcolaData = () => {
    const data = new Date();
    let set, gg, mm, aaaa, h, m;

    // Crea la tabella dei giorni della settimana
    const giorni = [
      "Domenica",
      "Lunedì",
      "Martedì",
      "Mercoledì",
      "Giovedì",
      "Venerdì",
      "Sabato",
    ];

    // Estrae il giorno della settimana
    set = giorni[data.getDay()] + " ";

    // Formatta il giorno del mese
    gg =
      data.getDate() < 10 ? "0" + data.getDate() + "-" : data.getDate() + "-";

    // Formatta il mese
    mm =
      data.getMonth() + 1 < 10
        ? "0" + (data.getMonth() + 1) + "-"
        : data.getMonth() + 1 + "-";

    // Estrae l'anno
    aaaa = data.getFullYear();

    // Formatta l'ora
    h =
      data.getHours() < 10
        ? "0" + data.getHours() + ":"
        : data.getHours() + ":";

    // Formatta i minuti
    m = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();

    setDataFooter(set + gg + mm + aaaa + ", ore " + h + m);
  };

  useEffect(() => {
    const interval = setInterval(calcolaData, 100000); // aggiorna ogni minuto
    calcolaData(); // chiama subito per impostare inizialmente
    return () => clearInterval(interval);
  }, []);

  // FA LO SCREEN

  const handleScreen = () => {
    html2canvas(document.body).then((canvas) => {
      const imageURL = canvas.toDataURL("image/png");
      setScreenshotImage(imageURL);
      setShowSendScreen(true);
    });
  };

  // CHIAMATA PER INVIARE LO SCREEN PER EMAIL

  const handleSendScreen = () => {
    fetch("http://localhost:10000/invia-screenshot-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        screenshot: screenshotImage,
        messaggio: messaggioPopUpSendScreen,
        nomeUtente: LoggedMyContext.A4_03_TabRig_utenti_M_05_nome_utente,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante l'invio dello screenshot.");
        }
      })
      .catch((error) => {
        console.error("Errore:", error);
        setmessaggioPopUpSendScreenEsito(
          "Si è verificato un errore durante l'invio della richiesta"
        );
        setTitlePopUpSendScreen("ATTENZIONE !!");
        setShowPopUpEsito(true);
      });
    setmessaggioPopUpSendScreen("");
    setShowSendScreen(false);
    setmessaggioPopUpSendScreenEsito("Richiesta inviata con successo!");
    setTitlePopUpSendScreen("Complimenti");
    setShowPopUpEsito(true);
  };

  return (
    <div className="bg-gray-300 flex items-center justify-between h-8 px-3 absolute inset-x-0 bottom-0 border-t-2 border-gray-500 columns-7">
      <div className="border-l-2 border-gray-500 pl-1">
        <p style={{ userSelect: "none" }}>COM38</p>
      </div>
      <div className="border-l-2 border-gray-500 pl-1">
        <p style={{ userSelect: "none" }}>rel. 22.11.33</p>
      </div>
      {LoggedMyContext.isLogged ? (
        <div
          onClick={handleScreen}
          className="border-l-2 border-gray-500 pl-1 cursor-pointer flex  justify-between items-center "
        >
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
          </svg>
          <p style={{ userSelect: "none" }}>Invia richiesta di assistenza</p>
        </div>
      ) : null}

      <div className="border-l-2 border-gray-500 pl-1">
        <p style={{ userSelect: "none" }}>{dataFooter}</p>
      </div>
      <div className="border-l-2 border-gray-500 pl-1">
        <p style={{ userSelect: "none" }}>SOFITEL - 0422.359911</p>
      </div>
      {showSendScreen && (
        <SendScreenPopUp
          title={"Invia richiesta di assistenza"}
          setMessaggioPopUpSendScreen={setmessaggioPopUpSendScreen}
          messaggioPopUpSendScreen={messaggioPopUpSendScreen}
          image={screenshotImage}
          onClose={closeErrorPopup}
          onSend={handleSendScreen}
        />
      )}
      {showPopUpEsito && (
        <EsitoPopUp
          title={titlePopUpSendScreen}
          message={messaggioPopUpSendScreenEsito}
          onClose={closeEsitoPopUp}
        />
      )}
    </div>
  );
};

export default Footer;
