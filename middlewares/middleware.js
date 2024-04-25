const express = require("express");

// Middleware for parsing JSON and URL-encoded request bodies
exports.parseRequestBodies = [
  express.json(),
  express.urlencoded({ extended: true }),
];

// Middleware to handle non-existing endpoints
exports.handleNonExistingEndpoints = (req, res, next) => {
  res.status(404).json({ isSuccess: false, message: "Endpoint not found" });
};

// Error handling middleware
exports.handleError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ isSuccess: false, message: "Internal Server Error" });
};

// CORS middleware
exports.enableCORS = require("cors")();
