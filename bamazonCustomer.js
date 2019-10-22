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
    
    // query/get info from linked sql database/table
    let query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;

        // map the data response in a format I like, and make it show the info I need it show
        // show the customer the price
        let data = res.map(res => [` ID: ${res.id}\n`, ` ${res.product_name}\n`, ` Price: $${res.price} \n`]);
        console.log(`This is what we have for sale \n\n${data}`);
        console.log("-----------------");

        userItemChoice();
        quitShopping();

    });
}

// Function to prompt user to start purchasing order
function userItemChoice(inventory){
    inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: "Enter the ID of the item you would like to purchase [exit with q]",

            // include a way to check if the input is a matching id number with an if/else statement, validate?

            validate: function(val) {
                return !isNaN(val) || val.toLowerCase() === "q";
                }
            }
    ]).then(function(val) {

        //  save user quantity input to compare with the stock
        // turn string into a number

        quitShopping(val.choice);
        let chosenItemId = parseInt(val.choice);
        let itemName = checkInventory(chosenItemId, inventory);

        // prompt customer with desired quantity if there is a matching product ID in the database from other function
        // console log if not enough
        if (itemName) {
            userQuantityChoice(itemName);
        } else {
            console.log("Sorry, we do not have that item");
            // send customer back to the product list
            displayProducts();
        }
    });
}

// function to ask user for desired quantity, similar to above function
function userQuantityChoice(itemName) {
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many would you like?",
            validate: function(val){
                return val > 0 || val.toLowerCase() === "q";
            }
        }
    ]).then(function(val) {
        // turn strin into a number
        quitShopping(val.quantity);
        let quantity = parseInt(val.quantity);

        // loop through the database to check if there if enough inventory of the chosen item
        if (quantity > itemName.stock_quantity) {
            console.log("Sorry, we do not have enough of that item.");
            displayProducts();
        } else {
            purchaseItem(itemName, quantity);
        }
    });
}

// function to purchase the item
// update database/inventory after an item is bought
function purchaseItem(itemName, quantity){
    connection.query( "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, itemName.id],
    function (err, res) {
        console.log("You purchased " + quantity + " " + itemName.product_name);
        displayProducts();
        }
    );
}

//  function to check inventory and if there is enough items in stock to sell
function checkInventory(chosenItemId, inventory) {
    // loop through the inventory, and check if the user ID-input matches any IDs in the database
    for (let i = 0; i < product.length; i++) {
        // if it matches, then return the item
        if (inventory[i].id === chosenItemId) {
            return inventory[i];
        }
    }
    return null;
}

function quitShopping(choice) {
    if (choice === "q") {
        console.log("Thank you, come again.");
        process.exit();
    }
}