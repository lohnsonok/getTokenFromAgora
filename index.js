// const RtcTokenBuilder = require('../AgoraTokenGenerator/src/RtcTokenBuilder').RtcTokenBuilder;
// const RtcRole = require('../AgoraTokenGenerator/src/RtcTokenBuilder').Role;

// const appID = 'f6a78f2a4c8f4cddbba5c9508b499645';
// const appCertificate = '29cdd42f9e8944e9a0874c6da372ad0d';
// var channelName = '';
// const uid = 2882341273;
// // const account = "2882341273";
// const role = RtcRole.ADMIN;

// // const expirationTimeInSeconds = 3600
// // const currentTimestamp = Math.floor(Date.now() / 1000)
// // const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

// // const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
// // console.log("Token With Integer Number Uid: " + tokenA);



// const express = require("express");
// const app = express();
// app.get("/token:roomName",(req, res) => {
//     channelName = req.params.roomName;
//     const token = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, 0 , role);
//     console.log(channelName);
//     res.send(token);

// });
// app.listen('3000');


const express = require('express');
const app = express();
app.use(Express.static('public'));
app.listen(process.env.PORT || 3000, () => {
    console.log('Application is started');
});