const express = require("express");
const app = express();
const customer = require("../controller/customer-controller");

// Route to add a new customer
app.post("/add", customer.addCustomer);

// Route to get all customers
app.get("/get/:userId", customer.getAllCustomers);

// Route to delete a customer by ID
app.delete("/delete/:id", customer.deleteCustomer);

// Route to update a customer by ID
app.put("/update/:id", customer.updateCustomer);

app.get("/search", customer.searchCustomer)


module.exports = app;
