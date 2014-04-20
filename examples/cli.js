var SimpleTax = require("../lib/simpletax").SimpleTax,
    request = require("request"),
    qs = require("querystring"),
    url = require("url"),
    readline = require("readline");

var CONSUMER_KEY = "simpletaxclientdev",
    CONSUMER_SECRET = "simpletaxclientdev",
    AUTHZ_CALLBACK = "https://localhost/";


var authz_params = qs.stringify({
    client_id:CONSUMER_KEY,
    redirect_uri:AUTHZ_CALLBACK,
    state:'helloworld',
    response_type:'code'
});

console.log("Open this URL on your browser: " + SimpleTax.AUTHORIZE_URL+"?"+authz_params);
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Redirect URL: ", function(uri){
    rl.close();

    var obj = url.parse(uri,true,true);

    var post_params = {
                code:obj.query.code,
                client_id:CONSUMER_KEY,
                client_secret:CONSUMER_SECRET,
                grant_type:"authorization_code",
                redirect_uri:AUTHZ_CALLBACK,
            };

    request.post(SimpleTax.TOKEN_URL,{form:post_params,json:true},function(e,r,body){

        console.log("Ready to roll!"); 
        var simpletax = new SimpleTax(body.access_token);

        simpletax.addIncome(2500,null,"Node income",function(error,response,body){
            console.log("Added income...");
        });

        simpletax.addExpense(200,null,"Node expense",function(error,response,body){
            console.log("Added expense...");
        });

    });


});

