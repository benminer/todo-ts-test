import { api, data, params } from "@serverless/cloud";
import { readFile } from "fs/promises";

// Create GET route and return users
api.get("/users", async (req, res) => {
  // Get users from Serverless Data
  let result = await data.get("user:*", true);
  // Return the results
  res.send({
    users: result.items,
  });
});

api.get("/number", (req, res) => {
  console.log("hello from number");
  return res.send(500);
});

api.get("/params", async (req, res) => {
  return res.send({
    params,
  });
});

api.get("/large-file", async (req, res) => {
  return res.json({
    file: Buffer.alloc(226394240).fill("hello world").toString("utf8"),
  });
});

api.get("/get", async (req, res) => {
  const result = await data.get("user:*", { limit: 1 });
  console.log(result);
  return res.sendStatus(200);
});

api.get("/label", async (_req, res) => {
  let resultByLabel = await data.getByLabel("label1", "active:*", { limit: 1 });
  while (resultByLabel) {
    console.log(resultByLabel, "resultByLabel");
    resultByLabel = resultByLabel.next ? await resultByLabel.next() : null;
  }

  return res.sendStatus(200);
});

// Redirect to users endpoint
api.get("/*", (req, res) => {
  res.redirect("/users");
});
