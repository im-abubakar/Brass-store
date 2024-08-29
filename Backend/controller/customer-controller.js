const Customer = require("../models/Customer");

// Add a new customer
const addCustomer = async (req, res) => {
    try {
        const { name, phoneNumber } = req.body;
        const newCustomer = new Customer({
            userID: req.body.userId,
            name,
            phoneNumber,
            date: req.body.date,
        });

        const savedCustomer = await newCustomer.save();
        res.status(201).send(savedCustomer);
    } catch (error) {
        res.status(500).json({ message: "Error adding customer", error });
    }
};


const getAllCustomers = async (req, res) => {
    try {

        // console.log("user param is",req.params.userId);
        // console.log("get all customers")
        const customers = await Customer.find({ userID: req.params.userId })
            .lean();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving customers", error });
    }
};

// Update a customer by ID
const updateCustomer = async (req, res) => {
    try {
        const { name, phoneNumber, date } = req.body;

        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            { name, phoneNumber, date },
            { new: true } // Returns the updated document
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: "Error updating customer", error });
    }
};

// Delete a customer by ID
const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting customer", error });
    }
};

const searchCustomer = async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const customers = await Customer.find({
        name: { $regex: searchTerm, $options: "i" },
    });
    res.json(customers);
}

module.exports = {
    addCustomer,
    getAllCustomers,
    deleteCustomer,
    updateCustomer,
    searchCustomer,
};