
/*  Configure Express*/
const express = require('express')
const app = express()
/* Configuring Routes */
app.use(express.json())
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")

/* Using dotenv */
const dotenv = require('dotenv')
dotenv.config();
/* Configure Mongoose */
const mongoose = require('mongoose')
mongoose.
    connect(
        process.env.MONGO_URL
    ).then(() => {
        console.log('Database Connection Successful')
    }).catch((err) => {
        console.log(err)
    })

/* Configuring Paths */
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Port On ${process.env.PORT}`)
})




