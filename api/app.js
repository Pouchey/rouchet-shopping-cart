// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
import dotenv from 'dotenv';
import express from 'express';
import {connectToDB} from './utils/dbconnect.mjs';


import router from './routes/routes.mjs';
// --------------------------------------------------------------
// Initialize server
// --------------------------------------------------------------
dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();
connectToDB();

app.use(express.json());



// --------------------------------------------------------------
// Routes
// --------------------------------------------------------------
app.use("/images", express.static("./images"));

app.use('/api',router);

// --------------------------------------------------------------
// Start server
// --------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})