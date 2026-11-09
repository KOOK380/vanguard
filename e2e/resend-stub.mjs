// A local stand-in for the Resend API, so the enquiry form's success path can be tested without
// sending real email. GET /__sent lists what the site sent, and DELETE /__sent clears it.
import http from "node:http";

let sent = [];

http
  .createServer((req, res) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      res.setHeader("Content-Type", "application/json");
      if (req.url === "/__sent") {
        if (req.method === "DELETE") sent = [];
        return res.end(JSON.stringify(sent));
      }
      if (req.method === "POST" && req.url.startsWith("/emails")) sent.push(JSON.parse(body));
      res.end(JSON.stringify({ id: `stub_${sent.length}`, object: "contact" }));
    });
  })
  .listen(4100);
