const express = require("express");

// Middleware for parsing JSON and URL-encoded request bodies
exports.parseRequestBodies = [
  express.json(),
  express.urlencoded({ extended: true })
];

// CORS middleware
exports.enableCORS = require("cors")();
