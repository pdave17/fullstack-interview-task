const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const request = require("request")
const fs = require("fs")
const axios = require("axios")
const app = express()

app.use(bodyParser.json({ limit: "10mb" }))

app.get("/investments/:id", (req, res) => {
  const { id } = req.params
  request.get(`${config.investmentsServiceUrl}/investments/${id}`, (e, r, investments) => {
    if (e) {
      console.error(e)
      res.send(500)
    } else {
      res.send(investments)
    }
  })
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})

app.get('/', (req, res) => {
  const reportData = generateReport()
  const options = {
    url: `${config.investmentsServiceUrl}/investments/export`,
    method: 'POST',
    body: JSON.stringify(reportData),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      fs.writeFile('report.csv', body, (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.send(body);
        }
      });
    }
  });
});

function generateReport() {
  axios.get(`${config.investmentsServiceUrl}/investments`)
    .then(response => {
      const accountData = response.data;

      const headers = ['User', 'First Name', 'Last Name', 'Date', 'Holding', 'Value'];
      let csvr = headers.join(',') + '\n';

      accountData.forEach(acc => {
        const { userId, firstName, lastName, date, holdings, investmentTotal } = acc;
        const { id: holdingId, investmentPercentage  } = holdings[0];
        const value = acc.investmentTotal * investmentPercentage;

        const row = [userId, firstName, lastName, date, holdingId, value];
        csvr += row.join(',') + '\n';
      });
      return csvr;
    });
}