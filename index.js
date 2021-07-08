// const RtcTokenBuilder = require('../AgoraTokenGenerator/src/RtcTokenBuilder').RtcTokenBuilder;
// const RtcRole = require('../AgoraTokenGenerator/src/RtcTokenBuilder').Role;

// const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

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


// const express = require('express');
// const app = express();
// app.use(express.static('public'));
// app.listen(process.env.PORT || 3000, () => {
//     console.log('Application is started');
// });

// module.exports = {
//     RtcTokenBuilder: require('./src/RtcTokenBuilder').RtcTokenBuilder,
//     RtcRole: require('./src/RtcTokenBuilder').Role,
// }


// const {RtcTokenBuilder, RtcRole} = require('agora-access-token');
// export const agoraTempToken = https.onRequest((req,res) => {
//     const data = JSON.parse(req.body);
//     console.log(data);
//     console.log(req);
//     const channelName = data.name;
//     const batch = afs.batch();
//     if(!channelName) {
//         return res.status(400).json({'error': 'channel is required'}).send();
//     }
//     const token =RtcTokenBuilder.buildTokenWithAccount(appId, appCertificate, channelName, account, role);
//     console.log("Token is " + token);
//     return res.status(200).json({'status': 'success', 'token': token}).send();
// }


const express = require('express');
const {RtcTokenBuilder, RtcRole} = require('agora-access-token');
const { response } = require("express");
const PORT = 3000;
const APP_ID = 'f6a78f2a4c8f4cddbba5c9508b499645';
const APP_CERTIFICATE = '29cdd42f9e8944e9a0874c6da372ad0d';
const app = express();


const nocache = (req, response, next) => {
    response.header('Cache-Control','private, no-cache, no-store, must-revalidate');
    response.header('Expires', '-1');
    response.header('Pragma', 'no-cache');
    next();
};


const generateAccessToken =(req, res) => { 
    res.header('Access-Control-Allow-Origin', '*');
    const channelName = req.query.channelName;
    if(!channelName) {
        return res.status(500).json({'error': 'channel is required'});  
    }
    let uid =req.query.uid;
    if(!uid || uid == ''){
        uid = 0;
    }
    let role =RtcRole.PUBLISHER;
    let expireTime = req.query.expireTime;
    if(!expireTime || expireTime == ''){
        expireTime = 3600;
    } else {
        expireTime = parseInt(expireTime, 10);
    }
    const currentTime = Math.floor(Date.now / 1000);
    const privilageExpireTime = currentTime + expireTime;
    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilageExpireTime);  
    return res.json({'token': token});
};


app.get('/access_token', nocache, generateAccessToken);


app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port: ${PORT}`);
});