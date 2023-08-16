const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const productRouter = require('./routes/products')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const orderRouter = require('./routes/orders')
const port = 3000

dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(() => console.log("db connected")).catch((err) => console.log(err))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))


app.use('/api/products', productRouter)
app.use('/api/', authRouter)
app.use('/api/orders/', orderRouter)
app.use('/api/users/', userRouter)



app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))