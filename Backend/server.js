const express = require("express");
const { main } = require("./models/Index");
const productRoute = require("./router/product-routes");
const customerRoute = require("./router/customer-routes")
const cors = require("cors");
const User = require("./models/User");
const authRoute = require("./router/auth-routes")

const app = express();
const PORT = 4000;
main();
app.use(express.json());
app.use(cors());


// Products API
app.use("/api/product", productRoute);

// Customer API
app.use("/api/customer", customerRoute)

 // Auth API
app.use("/api", authRoute)



// app.get("/testget", async (req,res)=>{
//   const result = await Product.findOne({ _id: '6429979b2e5434138eda1564'})
//   res.json(result)

// })

// Here we are listening to the server
app.listen(PORT, () => {
  console.log("I am live again");
});
