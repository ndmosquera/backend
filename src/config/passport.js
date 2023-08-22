// import passport from "passport";
// import local from 'passport-local'
// import UserManager from "../dao/MongoDB/usersManager";


// const userManager = new UserManager();
// const InitLocalStrategy = () => {
//     // Register
//     passport.use('register', new local.Strategy( {passReqToCallback: true}, 
//         async(req, username, password, done) =>{
//             const newUser = req.body;
//             const userExist = await userManager.getUserByUsername(username);

//             if (userExist) return done('This user already exists');

//             const user = await userManager.createUser(newUser);

//             return done(null, user)
//         }

//     ))
// }

// export default InitLocalStrategy;