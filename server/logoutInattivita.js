import fs from "fs";
import moment from "moment";

// Funzione per scrivere nel file di log quando un utente si slogga
const scriviLog = (messaggio) => {
  const oraAttuale = moment().format("DD/MM/YYYY [alle] HH:mm");
  const log = `${oraAttuale}: ${messaggio}\n`;

  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Errore durante la scrittura nel file di log:", err);
    }
  });
};
/**
 * CHIAMATA DI LOGOUT DOPO INATTIVITà
 */
const logLogoutInattivita = async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.loggato) {
      scriviLog(
        `Utente ${req.body.nomeUtente} ha effettuato il logout per inattività con successo`
      );
    }
  } catch (error) {
    console.error("Errore durante il logout:", error);
  }
};
export default logLogoutInattivita;
