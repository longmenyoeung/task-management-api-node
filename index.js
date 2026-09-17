import "dotenv/config.js";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

//PORT 
const port = process.env.PORT || process.env.PORT1 || process.env.PORT2 || 8000;


//connnection db
connectDB();


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
});

