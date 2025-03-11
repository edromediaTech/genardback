const mongoose = require("mongoose");

const debtSchema = new mongoose.Schema({
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    totalOwed: { type: Number, default: 0 }, // Montant total dû
    lastUpdated: { type: Date, default: Date.now },
    status: { type: String, enum: ["open", "closed"], default: "open" }
});

module.exports = mongoose.model("Debt", debtSchema);
