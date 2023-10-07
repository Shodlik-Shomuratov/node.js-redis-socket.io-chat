import redis from 'redis';
import express from 'express';
import process from 'process';


const app = express();
const redisClient = await redis.createClient()
.on("error", err => {
    console.log("Redis Client Error: " + err.message);
})
.connect();
const publishClient = await redis.createClient()
.on("error", err => {
    console.log("Publish Client Error: " + err.message);
})
.connect();


// redisClient.on("message", function (channel, message) {
//     console.log(message);
// });


redisClient.subscribe("REQUESTS")


app.get("/", async (req, res) => {
    publishClient.publish(
        "REQUESTS",
        "Salom"
    );
    

    console.log(`Local log for ${req.url}`);
    

    res.send("Hello World")
    res.end();
});


app.listen(process.argv[2], () => {
    console.log(`App is running on port: ${process.argv[2]}`);
});
// app.listen(7000, () => {
//     console.log("App is running on port: 7000");
// });