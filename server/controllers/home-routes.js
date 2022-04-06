const router = require('express').Router();
const { reverseMultiplyAndSum } = require('validator/lib/util/algorithms');
const sequelize = require('../config/connection');
const { Trail, User, Animal, TrailAnimal } = require('../models');

// Homepage route
router.get('/', (req, res) => {
    console.log(req.session);
    User.findAll({
        attributes: [
            'id',
            'username',
            'trail_id',
        ],
    })
        .then(userData => {
            // pass a single post object into the homepage template
            const users = userData.map(user => user.get({ plain: true }));
            res.render('homepage', {
                users,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// If user goes to login route, it will redirect them to homepage
// If not signed in, then the login handlebar will be rendered
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('homepage');
        return;
    }
    res.render('login');
});

router.get('/results', (req, res) => {
    Trail.findAll({
        // attributes: { exclude: ['password'] }
        //map()
        attributes: ['id', 'trail_name', 'trail_img', 'city_name'],
        include: [
            {
                model: Animal,
                attributes: ['animal_name']
                
            }
        ]
    })
        .then(trailData => {

            // for (var i = 0)
            const city_input = document.querySelector('#CityInput').value.trim();
            const animal_input = document.querySelector("select[name='AnimalInput']").value;
            for(var i = 0; i < json.length; i++){ //track city
                for(var j = 0; j < json[i].animals.length; j++) { //track animals
                    if(json[i].city_name === city_input && json[i].animals[j].animal_name === animal_input){
                    }
                }
            }

            const trails = trailData.map(trail => trail.get({ plain: true }));
            // console.log(trailData[0].animals[1].trail_animal.sighting)

            console.log(trailData)
            console.log(trailData);
        })
        
});

module.exports = router;


// //  ---------  Render Results Route -----
// //  Get ALL Trails Draft Code
// // Get Trails from search, for Cards

// router.get('/results', (req, res) => {
//     res.render('results', {
//         // name: `${json[i].trail_name}`,
//         // trail_img: `${json[i].trail_img}`
//         //    ${json[i].animals[j].trail_animal.sighting}
//         name: "Test Trail Name",
//         trail_img: '../public/assets/images/creek-1-sm.jpg'
//     })
// })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });








// //  Get ALL Trails Draft Code
// // Get Trails from search, for Cards
// router.get('/results', (req, res) => {
//     Trail.findAll({
//         // attributes: { exclude: ['password'] }
//         //map()
//         attributes: ['id', 'trail_name', 'trail_img'],
//         include: [
//             {
//                 model: Animal,
//                 attributes: ['animal_name']

//             }
//         ]
//     })
//         .then(trailData => {
//             const trails = trailData.map(trail => trail.get({ plain: true }));
//             console.log(trailData[0].animals[1].trail_animal.sighting)


//             // console.log(trails)
//             res.render('results', {
//                 trails,
//                 loggedIn: req.session.loggedIn,

//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });



// Get Trails from search for Cards


// ---------  pseudocode card & results Direction ----------
// when user searches then redirects to Results Page
//if they then decided to login 
// they should be redirected back to Results Page
// if  havent searched city yet, then login =>  redir to homepage;
// if searched then log in, ==> redir to search Results

// router.get('/cards', (req, res) => {
//     // if (req.session.loggedIn) {
//     //     res.redirect('/');
//     //     return;
//     //}

//     res.render('cards');
// });

    // ---------  pseudocode card & results Direction ----------
    // when user searches then redirects to Results Page
    //if they then decided to login 
    // they should be redirected back to Results Page
    // if  havent searched city yet, then login =>  redir to homepage;
    // if searched then log in, ==> redir to search Results
    
    // router.get('/cards', (req, res) => {
    //     // if (req.session.loggedIn) {
    //     //     res.redirect('/');
    //     //     return;
    //     //}
    
    //     res.render('cards');

