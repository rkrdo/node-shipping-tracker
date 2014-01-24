# node-shipping-tracker

Track your USPS/UPS packages from the command line

## Getting Started
Install the module with: `npm install node-shipping-tracker -g`

##Using it with USPS

In order to use this tool, you need to register on the [USPS Developer Center](https://www.usps.com/business/web-tools-apis/developers-center.htm), once you register and get an email with your username, all you need to do is create a `.node_shipping_tracker_conf.json` file in your Home directory with the following format:

```
  {
    "usps": {
      "userID": "USERID"
    }
  }
```
USERID being the username you received via email.

Then run in the command line `trackjs usps ShippingNumber`, being ShippingNumber your package's tracking number `e.g. EJ958083578US`, and you should receive your shipment's feedback: e.g. `There is no record of that mail item. If it was mailed recently, it may not yet be tracked. Please try again later.` or `Your shipment was accepted/picked up at 5:48 am on January 23, 2014 in AUSTIN, TX 12345.`


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- 2014-01-23	v0.1.1	Updated the README with more info regarding USPS
- 2014-01-23	v0.1.0	Finished first version with USPS support


## TODO
- Add UPS support
- Add tests


## License
Copyright (c) 2014 Ricardo Cruz
Licensed under the MIT license.
