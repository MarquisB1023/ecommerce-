const authRouter = require("express").Router();
const { authenticate, isLoggedIn, fetchUsers } = require("../server/user.js");

authRouter.post("/login", async (req, res, next) => {
  try {
    res.send(await authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

authRouter.get("/me", isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

authRouter.get("/users", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

module.exports = authRouter;
