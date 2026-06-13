require('dotenv').config();
const mongoose = require('mongoose');
const { randomUUID } = require('crypto');
const connectDB = require('./db');
const Visitor = require('../Models/visitor');

const referrers = ['google', 'linkedin', 'direct', 'facebook', 'twitter'];

const weightedPages = [
    '/', '/', '/', '/', '/',
    '/services', '/services', '/services',
    '/about', '/about',
    '/contact',
    '/portfolio', '/portfolio'
];

const weightedCountries = [
    'India', 'India', 'India', 'India', 'India', 'India',
    'United States', 'United States',
    'UAE', 'UAE',
    'United Kingdom',
    'Singapore',
    'Australia',
    'Canada'
];

const randomDate = () => {
    const now = new Date();
    const dayAgo = Math.floor(Math.random() * 30);
    now.setDate(now.getDate() - dayAgo);
    return now;
};

const randomIp = () => `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

const seedDB = async () => {
    await connectDB();

    try {
        await Visitor.deleteMany({});
        console.log('Existing data cleared');

        const visitors = [];

        for (let index = 0; index < 50; index += 1) {
            const timestamp = randomDate();

            visitors.push({
                visitorId: randomUUID(),
                page: weightedPages[Math.floor(Math.random() * weightedPages.length)],
                referrer: referrers[Math.floor(Math.random() * referrers.length)],
                country: weightedCountries[Math.floor(Math.random() * weightedCountries.length)],
                ipAddress: randomIp(),
                visitDate: timestamp.toISOString().slice(0, 10),
                timestamp
            });
        }

        await Visitor.insertMany(visitors);
        console.log(`${visitors.length} visitor records seeded successfully`);
    } catch (err) {
        console.error('Seed error', err.message);
    } finally {
        mongoose.connection.close();
        console.log('Database connection closed');
    }
};

seedDB();
