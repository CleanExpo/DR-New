// Bypass Vercel Authentication
module.exports = (req, res) => {
  res.status(200).json({
    message: 'Public API',
    authenticated: false,
    public: true
  });
};