#! /usr/bin/env node
/*
 * track.js
 *
 *
 * Copyright (c) 2014 Ricardo Cruz
 * Licensed under the MIT license.
 */

'use strict';

/*
 *
 * REQUIRES
 *
 */

var builder = require('xmlbuilder'),
    parseString = require('xml2js').parseString,
    http = require('http'),
    fs = require('fs'),
    params = process.argv.slice(2);

/*    USPS Tracking API Documentation
 *    https://www.usps.com/business/web-tools-apis/track-and-confirm-v1-3a.htm
 */

if (!params[0]) {
  console.log("Wrong number of parameters");
  console.log("e.g. trackjs ShippingNumber");
  process.exit();
}

var configOptions = {};
var configFile = process.env.HOME + '/.node_shipping_tracker_conf.json';

configOptions = JSON.parse(fs.readFileSync(configFile));
var uspsOptions = configOptions.usps;

if (!uspsOptions || !uspsOptions.userID) {
  console.log("Please set your USPS options in your config file.");
  console.log("e.g. \n{ \n  \"usps\":  { \n    \"userID\": \"123456ED\" \n  } \n}");
  console.log("ABORTING!");
  process.exit();
}

var body = builder.create('TrackRequest').att('USERID', uspsOptions.userID)
    .ele('TrackID', { 'ID': params[0] })
    .end({ pretty: false });

var getRequest = {
  host: 'production.shippingapis.com',
  port: 80,
  path: '/ShippingAPITest.dll?API=TrackV2&XML=' + encodeURIComponent(body),
  headers: {
    'Content-Type': 'text/xml'
  }
};

http.get(getRequest, function(res) {
   var buffer = "";
   res.on("data", function(data){ buffer = buffer + data; });
   res.on("end", function(){
     parseString(buffer, function(err, result) {
       console.log(result.TrackResponse.TrackInfo[0].TrackSummary.join(''));
     });
   });
}).on('error', function(e){
  console.log("Got error: " + e.message);
});
