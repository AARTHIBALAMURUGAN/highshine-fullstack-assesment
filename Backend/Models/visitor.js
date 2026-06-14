const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        trim: true
    },
    referrer: {
        type: String,
        default: 'direct',
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    visitDate: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

visitorSchema.index({ page: 1, visitDate: 1 });
visitorSchema.index({ country: 1, visitDate: 1 });
visitorSchema.index({ visitDate: 1, timestamp: -1 });

module.exports = mongoose.model('visitor', visitorSchema);
