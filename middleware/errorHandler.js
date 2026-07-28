export default function errorHandler(err, req, res) {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "CastError") {
    // usually mongoose cast errors for invalid ObjectId
    return res.status(400).json({ error: "Malformed id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.code && err.code === 11000) {
    // Mongo duplicate key
    return res.status(409).json({ error: "Duplicate key error" });
  }

  res.status(500).json({ error: "Internal server error" });
}
