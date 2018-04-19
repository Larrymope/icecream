module.exports = {

    getCart: (req, res) => {
        let dataBase = req.app.get('db');

        dataBase.getCart().then( (result) => res.status(200).send(result))
    },

    addToCart: (req, res) => {
        let dataBase = req.app.get('db');
        let { id, quantity } = req.body
        console.log('SEESESSION?', req.session.passport.user)
        
        dataBase.addToCart([id, quantity, req.session.passport.user]).then( () => res.status(200).send('added!'))
    },

    removeFromCart: (req, res) => {
        let dataBase = req.app.get('db');
        

        dataBase.removeFromCart([req.body.id]).then( () => res.status(200).send('deleted!') )
        
    },

    checkForSession: (req, res, next) => {
        const { session } = req;

        if(!session.user) {
            session.user = { username: 'guest', cart: [], total: 0 };
        }
    
        next();
    },

    getIceCream: (req, res) => {
        let dataBase = req.app.get('db');

        dataBase.geticecreams().then((result) => res.status(200).send(result))
    },

    getSingleProduct:(req, res) => {
        let dataBase = req.app.get('db');

        dataBase.specificiteminfo([req.params.id]).then((result) => res.status(200).send(result))
    },

    getUser: (req, res) => {
        let dataBase = req.app.get('db');

        dataBase.getusername([req.session.passport.user]).then((result) => res.status(200).send(result))
    }

}

// registerUser: (req, res) => {
    //     console.log(req.body)
    //     let dataBase = req.app.get('db');

    //     let {username, password, profile_pic} = req.body;
    //     dataBase.createUser( [username, password, profile_pic] )
    //     .then( () => res.status(200).send() )
    //     .catch( (err) => {
    //         console.log(err)
    //         res.status(500).send()
    //     })
    // },

    // loginUser: (req, res) => {
    //     let dataBase = req.app.get('db');

    //     let { username, password } = req.body;

    //     dataBase.find_User( [username, password] ).then( userResult => {
    //         if(!userResult[0]) {
    //             res.status(500).send('Incorrect')
    //         }
    //         else {
    //             res.status(200).send('welcome home!')
    //         }
    //     })

    // },