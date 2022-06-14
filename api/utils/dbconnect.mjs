// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoString = process.env.DATABASE_URL + process.env.DATABASE_NAME;

function connectToDB() {
    mongoose.connect(mongoString)
    .then(() => {
        console.log(`Connected to database : ${process.env.DATABASE_NAME}`);
    })
    .catch(err => {
        console.log(err);
    });
}

const db = mongoose.connection;

export {connectToDB, db};