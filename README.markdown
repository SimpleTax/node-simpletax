# Node.js wrapper for SimpleTax API

SimpleTax (http://gosimpletax.com) is the free, web-based tax software that helps you easily find the most savings and ensures you file an accurate tax return, no matter how complicated your affairs are.

This Node.js library allows you to integrate your application with SimpleTax via it's REST API. It relies on node-request for authorising access to a user's account.

# Installation

The fast way to install the library is:
```
npm install node-simpletax
```

# Usage

This library relies on your software having previously obtained an OAuth2 Bearer token through the OAuth authorization process.

To request an OAuth client ID and secret please contact the SimpleTax team, at hello@gosimpletax.com.

Sample code to make API calls is available in the example directory.

