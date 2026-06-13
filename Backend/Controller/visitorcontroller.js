const Visitor = require('../Models/visitor');


const getClientIp = (req) => {
    const forwardedFor = req.headers['x-forwarded-for'];
    const firstForwardedIp = Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : forwardedFor;

    const rawIp = firstForwardedIp?.split(',')[0]?.trim() || req.ip || req.socket?.remoteAddress || 'unknown';

    return rawIp.startsWith('::ffff:') ? rawIp.replace('::ffff:', '') : rawIp;
};

const getVisitDate = (date = new Date()) => date.toISOString().slice(0, 10);


const countPipeline = (fieldName, limit = 10) => ([
    { $group: { _id: `$${fieldName}`, visits: { $sum: 1 } } },
    { $sort: { visits: -1 } },
    { $limit: limit },
    { $project: { _id: 0, [fieldName]: '$_id', visits: 1 } }
]);

const createVisitor = async (req, res) => {
    try {
        const { visitorId, page, referrer = 'direct', country } = req.body;

        if (!visitorId || !page || !country) {
            return res.status(400).json({
                message: 'visitorId, page and country are required fields'
            });
        }

        const visitDate = getVisitDate();
        const ipAddress = getClientIp(req);

        const result = await Visitor.findOneAndUpdate(
            { visitorId, visitDate },
            {
                $setOnInsert: {
                    visitorId,
                    page,
                    referrer,
                    country,
                    ipAddress,
                    visitDate
                }
            },
            {
                upsert: true,
                new: true,
                includeResultMetadata: true,
                runValidators: true,
                setDefaultsOnInsert: true
            }
        );

        const alreadyCounted = Boolean(result?.lastErrorObject?.updatedExisting);

        return res.status(alreadyCounted ? 200 : 201).json({
            alreadyCounted,
            data: result?.value || null
        });
    } catch (err) {
        if (err?.code === 11000) {
            return res.status(200).json({
                alreadyCounted: true,
                message: 'Visitor already counted for today'
            });
        }

        return res.status(500).json({
            message: 'Failed to create visitor record',
            error: err.message
        });
    }
};

const getVisitorSummary = async (req, res) => {
    try {
        const [page, country] = await Promise.all([
            Visitor.aggregate(countPipeline('page', 10)),
            Visitor.aggregate(countPipeline('country', 10))
        ]);

        return res.status(200).json({
            data: {
                page,
                country
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Failed to fetch visitor summary',
            error: err.message
        });
    }
};

const getVisitorTrend = async (req, res) => {
    try {
        const startDate = getVisitDate(new Date(Date.now() - 29 * 24 * 60 * 60 * 1000));

        const trend = await Visitor.aggregate([
            {
                $match: {
                    visitDate: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: '$visitDate',
                    visits: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
            { $project: { _id: 0, date: '$_id', visits: 1 } }
        ]);

        return res.status(200).json({ data: trend });
    } catch (err) {
        return res.status(500).json({
            message: 'Failed to fetch visitor trend',
            error: err.message
        });
    }
};

const getDashboardSummary = async (req, res) => {
    try {
        const today = getVisitDate();
        const startDate = getVisitDate(new Date(Date.now() - 29 * 24 * 60 * 60 * 1000));

        const [
            totalUniqueVisitorsResult,
            todayUniqueVisitors,
            totalVisits,
            topPages,
            topCountries,
            last30DaysTrend
        ] = await Promise.all([
            Visitor.aggregate([
                { $group: { _id: '$visitorId' } },
                { $count: 'count' }
            ]),
            Visitor.countDocuments({ visitDate: today }),
            Visitor.countDocuments({}),
            Visitor.aggregate(countPipeline('page', 5)),
            Visitor.aggregate(countPipeline('country', 5)),
            Visitor.aggregate([
                {
                    $match: {
                        visitDate: { $gte: startDate }
                    }
                },
                {
                    $group: {
                        _id: '$visitDate',
                        visits: { $sum: 1 }
                    }
                },
                { $sort: { _id: 1 } },
                { $project: { _id: 0, date: '$_id', visits: 1 } }
            ])
        ]);

        return res.status(200).json({
            data: {
                totalUniqueVisitors: totalUniqueVisitorsResult[0]?.count || 0,
                todayUniqueVisitors,
                totalVisits,
                topPages,
                topCountries,
                last30DaysTrend
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Failed to fetch dashboard summary',
            error: err.message
        });
    }
};

module.exports = {
    createVisitor,
    getVisitorSummary,
    getVisitorTrend,
    getDashboardSummary
};
