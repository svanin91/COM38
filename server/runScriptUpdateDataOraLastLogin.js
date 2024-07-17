import express from "express";
const app = express();
import cors from "cors";
app.use(cors());
import bodyParser from "body-parser";
const { urlencoded, json } = bodyParser;
app.use(urlencoded({ extended: true }));
app.use(json());
import axios from "axios";
var data = JSON.stringify({});
import https from "https";
import sslRootCas from "ssl-root-cas";
https.globalAgent.options.ca = sslRootCas.create();

/**
 * CON QUESTA CHIAMATA LANCIO LO SCRIPT A4_03_TabRig_utenti_ultimo_accesso CHE MODIFICA I CAMPI
 * M_08_data_ultimo_accesso E M_09_ora_ultimo_accesso INSERENDO L' ULTIMA DATA E ORA DI ACCESSO
 */

const runScriptUpdateDataOraLastLogin = async (token, req) => {
  const url = `https://srv04/fmi/data/v2/databases/TAW91/layouts/A4_03_TabRig_utenti/script/A4_03_TabRig_utenti_ultimo_accesso?script.param=${req.body.id_record}`;
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  try {
    const response = await axios(config);
    console.log(response.status);
  } catch (error) {
    console.log("errore", error);
  }
};
export default runScriptUpdateDataOraLastLogin;
