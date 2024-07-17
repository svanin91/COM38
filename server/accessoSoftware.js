import fs from "fs";
import moment from "moment";

// Funzione per scrivere nel file di log quando un utente accede ad SCP22 da COM38, il pacchetto fs mi permette di scrivere nel file log.txt
const scriviLog = (messaggio) => {
  const oraAttuale = moment().format("DD/MM/YYYY [alle] HH:mm");
  const log = `${oraAttuale}: ${messaggio}\n`;

  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Errore durante la scrittura nel file di log:", err);
    }
  });
};

const logAcesso = async (token, req, res) => {
  const chiavi = Object.keys(req.body);
  const nomeUtente = chiavi.length > 0 ? chiavi[0] : "Nome utente non trovato"; // Scrivi nel file di log che l'utente ha effettuato l'accesso a SCP22
  if (nomeUtente === "Nome utente non trovato") {
    return;
  }
  scriviLog(
    `Utente ${req.body.nomeUtente} ha effettuato l'accesso a ${req.body.nomeSoftware}`
  );
};
export default logAcesso;
