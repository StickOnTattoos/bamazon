var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("-----------------------------------");
    console.log("Bamazon Online Store!");
    console.log("-----------------------------------");
    readProducts()
});

function readProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log("Here is what is for sale today!")
        console.log('-------------------------------------------------------------')

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
        }
        console.log('-------------------------------------------------------------')

        console.log(' ');
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Enter the ID number of the item you want to buy",
            },
            {
                type: "input",
                name: "qty",
                message: "How many do you want to buy?",
            }
        ]).then(function (answer) {

            var itemBought = (answer.id) - 1;
            var howMuch = parseInt(answer.qty);
            var Total = parseInt(((res[itemBought].price) * howMuch));

            if (res[itemBought].stock_quantity >= howMuch) {

                connection.query("UPDATE Products SET ? WHERE ?", [
                    { stock_quantity: (res[itemBought].stock_quantity - howMuch) },
                    { id: answer.id }
                ], function (err, result) {
                    if (err) throw err;
                    console.log("Your total is $" + Total + " Thanks for shopping!");
                });

            } else {
                console.log("Insufficient Quantity!");
            }
            buyAgain();
        });
    });
};

function buyAgain() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Make another purchase?"
        }
    ]).then(function (answer) {
        if (answer.confirm) {
            readProducts();
        } else {
            console.log("Goodbye!")
            connection.end();
        };
    });
};
