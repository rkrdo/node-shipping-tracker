var builder = require('xmlbuilder'),
    parseString = require('xml2js').parseString,
    http = require('http');

/*
 *
 * Private methods/members reference
 * http://javascript.crockford.com/private.html
 *
 */

function USPS(userID, shippingNumber) {
  var body = builder.create('TrackRequest').att('USERID', userID)
              .ele('TrackID', { 'ID': shippingNumber })
              .end({ pretty: false });

  var requestObj = {
    host: 'production.shippingapis.com',
    port: 80,
    path: '/ShippingAPITest.dll?API=TrackV2&XML=' + encodeURIComponent(body),
    headers: {
      'Content-Type': 'text/xml'
    }
  };

  this.fetchShippingInfo = function() {
   return http.get(requestObj, function(res) {
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
  };
}

module.exports = USPS;
