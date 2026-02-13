import express from "express";
import conn from "./connection/conn.js";
import router1 from "./routes/auth.js";
import router2 from "./routes/list.js";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json()); // parse JSON
app.use(cors({
      origin:  "https://todo-frontend-snowy-rho.vercel.app", // replace with your frontend URL
          
    credentials: true,
}));         // enable CORS

// Test route
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "✅ Backend connected" });
});

// Routes
app.use("/api/v1", router1); // /api/v1/register
app.use("/api/v2", router2); // /api/v2/addTask

// DB connection for serverless (run once per cold start)
let dbConnected = false;

const initDB = async () => {
  if (!dbConnected) {
    try {
      await conn();
      dbConnected = true;
      console.log("✅ Database connected");
    } catch (err) {
      console.error("❌ DB connection failed:", err.message);
    }
  }
};

// Initialize DB immediately (cold start)
initDB();

// Export app for serverless platforms to use
export default app;












//////////////////   its mine ////////////////////////////////

// import express from "express";
// import conn from "./connection/conn.js";
// import router1 from "./routes/auth.js";
// import router2 from "./routes/list.js";

// import cors from 'cors'

// const app = express();

// // START SERVER ONLY AFTER DB CONNECTS
// const startServer = async () => {
//   try {
//     await conn(); // ⬅️ WAIT HERE
//     app.listen(3000, () => {
//       console.log(" Server running on http://localhost:3000");
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error.message);
//   }
// };

// // Middleware
// app.use(express.json());                //(before routes compulsory// parse JSON body  
// app.use(cors())                     //cors use

// app.get("/api/v1/test", (req, res) => {
//   res.json({ message: "✅ Backend connected" });
// });


// // 4 Routes
// app.use("/api/v1", router1);  // POST → /api/v1/register users
// app.use("/api/v2", router2);   // POST → /api/v2/addTask 

// //  Start server
// app.listen(3000, () => {
//   console.log("🚀 Server running on http://localhost:3000");
// });


// startServer();





