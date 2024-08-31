import { Router } from "express";

const router  = Router();

router.get("", (_, res) => {
  res.send("Hello there");
})

export default router;
