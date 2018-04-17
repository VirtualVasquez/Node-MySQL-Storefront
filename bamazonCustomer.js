var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  showroom(); //item_id, product_name, price
 });

 function showroom() {
 	console.log("\n Hello! Welcome to bamazon. Take a look at our wares.\n");
 	connection.query("Select * FROM products", function(err, res){
 		if (err) throw err;
 		for (var i = 0; i < res.length; i++) {
 			console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name, " || Price: " + res[i].price)};
 		IDselect();
 	});
 }

//read ID number/product selected
 function IDselect() {
 	inquirer
 	 	.prompt([
 	 		{
 			name: "item_id",
 			type: "input",
 			message: "What product ID would you like to buy?"
 			},
 			{
 			name: "stock_quantity",
 			type: "input",
 			message: "How many would you like to buy?"	
 			}
 		])
 	 	.then(function(answer){
 			var query = "SELECT * FROM products WHERE ?";
 			connection.query(query, {item_id : answer.item_id}, function(err, res) {
        var cost = res[0].price;
        var updateStock = res[0].stock_quantity - answer.stock_quantity;
 				//compare order quantity vs. stock; if not enough, return to showroom
 				if (answer.stock_quantity > res[0].stock_quantity) {
 					console.log("\n Insufficient quantity!\n");
 					return showroom();
 				}
        else{
          var query2 = "UPDATE products SET ? WHERE ?";
          connection.query(query2, 
          [
          {stock_quantity : updateStock}
          ,
          {item_id : answer.item_id}
          ], 
          function(err, res){
            var total = answer.stock_quantity * cost;
            console.log("\n Thank you for your purchase! Your total will be $" + total);
            newOrder();
         })          
        }
 			})
 		})
 }

 function newOrder() {
  inquirer
  .prompt(
  {
    type: "confirm",
    message: "Would you like to make a new order?",
    name: "confirm",
    default: true
  })
  .then(function(answer) {
    if (answer.confirm){
      return showroom();
    }
    else {
      console.log("\nHope to see you again soon!\n");
      connection.end();
    }
  })
 }
