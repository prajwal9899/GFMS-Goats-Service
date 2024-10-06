import cors from "cors";
import express from "express";
import animalRouter from "./animal/animal-router";
import breedRouter from "./breed/breed-router";
import vaccineRouter from "./vaccine/vaccine-router";
import dashboardRouter from "./dashboard/dashboard-router";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://gfms-admin-dashboard.vercel.app/",
      "https://gfms-admin-dashboard.vercel.app",
      "https://gfms-hosting.web.app",
      "https://gfms-hosting.web.app/",
    ],
    credentials: true,
  }),
);

app.use(express.static("public"));
app.use(express.json());

app.use("/animals", animalRouter);
app.use("/breeds", breedRouter);
app.use("/vaccines", vaccineRouter);
app.use("/dashboard", dashboardRouter);

export default app;
