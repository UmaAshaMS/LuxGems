const userSchema = require('../../model/userSchema')
const bcrypt = require('bcrypt')
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');




// Set up email transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your.email@gmail.com',
        pass: 'yourpassword'
    }
});






const login = (req, res) => {
    try {
        res.render('user/login', {
            title: 'Login',
            user: req.session.user,
            alertMessage: req.flash('error'),
            query: req.query
        })
    }
    catch (err) {
        console.log(`Error in rendering login page ${err}`)
    }
}

const loginPost = async (req, res) => {
    try {
        //find from the database
        const checkUser = await userSchema.findOne({ email: req.body.email, password: req.body.password })

        if (!checkUser) {
            //if user not found, set flash message as alert and redirect
            req.flash('error', 'Invalid user credentials')
            res.redirect('/user/login')
        }
        if (checkUser.isBlocked) {
            // User is blocked, set flash message and redirect
            console.log("User blocked")
            req.flash('error', 'Your account has been blocked. Please contact support.');
            return res.redirect('/user/login');
        }

        // If user found and not blocked by admin, redirect to home
        res.redirect('/user/home')

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
            password: await bcrypt.hash(req.body.password.toString(), 10)
        }

        //check whether User exists or not
        const checkUserExists = await userSchema.findOne({ email: req.body.email })

        if (!checkUserExists) {
            await userSchema.create(userData);
            console.log(userData)
            console.log('New User');

            if (emailRegex.test(req.body.email)) {
                // Generate and send OTP
                await generateAndSendOTP(email);
                res.redirect('/user/OTP');  // Redirect to OTP verification page

            }
        }
        else {
            req.flash('error', 'User already exists')
            console.log('User already exists.')
            res.redirect('/user/Sign-Up')
        }
    }
    catch (err) {
        console.error(`Error submitting data while Sign-Up, ${err}`)
    }
}

const otpPage = (req, res) => {
    res.render('user/OTPverify', { title: 'OTP Page' })
}

const otpVerify = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        // Check if OTP matches the one stored for the user
        const user = await userSchema.findOne({ email });

        if (user && user.otp === otp) {
            // OTP is correct, you can proceed to log the user in or take other actions
            console.log('OTP verified successfully');
            res.redirect('/user/home');  // Redirect to home or another page
        } else {
            // OTP is incorrect
            req.flash('error', 'Invalid OTP');
            res.redirect('/user/OTP');  // Redirect back to OTP page
        }
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.redirect('/user/OTP');
    }
};



const ForgotPassword = (req, res) => {
    res.render('user/Forgot-Password', { title: 'Forgot-Password' })
}

const ForgotPasswordpost = (req, res) => {
    try {
        res.render('user/otpVerify', { title: 'OTP Verify' })
    }
    catch (err) {
        console.error(err)
    }
}



const generateAndSendOTP = async (userEmail) => {
    try {
        // Generate OTP
        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

        // Save OTP to user's record (assuming you have a field for OTP in your schema)
        await userSchema.updateOne({ email: userEmail }, { otp });

        // Send OTP via email
        let mailOptions = {
            from: 'your.email@gmail.com',
            to: userEmail,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };

        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Error generating or sending OTP:', err);
    }
};




module.exports = {
    login,
    loginPost,
    SignUp,
    SignUpPost,
    ForgotPassword,
    ForgotPasswordpost,
    otpPage,
    otpVerify,
    generateAndSendOTP,

}