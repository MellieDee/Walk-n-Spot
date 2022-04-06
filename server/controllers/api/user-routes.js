const router = require('express').Router();
const { User, Animal, Trail, TrailAnimal, UserTrail, } = require("../../models");




// GET /api/users
router.get('/', (req, res) => {
  // Access our User model and run .findAll() method)
  User.findAll({

    attributes: { exclude: ['password'] },
    include: [
      {
        model: Trail,
      },
    ]

  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Trail,
        attributes: ['id', 'trail_name',],
        include: {
          model: Animal,
          attributes: ['id', 'animal_name',]
        }
      },
    ]
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(userData => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
        res.json(userData);
      });
    })
});

// GET /api/users/usertrail
router.get('/usertrail', (req, res) => {
  // create a new tag
  UserTrail.findall({

  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users/usertrail
// Allows user to save trails
router.post('/usertrail', (req, res) => {
  // create a new tag
  UserTrail.create({
    user_id: req.session.user_id,
    trail_id: req.body.trail_id
  })
    .then(userData => res.json(userData))
    .catch(err => {
      if(err.message === 'notNull Violation: user-trail.user_id cannot be null'){
        res.status(503).json(err); //503 Service Unavailable
      }else{
        res.status(500).json(err); //500 Internal Server Error
      }
    });
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(userData => {
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email and/or password!' });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email and/or password!' });
      return;
    }
    req.session.save(() => {
      // declare session variables
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.json({ user: userData, message: 'Welcome to your hike!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;