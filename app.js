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
const Swal = require('sweetalert2')
const nocache = require('nocache');





//Set EJS as the template engine
app.set('view engine', 'ejs');

//No-cache middleware
app.use(nocache())
//session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

//Use express-ejs-layouts for layout support 
app.use(expressLayouts);
app.set('layout', './layouts/layout')

//path setting
app.use('/public',express.static(path.join(__dirname,'public')))



//body-Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//No-cache middleware
app.use(nocache())
//session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

//Flash messages
app.use(flash())

//routes
app.use('/', user)
app.use('/admin', admin)



//Database connection 
mongoDBconnection()

app.get('/', (req, res) => {
    res.redirect('user/home')
})

app.get('*',(req,res) => {
    res.render('pageNotFound',{ title: 'Page Not Found' })
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