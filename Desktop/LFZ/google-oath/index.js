const express = require('express');
const authRoutes = require('./routes/auth');
const passport = require('passport');
const cookieSession = require('cookie-session');
const config = require('./config');
const mongoose = require('mongoose');


mongoose.connect(config.dbConnect).then(() => {
    console.log('connected to mongoose')
}).catch(err=>{
    console.log('error', err.message)
})

const PORT = process.env.PORT || 5150;

const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app)
require('./model/user');
// require('./routes/auth')(app);
require('./services/passport')



app.listen(PORT, ()=> {
    console.log('Server listening on PORT ', PORT)

})