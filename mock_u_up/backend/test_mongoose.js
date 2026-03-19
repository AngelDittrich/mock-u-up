require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/user');
const bcrypt = require('bcryptjs');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected");
        const hashed = await bcrypt.hash("test", 10);
        const u = await User.create({ email: "test@test.com", password: hashed });
        console.log("Created user:", JSON.stringify(u, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
};

run();
