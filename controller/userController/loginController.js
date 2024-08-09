const userSchema = require('../../model/userSchema')




const login = (req, res) => {
    try {
        res.render('user/login', { title: 'Login', alertMessage: req.flash('error') })
    }
    catch (err) {
        console.log(`Error in rendering login page ${err}`)
    }
}

const loginPost = async (req, res) => {
    try {
        const checkUser = await userSchema.findOne({ email: req.body.email, password: req.body.password })
        if (!checkUser) {
            //if user not found, set flash message as alert and redirect
            req.flash('error', 'Invalid user credentials')
            res.redirect('/user/login')
        }
        else {
            // If user found, redirect to home
            res.redirect('/user/home')
        }

    }
    catch (err) {
        req.flash('error', 'An error occurred. Please try again later.'); // Set flash message for errors

        console.log(`Error in Login : ${err}`)
    }

}

const SignUp = (req, res) => {
    try {
        res.render('user/Sign-Up', { title: 'Sign-Up', alertMessage: req.flash('error') })
    }
    catch (err) {
        console.log(`Error in rendering Sign-   Up page, ${err}`)
    }
}

const SignUpPost = async (req, res) => {

    const { name, phoneNumber, email, password } = req.body;
    console.log("Form Data:", req.body);
    //res.redirect('/user/login')
    try {
        console.log("Req received")

        if (!name || !phoneNumber || !email || !password) {
            console.error('All fields are required');
            return res.redirect('/user/Sign-Up');
        }
        const userData = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password
        }
        // const validatePhoneNumber = (phoneNumber) => {
        //     return /^\d{10}$/.test(phoneNumber); // Check if phone number is exactly 10 digits
        // };



        //check whether User exists or not
        const checkUserExists = await userSchema.findOne({ email: req.body.email })

        if (!checkUserExists) {
            await userSchema.create(userData);
            console.log(userData)
            console.log('New User');
            res.redirect('/user/OTP');
        }
        else {
            console.log('User already exists.')
            res.redirect('/user/Sign-Up')
        }
    }
    catch (err) {
        console.error(`Error submitting data while Sign-Up, ${err}`)
    }
}

const otpPage = (req, res) => {
    res.render('user/OTP', { title: 'OTP Page' })
}


const ForgotPassword = (req, res) => {
    res.render('user/Forgot-Password', { title: 'Forgot-Password' })
}




module.exports = {
    login,
    loginPost,
    SignUp,
    SignUpPost,
    ForgotPassword,
    otpPage,

}