let mysql = require("mysql");

let inquirer = require("inquirer");

let connection = mysql.createConnection( {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
} );

connection.connect(function(err) {
    if (err) throw err;
    console.log("-------------------------");
    console.log("Welcome to Faux Amazon...");
    console.log("-------------------------");
    displayProducts();
});

// Function to display the product info through querys to the database
function displayProducts() {
    let query = "SELECT * FROM products";
    connection.query(query,function (err, res) {
        if (err) throw err;
        let data = res.map(res => [`ID: ${res.id}`, ` ${res.product_name}`, ` Price: $${res.price} `]);
        console.log(`This is what we have for sale \n\n${data}`);
        console.log("-----------------");
    });
}
// Function to prompt user which item to buy, and how many
//      include a way to check if the input is a number
//      check inventory and if there is enough items in stock to sell
//      update database/inventory after an item is bought
//      show the customer the price
