import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "80mb" }));
app.use(bodyParser.json({ limit: "80mb" }));
import https from "https";
import sslRootCas from "ssl-root-cas";
https.globalAgent.options.ca = sslRootCas.create();
import nodemailer from "nodemailer";
import { Buffer } from "buffer"; // Importa Buffer

// Configurazione di Nodemailer in uscita
const transporter = nodemailer.createTransport({
  host: "smtps.aruba.it",
  port: 465,
  secure: true,
  auth: {
    user: "svanin@sofitel.it",
    pass: "2021_S0f1tel21",
  },
  tls: {
    rejectUnauthorized: false, // Non raccomandato in produzione
  },
});

const invia_screenshot_email = async (token, req, res) => {
  // Endpoint per ricevere lo screenshot e inviare l'email
  const screenshotData = req.req.body.screenshot; // Dati base64 dell'immagine
  const messaggio = req.req.body.messaggio;
  const nomeUtente = req.req.body.nomeUtente;

  // Controllo se è presente uno screenshot
  if (!screenshotData) {
    return res.status(400).send("Screenshot non ricevuto.");
  }

  // Rimuovi il prefisso "data:image/png;base64,"
  const base64Data = screenshotData.replace(/^data:image\/png;base64,/, "");

  // Converti i dati base64 in un buffer
  const screenshotBuffer = Buffer.from(base64Data, "base64");

  // Opzioni per l'email
  const mailOptions = {
    from: "svanin@sofitel.it",
    to: "svanin@sofitel.it",
    subject: ` Richiesta di assistenza - COM38 | ${nomeUtente} `,
    text: messaggio,
    attachments: [
      {
        filename: "screenshot.png",
        content: screenshotBuffer, // Utilizza il buffer dell'immagine
        encoding: "base64",
      },
    ],
  };

  // Invia l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Errore durante l'invio dell'email:", error);
      return res.status(500).send("Errore durante l'invio dell'email.");
    }
    console.log("Email inviata:", info.response);
    res.status(200).send("Screenshot inviato con successo.");
  });
};
export default invia_screenshot_email;
