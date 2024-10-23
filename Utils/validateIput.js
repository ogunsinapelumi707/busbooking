
export const validateInput = (req, res, next) => {
    const { platenumber, capacity, origin, destination } = req.body;
    if (!platenumber || !capacity || !origin || !destination) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    next();
  };
  