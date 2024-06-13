const express = require('express');
const app = express();
const port = 8083;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/cclIpTraffic', (req, res) => {
  const cclIpTraffic = [
    {
      icxName: 'Summit communication limited Domestic',
      totalAssignmentE1: 1,
      signalingCircuits: 0,
      synchronizationCircuits: 1,
      voiceCircuits: 25,
      concurrentChannel: 0,
      freeChannel: 30,
      usage: 0.0,
    },
    {
      icxName: 'Summit communication limited International',
      totalAssignmentE1: 1,
      signalingCircuits: 0,
      synchronizationCircuits: 1,
      voiceCircuits: 5,
      concurrentChannel: 0,
      freeChannel: 30,
      usage: 0.0,
    },
    {
      icxName: 'Agni Domestic',
      totalAssignmentE1: 1,
      signalingCircuits: 0,
      synchronizationCircuits: 1,
      voiceCircuits: 25,
      concurrentChannel: 0,
      freeChannel: 30,
      usage: 0.0,
    },
    {
      icxName: 'Agni International',
      totalAssignmentE1: 1,
      signalingCircuits: 0,
      synchronizationCircuits: 1,
      voiceCircuits: 5,
      concurrentChannel: 0,
      freeChannel: 30,
      usage: 0.0,
    },
  ];
  res.json(cclIpTraffic);
});

app.get('/cclTdmTraffic', (req, res) => {
  const cclTdmTraffic = [
    {
      icxName: 'BTCL',
      totalAssignmentE1: 1,
      signalingCircuits: 0,
      synchronizationCircuits: 1,
      voiceCircuits: 30,
      concurrentChannel: 0,
      freeChannel: 30,
      usage: 0.0,
    },
  ];
  res.json(cclTdmTraffic);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
