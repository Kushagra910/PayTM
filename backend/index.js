const express = require("express");
const app = express();
const database = require("./configs/db");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());
const route = require("./routes/route");
app.use("/api/v1",route);

database.connect();

app.listen(process.env.PORT,()=>{
  console.log(`App is running at PORT ${process.env.PORT}`)
});

app.get('/',(req,res)=>{
  return res.json({
    success:true,
    message:"Your sever is running"
  })
})

