import express from "express";
const app = express();
import cors from "cors";

import bodyParser from "body-parser";
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(bodyParser.json({ limit: "200mb" }));
app.use(express.json({ limit: "200mb" }));

import axios from "axios";
var data = JSON.stringify({});
import https from "https";
import sslRootCas from "ssl-root-cas";
https.globalAgent.options.ca = sslRootCas.create();
// eslint-disable-next-line no-undef
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
import multer from "multer";
import { exec } from "child_process";
var tokenTAW91 = "no token";
const UtenteTAW91 = "svanin:svanin";

const urlConnectionTAW91 = `https://srv04/fmi/data/v2/databases/TAW91/sessions`;

import getUser from "./authUser.js";
import logLogoutInattivita from "./logoutInattivita.js";
import logAcesso from "./accessoSoftware.js";
import Login from "./auth.js";
import getSoftwareSofitel from "./getSoftwareSofitel.js";
import runScriptUpdateDataOraLastLogin from "./runScriptUpdateDataOraLastLogin.js";
import invia_screenshot_email from "./screenShotEmail.js";
const CodificaTAW91 = btoa(UtenteTAW91);
const upload = multer({ limits: { fieldSize: 100 * 2024 * 2024 } }); // Limite di 25MB per il payload

var configConnectionSCPTAW91 = {
  method: "post",
  maxBodyLength: Infinity,
  url: urlConnectionTAW91,
  headers: {
    Authorization: `Basic ${CodificaTAW91} `,
    "Content-Type": "application/json",
  },
  data: data,
};

async function connessioneTAW91() {
  try {
    const response = await axios(configConnectionSCPTAW91);
    tokenTAW91 = response.data.response.token;
    console.log("COM38 connesso");
  } catch (error) {
    console.log("errore nella connessione ad db", error.message);
  }
}
(async () => {
  app.listen(10000, () => console.log("Siamo connessi alla porta 10000"));
  await connessioneTAW91();
})();

app.get("/getUser", async (req, res) => {
  await getUser(tokenTAW91, res);
});
/**
 *  QUESTA è LA CHIAMATA PER CERCARE UN RECORD CON NOME UTENTE CORRISPONDENTE E CONFRONTARE LA PASSWORD PER IL LOGIN
 */

app.post("/authentication", async (req, res) => {
  (async () => {
    await Login(tokenTAW91, req, res);
    connessioneTAW91();
  })();
});

/**
 * QUESTA é LA CHIAMTA PER SCRIVERE NEL FILE DI LOG L'AVVENUTO LOGOUT AUTOMATICO PER INATTIVITà
 */

app.post("/logLogoutInattivita", async (req, res) => {
  (async () => {
    await logLogoutInattivita(req, res);
    connessioneTAW91();
  })();
});
/**
 *  QUESTA è LA CHIAMATA PER SCRIVERE NEL FILE DI LOG CHE L'UTENTE HA EFFETTUATO L'ACCESSO A SCP22
 */

app.post("/logAcesso", async (req, res) => {
  (async () => {
    await logAcesso(req, res);
    connessioneTAW91();
  })();
});

// CHIAMATA PER SOFTWARE COM38

app.get("/getSoftwareSofitel", async (req, res) => {
  await getSoftwareSofitel(tokenTAW91, req, res);
  connessioneTAW91();
});

app.post("/runScriptUpdateDataOraLastLogin", async (req, res) => {
  (async () => {
    await runScriptUpdateDataOraLastLogin(tokenTAW91, req, res);
    connessioneTAW91();
  })();
});

// INVIO EMAIL SCREENSHOT PER ASSISTENZA

app.post(
  "/invia-screenshot-email",
  upload.single("screenshot"),
  async (req, res) => {
    await invia_screenshot_email(req, res);
    connessioneTAW91();
  }
);

// AVVIO DI APPLICAZIONI ESTERNE

app.get("/start-SCP22", (req, res) => {
  exec(
    `C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -ExecutionPolicy RemoteSigned -File C:\\Users\\Simone\\Desktop\\avvia_SCP22.ps1`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Errore: ${error.message}`);
        return res
          .status(500)
          .send("Errore nell'avvio dell'applicazione SCP22");
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res
          .status(500)
          .send("Errore nell'avvio dell'applicazione SCP22");
      }
      console.log(`Stdout: ${stdout}`);
      res.send("Applicazione SCP22 avviata con successo");
    }
  );
});

app.get("/start-TAW91", (req, res) => {
  exec(
    `C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -ExecutionPolicy RemoteSigned -File C:\\Users\\Simone\\Desktop\\avvia_TAW91.ps1`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Errore: ${error.message}`);
        return res
          .status(500)
          .send("Errore nell'avvio dell'applicazione TAW91");
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res
          .status(500)
          .send("Errore nell'avvio dell'applicazione TAW91");
      }
      console.log(`Stdout: ${stdout}`);
      res.send("Applicazione TAW91 avviata con successo");
    }
  );
});
