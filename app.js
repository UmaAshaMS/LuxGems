const express = require('express')
const session = require('express-session')
const dotenv = require('dotenv').config()
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const user = require('./router/userRouter')
const admin = require('./router/adminRouter')
const mongoDBconnection = require('./config/mongoDB')
const flash = require('connect-flash')
const app = express()


//Set EJS as the template engine
app.set('view engine', 'ejs');

//Use express-ejs-layouts for layout support 
app.use(expressLayouts);
app.set('layout', './layouts/layout')

//path setting
app.use('/public',express.static(path.join(__dirname,'public')))



// //body-Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//session
app.use(session({
    secret: 'Secret Key',
    resave: false,
    saveUninitialized: true,
}))
app.use(flash())

//routes
app.use('/user', user)
app.use('/admin', admin)



//Database connection 
mongoDBconnection()

app.get('/', (req, res) => {
    //res.send('Hello World !')
    res.redirect('user/home')
})


const port = process.env.PORT || 3000

app.listen(port, (err) => {
    if (err) {
        console.error('Error:', err)
    }
    else {
        console.log(`Server listening on http://localhost:${port}`)
        console.log(`Admin page at http://localhost:${port}/admin/adminLogin`)
    }
})