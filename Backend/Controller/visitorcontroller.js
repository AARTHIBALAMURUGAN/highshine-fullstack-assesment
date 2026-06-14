const Visitor = require('../Models/visitor');

const getVisitDate = (date = new Date()) => date.toISOString().slice(0, 10);

const createVisitor = async (req, res) => {
    try {
        const { page, referrer = 'direct', country } = req.body;

        if (!page || !country) {
            return res.status(400).json({ message: 'page and country are required fields' });
        }

        const visitor = await Visitor.create({
            page,
            referrer,
            country,
            visitDate: getVisitDate()
        });

        return res.status(201).json({ data: visitor });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getVisitorSummary = async (req, res) => {
    try {
        const page = await Visitor.aggregate([
            { $group: { _id: '$page', visits: { $sum: 1 } } },
            { $sort: { visits: -1 } },
            { $project: { page: '$_id', visits: 1, _id: 0 } }
        ]);

        const country = await Visitor.aggregate([
            { $group: { _id: '$country', visits: { $sum: 1 } } },
            { $sort: { visits: -1 } },
            { $project: { country: '$_id', visits: 1, _id: 0 } }
        ]);

        return res.status(200).json({ data: { page, country } });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getVisitorTrend = async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 29);

        const trend = await Visitor.aggregate([
            {
                $match: {
                    timestamp: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
                    },
                    visits: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
            { $project: { date: '$_id', visits: 1, _id: 0 } }
        ]);

        return res.status(200).json({ data: trend });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { createVisitor, getVisitorSummary, getVisitorTrend };
