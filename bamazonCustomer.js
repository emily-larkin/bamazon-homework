var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Password",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  showAll();
});

function showAll() {
  var query = "SELECT * FROM products";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
    placeOrder();
  });
}

function placeOrder() {
  inquirer
    .prompt([{
      name: "itemID",
      type: "input",
      message: "What is the ID of the product you would like to order?"
    }, {
      name: "quantity",
      type: "input",
      message: "What quantity would you like to order?"
    }])
    .then(function (answer) {
      connection.query(
          "UPDATE products SET stock_quantity=stock_quantity-? WHERE ?",
          [{
            stock_quantity: answer.quantity,
            item_id: answer.itemID
          }],
          function() {
            console.log("Order placed successfully!");
            console.log( "Updating stock...\n");
            connection.end();
          }
      );
    });
}
// {
//   console.log("There is not enough inventory. Try again.");
//   showAll();
// }