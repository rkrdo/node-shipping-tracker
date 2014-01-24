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
    http = require('http');

/*    USPS Tracking API Documentation
 *    https://www.usps.com/business/web-tools-apis/track-and-confirm-v1-3a.htm
 */

/* Error XML Example
  <Error>
     <Number></Number>
     <Source></Source>
     <Description></Description>
     <HelpFile></HelpFile>
     <HelpContext></HelpContext>
   </Error>
*/

/* Request example
    <TrackRequest USERID="xxxxxxxxx">
      <TrackID ID="EJ958083578US"></TrackID>
    </TrackRequest>
 */

/* Response example
 *
 *  <TrackResponse> *required
 *    <TrackInfo ID="E123456780US"> *required
 *      <TrackSummary> Your item was delivered at 6:50 am on February 6 in BARTOW FL 33830.</TrackSummary> *required
 *      <TrackDetail>February 6 6:49 am NOTICE LEFT BARTOW FL 33830</TrackDetail> *required
 *      <TrackDetail>February 6 6:48 am ARRIVAL AT UNIT BARTOW FL 33830</TrackDetail>
 *      <TrackDetail>February 6 3:49 am ARRIVAL AT UNIT LAKELAND FL 33805</TrackDetail>
 *      <TrackDetail>February 5 7:28 pm ENROUTE 33699</TrackDetail>
 *      <TrackDetail>February 5 7:18 pm ACCEPT OR PICKUP 33699</TrackDetail>
 *    </TrackInfo>
 *    <TrackInfo ID="E123456781US">
 *      <TrackSummary There is no record of that mail item. If it was mailed recently, It may not yet be tracked. Please try again later. </TrackSummary>
 *    </TrackInfo>
 *    <TrackInfo ID="12345">
 *      <TrackSummary> That's not a valid number. Please check to make sure you entered it correctly.</TrackSummary>
 *    </TrackInfo>
 *  </TrackResponse>
 */

var body = builder.create('TrackRequest').att('USERID', 'xxxxxxx')
    .ele('TrackID', { 'ID': 'E1234567889US' })
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
   res.on( "data", function(data){ buffer = buffer + data; } );
   res.on( "end", function(){ console.log( buffer ); } );
}).on('error', function(e){
  console.log("Got error: " + e.message);
});
