require('dotenv').config();
const express = require("express");
const app = express();
const personRoutes = require("./routes/person");
const { parseRequestBodies, enableCORS } = require('./middlewares/middleware');
const persons = require('./utils/db');
app.set("db", persons);
// Middlewares
app.use(parseRequestBodies);
app.use(enableCORS);

// routes 
app.use("/person", personRoutes);

// port
const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`app is running on port ${PORT}`);
    });
}

module.exports = app;
