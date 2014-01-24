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

var fs = require('fs'),
    params = process.argv.slice(2),
    shippingMethod = params[0],
    shippingNumber = params[1],
    USPS = require('./usps');

/*    USPS Tracking API Documentation
 *    https://www.usps.com/business/web-tools-apis/track-and-confirm-v1-3a.htm
 */

if (!/usps/i.test(shippingMethod)) {
  console.log("Wrong number of parameters");
  console.log("e.g. trackjs USPS ShippingNumber");
  process.exit();
}

var configOptions = {};
var configFile = process.env.HOME + '/.node_shipping_tracker_conf.json';

configOptions = JSON.parse(fs.readFileSync(configFile));
if (/usps/i.test(shippingMethod)) {

  var uspsOptions = configOptions.usps;

  if (!uspsOptions || !uspsOptions.userID) {
    console.log("Please set your USPS options in your config file.");
    console.log("e.g. \n{ \n  \"usps\":  { \n    \"userID\": \"123456ED\" \n  } \n}");
    console.log("ABORTING!");
    process.exit();
  }

  var usps = new USPS(uspsOptions.userID, shippingNumber);
  usps.fetchShippingInfo();
}
