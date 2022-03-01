import express from "express";
import fs from "fs"

const authorsRouter = express.Router()

//1
/* authorsRouter.post("/", (request, response) => {
    console.log("I WORK");
})  */

//2 
authorsRouter.get("/", (request, response) => {
    console.log("I WORK");
    response.send({message: "RUSSIAN MILITARY VESSEL: FUCK OFF"})
})

//3
/* authorsRouter.get("/", (request, response) => {
    console.log("I WORK");
})

//4 
authorsRouter.put("/", (request, response) => {
    console.log("I WORK");
})

//5
authorsRouter.delete("/", (request, response) => {
    console.log("I WORK");
})
 */
export default authorsRouter