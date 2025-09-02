exports.getDashboard = async (req, res) => {
  try {
    res.json({
      message: `Welcome ${req.user.name}`,
      userId: req.user.id,
    });
  } catch {
    res.status(500).json({ error: "Server error in dashboard" });
  }
};
