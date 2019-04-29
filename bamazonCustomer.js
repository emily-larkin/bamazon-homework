var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    showAll();
});


function showAll() {
    var query = "SELECT * FROM bamazon";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
        placeOrder();
    });
}


function placeOrder() {
    inquirer
        .prompt({
            name: "action",
            type: "input",
            message: "What is the ID of the product you would like to order?"
        })
        .then(function (answer) {
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_name === answer.choice) {
                    chosenItem = results[i];
                }
            }
            if (chosenItem.stock_quantity < parseInt(answer.order)) {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{
                            stock_quantity: answer.order
                        },
                        {
                            item_id: chosenItem.id
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("Order placed successfully!");
                        updateQuantity();
                        showAll();
                    }
                );
            } else {
                console.log("There is not enough inventory. Try again.");
                showAll();
            }
        });
}

function updateQuantity() {
    console.log("hi");
}