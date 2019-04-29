const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = process.env.JWT_SECRET

const User = require('../../user/user_model');
const Habit = require('../../habits/habits_model');

module.exports = server => {
    server.post('/api/register', register);
    server.post('/api/login', login);
    server.post('/api/new_habit', newHabit);
    server.get('/api/habits', allHabits)
}

async function allHabits(req, res){
    let { username } = req.headers;
    try{
        const habits = await User.getUserHabits(username)
        res.status(200).json(habits)
    }catch(e){
        res.status(500).json({message: `${e}`})
    }
}

async function newHabit (req, res){
    let habit = req.body;
    let { username } = req.headers;
    if(habit && username){
        try{
            const newHabit = await Habit.addHabit(habit, username);
            res.status(201).json(newHabit)
        }catch(e){
            res.status(500).json({message: `${e}`})
        }
    }else{
        res.status(401).json({message: "Habit couldn't be added"})
    }
}

async function register (req, res){
    let user = req.body;
    if(user.username && user.password){
        try{
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;

            const newUser = await User.add(user)
            res.status(201).json(newUser)
        }catch(e){
            res.status(500).json({message: `${e}`})
        }
    }else{
        res.status(401).json({message: "Missing username or password :/"})
    }
}

async function login (req, res){
    let {username, password} = req.body;
    try{
        const userLogin = await User.findBy(username);
        if(userLogin && bcrypt.compareSync(password, userLogin.password)){
            const token = generateToken(userLogin)
            res.status(200).json({
                token,
                message: 'Successfully logged in!'
            })
        }else{
            res.status(401).json({message: 'Invalid Credentials'})
        }
    }catch(e){
        res.status(500).json({message: `${e}`})
    }
}

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: "1d"
    }

    return jwt.sign(payload, jwtKey, options)
}
