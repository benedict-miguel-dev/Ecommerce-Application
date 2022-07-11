const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        useriId: {
            type: String,
            required: true,
        },
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        amount: {
            type: Number,
            require: true
        },
        address: {
            type: Object,
            required: true
        },
        statis: {
            type: String,
            default: "pending"
        }

    }, { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema)