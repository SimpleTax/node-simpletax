var request = require("request");

var HOSTNAME = "https://secure.gosimpletax.com",
    AUTHORIZE_URL = HOSTNAME + "/o/authorize/",
    TOKEN_URL = HOSTNAME + "/o/token/",
    BASE_API = HOSTNAME + "/api/v2/uk",
    API_INCOME = BASE_API + "/incomes/",
    API_EXPENSE = BASE_API + "/expenses/";

exports.SimpleTax = function( bearer_token ){
    this._bearer = bearer_token;
}

exports.SimpleTax.AUTHORIZE_URL=AUTHORIZE_URL;
exports.SimpleTax.TOKEN_URL=TOKEN_URL;

exports.SimpleTax.prototype._get_today = function(){
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    return (d <= 9 ? '0' + d : d) + '/' + (m<=9 ? '0' + m : m) + '/' + y;
}

exports.SimpleTax.prototype._add_item = function(uri,amount,date,description,callback) {

    if (!date) date = this._get_today();

    var data = {
        fields: {
            value:amount,
            date:date,
            reference:description,
        }};

    request.post(uri,{
            headers: {Authorization: "Bearer " + this._bearer},
            body: JSON.stringify(data),
            json:true,
        },callback);

}

exports.SimpleTax.prototype.addIncome = function(amount,date,description,callback) {
    this._add_item(API_INCOME,amount,date,description,callback);
}

exports.SimpleTax.prototype.addExpense = function(amount,date,description,callback) {
    this._add_item(API_EXPENSE,amount,date,description,callback);
}

