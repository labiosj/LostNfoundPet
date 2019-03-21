const compression = require("compression");
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');

// Set the port to 3000 OR let the process set the port (if deployed to Heroku)
const PORT = process.env.PORT || 5000;

// Initialize Express
const app = express();
app.use(compression());
app.use(cors({ credentials: true, origin: true }))

/* Redirect http to https */
app.get("*", (req, res, next) => {
  if (
    req.headers["x-forwarded-proto"] !== "https" &&
    process.env.NODE_ENV === "production"
  )
    res.redirect("https://" + req.headers.host + req.url);
  else next(); /* Continue to other routes if we're not redirecting */
});

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
})
// Routes
// API Routes (require from routes file and pass in Express app)
require("./routes/api-routes")(app);

// Start the server
app.listen(PORT, function () {
  console.log(`App running on port ${PORT}`);
});