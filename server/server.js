require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    controller = require('./controller');
    
        const app = express();

    
        app.use(bodyParser.json());
        app.use(session({
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: true
        }))
    
        app.use(passport.initialize());
        app.use(passport.session());
        
        massive(process.env.CONNECTION_STRING).then(db => {
            app.set('db', db);
            
        }).catch(err=>console.log('error of ' + err))
        
        setTimeout(_ => {
            const db = app.get('db')
            console.log('the db should be accessible');
        }, 2000)
    
        passport.use(new Auth0Strategy({
            domain: process.env.AUTH_DOMAIN,
            clientID: process.env.AUTH_CLIENT_ID,
            clientSecret: process.env.AUTH_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        }, function (accessToken, refreshToken, extraParams, profile, done) {

            done(null,profile);
        }));
    

        app.get('/auth', passport.authenticate('auth0'));
        
        app.get('/auth/callback', passport.authenticate('auth0', {
            successRedirect: 'http://localhost:3000/#/',
            failureRedirect: '/auth'
        }));
        app.get('/auth/me', (req, res) => {
            if(!req.user) {
                return res.status(404).send(false)
            }
            return res.status(200).send(true);
        })
        
        
        app.get('/auth/logout', (req, res) => {
            req.logOut();
            res.redirect(302, 'http://localhost:3000/')
        })

        app.get('/api/links/:category', controller.getLinks)
        app.put('/api/admin/video/:id', controller.updateVideo)

        app.post('/api/customer/insert', controller.insertCustomer)
        app.post('/api/wedding/insert', controller.insertWedding)

        app.get('/api/get/customers', controller.getCustomers)
        
        passport.serializeUser((user, done) => {
            done(null, user);
        })
        passport.deserializeUser((user, done) => {
            done(null, user);
        })
    
    
        const PORT = 3005
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))