const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const massive = require('massive');

      require('dotenv').config();

const {
      SERVER_PORT,
      CONNECTION_STRING,
      SESSION_SECRET,
      DOMAIN,
      CLIENT_ID,
      CLIENT_SECRET,
      CALLBACK_URL,

} = process.env     

const app = express();

app.use( express.static(`${_dirname}/../build`) );

app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
      app.listen(SERVER_PORT, () => console.log(`SERVER listening on port:${SERVER_PORT}`));
      return app.set('db', db);
})

app.use(session({
      resave: false,
      saveUninitialized: true,
      secret: SESSION_SECRET
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: 'openid profile'
      }, function(accessToken, refreshToken, extraParams, profile, done){
       // db calls
     const db = app.get('db');
     db.find_user([profile.id]).then( userResult => {
         if (!userResult[0]) {
             db.create_user([
                 profile.displayName,
                 profile.id,
                 profile.picture
             ]).then(createdUser => {
                 return done(null, createdUser[0].id)
             })
         }else {
          return done(null, userResult[0].id)
         }
     })
   }))

passport.serializeUser((id, done) => {
      done(null, id);
})

passport.deserializeUser((id, done) => {
      app.get('db').find_session_user([id]).then(loggedInUser => {
            done(null, loggedInUser[0]);
      })
}) //end of all session / auth configuration???

const FRONT_BASE_URL = process.env.FRONT_BASE_URL; ////// DONT FORGET TO CHANGE BASED ON HOST

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
      successRedirect: FRONT_BASE_URL + '#/',
      failureRedirect: FRONT_BASE_URL
  }))
  
app.get('/auth/me', function(req, res) {
      
      if(req.user) {
          res.status(200).send(req.user);
      }else {
          res.status(401).send('Nice try!!!')
      }
  })
app.get('/auth/logout', (req, res) => {
      req.logOut();
      res.redirect(FRONT_BASE_URL)
  })    


app.post('/addtocart', controller.addToCart)
app.get('/cart', controller.getCart)
app.delete('/removeitem', controller.removeFromCart)
app.get('/geticecream', controller.getIceCream)
app.get('/getaproduct/:id', controller.getSingleProduct)
app.get('/user', controller.getUser)



// req.session.passport.user is to get the values of who is logged in



