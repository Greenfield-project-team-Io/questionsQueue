const User = require('./user');

const newUsers = [{
  username: 'SomeGuy',
  role: 'student',
  cohort: 'hrnyc-7',
},
{
  username: 'DHamberlin',
  role: 'admin',
  cohort: 'hrnyc-7',
}];

const addUsers = () => {
  newUsers.forEach((user) => {
    const newUser = new User(user);
    newUser.save((err, savedUser) => {
      if (err) console.log(err);
      else console.log('user added: ', savedUser);
    });
  });
};

addUsers();
