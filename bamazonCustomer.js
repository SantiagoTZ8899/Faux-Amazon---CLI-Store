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
    connection.query(query,function (err, res) {
        if (err) throw err;

        // map the data response in a format I like, and make it show the info I need it show
        // show the customer the price
        let data = res.map(res => [`ID: ${res.id}\n`, ` ${res.product_name}\n`, ` Price: $${res.price} \n`]);
        console.log(`This is what we have for sale \n\n${data}`);
        console.log("-----------------");

        userChoices();

    });
}

// Function to prompt user to start purchasing order
function userChoices(inventory){
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter the ID of the item you would like to purchase",
            //      include a way to check if the input is a matching id number with an if/else statement, validate?
            validate: function(value) {
                if (ifNaN(value) === false) {
                    return true;
                    console.log("You should enter a matching ID number...");
                    }
                        return false;
                }
        }
    ]).then(funtion(value){
        let chosenItemId = parseInt(value.input);
        let itemName = checkInventory(chosenItemId, inventory);
    })
        
    
    //  save user quantity input to compare with the stoc

//  function to check inventory and if there is enough items in stock to sell
function checkInventory(chosenItemId, inventory) {
    // loop through the inventory, and check if the user ID-input matches any IDs in the database
    for (let i = 0; i < inventory.length; i++) {
        // if it matches, then return the item
        if(invertory[i].id === chosenItemId) {
            return inventory[i];
        }
    }
    return "that does not match our records";
}

//      function to check the quantity stock of items in database
//      console log the results

//      function to show total cost, include tax?

//      update database/inventory after an item is bought
