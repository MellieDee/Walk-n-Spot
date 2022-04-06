const User = require("./User");
const Trail = require("./Trail")
const Animal = require("./Animal");
const UserTrail = require("./UserTrail");
const TrailAnimal = require("./TrailAnimal");



//   -------   Trail & User Associations Start -------
Trail.belongsToMany(User, {
  through: UserTrail,
  foreignKey: 'trail_id'
});
User.belongsToMany(Trail, {
  through: UserTrail,
  foreignKey: 'user_id'
});

// ** Extra USER/TRAIL Associations to do other queries if needed **
// User.hasMany(UserTrail, {
//   // foreignKey: 'user_id'
// })
// UserTrail.belongsTo(User, {
//   // foreignKey: 'user_id'
// });
// Trail.hasMany(UserTrail, {
//   // foreignKey: 'trail_id'
// })
// UserTrail.belongsTo(Trail, {
//   // foreignKey: 'trail_id'
// });
//   -------   Trail & User Associations END -------


//  ------- Trail &  Animal Associations START --------
Animal.belongsToMany(Trail, {
  through: TrailAnimal,
  foreignKey: 'animal_id'

});

Trail.belongsToMany(Animal, {
  through: TrailAnimal,
  foreignKey: 'trail_id'
});
//  ------- Trail &  Animal Associations END --------

module.exports = { User, Trail, Animal, TrailAnimal, UserTrail }

//  ---------------- DRAFT CODE  ----------------------


// City.hasMany(Trail, {
//     foreignKey: 'city_id'
// });

// Trail.belongsTo(City, {
//     foreignKey: 'city_id'

// });

// User.hasMany(Sighting, {

// });

// Sighting.belongsToMany(User, {

// });

// Sighting.belongsToMany(Animal, {

// });

