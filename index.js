require('dotenv').config();
const express = require("express");
const app = express();
const personRoutes = require("./routes/person");
const middleware = require('./middlewares/middleware');
const persons = require('./utils/db');
app.set("db", persons);

// Middlewares
app.use(middleware.parseRequestBodies);
app.use(middleware.enableCORS);

// Routes
app.use("/person", personRoutes);

// Error handling middleware
app.use(middleware.handleNonExistingEndpoints);
app.use(middleware.handleError);

// Port
const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`app is running on port ${PORT}`);
    });
}

module.exports = app;
