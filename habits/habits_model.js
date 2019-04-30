const db = require('../data/dbConfig');

const User = require('../user/user_model');

module.exports = {
    addHabit
}

async function addHabit(habit, username){
    const user = await User.findBy(username);
    console.log(user)
    if(user){
        await db('habits').insert({habit_name: habit.habit_name,
                            score: habit.score,
                            user_id: `${user.id}`})
        return db('habits');
    }else{
        return 'user does not exist'
    }
}

