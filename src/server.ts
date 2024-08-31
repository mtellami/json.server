import { Logger } from "./utils/logger";
import app from "./app";

const port = 3000;

app.listen(port, () => {
  Logger.success("Server is running on http://localhost:", port);
});
