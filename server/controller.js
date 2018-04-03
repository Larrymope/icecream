module.exports = {

    registerUser: (req, res) => {
        console.log(req.body)
        let dataBase = req.app.get('db');

        let {username, password, profile_pic} = req.body;
        dataBase.createUser( [username, password, profile_pic] )
        .then( () => res.status(200).send() )
        .catch( (err) => {
            console.log(err)
            res.status(500).send()
        })
    },

    loginUser: (req, res) => {
        let dataBase = req.app.get('db');

        let { username, password } = req.body;

        dataBase.find_User( [username, password] ).then( userResult => {
            if(!userResult[0]) {
                res.status(500).send('Incorrect')
            }
            else {
                res.status(200).send('welcome home!')
            }
        })
       
         

        // dataBase.find_User( [username, password] ).then( (result) => res.status(200).send(result))

    }


    
}