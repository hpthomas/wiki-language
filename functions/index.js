const functions = require('firebase-functions');
const admin = require("firebase-admin");
const cors = require('cors')({origin:true});
const request = require('request');
const rp = require('request-promise');
admin.initializeApp();

exports.translate = functions.https.onCall((data, context) => {
  // Message text passed from the client.
  const text = data.text;
  if (!context.auth) {
    return(null);
  }
  else {
    const text = data.text;
    const source = data.source;
    const target = data.target;
    const url = "https://translate.yandex.net/api/v1.5/tr.json/translate?"
    + "key=" + "trnsl.1.1.20200205T013905Z.0de4c4b30832e496.3852d7e768d335acbd45f02c5de795134c9dad15"
    + "&text=" + encodeURI(text)
    + "&lang=" + source + "-" + target;
    //console.log("text,src,targ,url:");
    //console.log(text);
    //console.log(source);
    //console.log(target);
    //console.log(url);
    return new rp(url);
  }
});
