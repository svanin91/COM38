import express from "express";
const app = express();
import cors from "cors";
app.use(cors());
import bodyParser from "body-parser";
const { urlencoded, json } = bodyParser;
app.use(urlencoded({ extended: true }));
app.use(json());
import axios from "axios";
import bcrypt from "bcrypt";
import https from "https";
import sslRootCas from "ssl-root-cas";
import fs from "fs";
import moment from "moment";
https.globalAgent.options.ca = sslRootCas.create();
const url =
  "https://srv04/fmi/data/v2/databases/TAW91/layouts/A4_03_TabRig_Utenti/_find";

// Funzione per scrivere nel file di log
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
 * chiamata di login, mando a filemaker un nome utente, se corrisponde filemaker mi manda il record e su node confronto le password criptate,
 *  se le password coincidono mando il login al FE
 */

const Login = async (tokenTAW91, req, res) => {
  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenTAW91}`,
    },
    data: req.body,
  };
  try {
    if (req.body.query[0].M_05_nome_utente === "") {
      return res.send({ error: "Nome utente mancante" });
    }
    const response = await axios(config);

    if (
      !response?.data.response.data ||
      response.data.response.datalength === 0
    ) {
      return res.status(401).send({ error: "Utente non trovato" });
    }
    const users = response.data.response.data;
    const matchingUser = users.find((user) => {
      const username = user.fieldData.M_05_nome_utente;
      return username === req.body.query[0].M_05_nome_utente;
    });
    if (!matchingUser) {
      return res.status(401).send({ error: "Utente non trovato" });
    } else if (response?.data.response.data) {
      const corrispondenza = await confrontaPassword(
        req.body.query[1].M_06_password,
        response.data.response.data[0].fieldData.M_06_password
      );

      if (corrispondenza) {
        const username = matchingUser.fieldData.M_05_nome_utente;
        scriviLog(`Utente ${username} ha effettuato il login con successo`);
        res.send(response.data.response.data[0].fieldData);
      } else {
        res.send({ error: "La passsword non é corretta" });
      }
    }
  } catch (error) {
    console.log("errore", error.message);
    res.status(500).send({ error: "Utente non trovato" });
  }
};
export default Login;

// Funzione per confrontare la password in chiaro con quella criptata
const confrontaPassword = async (passwordInChiaro, passwordCriptata) => {
  try {
    // Utilizza la funzione compare di bcrypt
    const confrontata = await bcrypt.compare(
      passwordInChiaro,
      passwordCriptata
    );
    // Il risultato sarà true se le password corrispondono, altrimenti false
    return confrontata;
  } catch (errore) {
    console.error("Errore durante il confronto delle password:", errore);
    throw errore;
  }
};
