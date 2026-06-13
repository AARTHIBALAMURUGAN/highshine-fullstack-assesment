const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
    {
        visitorId: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        page: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        referrer: {
            type: String,
            default: 'direct',
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        ipAddress: {
            type: String,
            trim: true,
            index: true
        },
        visitDate: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        timestamp: {
            type: Date,
            default: Date.now,
            index: true
        }
    },
    {
        versionKey: false
    }
);

visitorSchema.index({ visitorId: 1, visitDate: 1 }, { unique: true });
visitorSchema.index({ visitDate: 1, timestamp: -1 });
visitorSchema.index({ page: 1, visitDate: 1 });
visitorSchema.index({ country: 1, visitDate: 1 });

module.exports = mongoose.model('visitor', visitorSchema);
