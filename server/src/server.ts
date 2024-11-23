import dotenv from "dotenv"
import app from "./app";
import connectDB from "./config/database";
const PORT = process.env.PORT || 3000;

dotenv.config();

connectDB();

app.listen(PORT, () => {
    console.log(`⚙️  Server is running on http://localhost:${PORT}`);
})