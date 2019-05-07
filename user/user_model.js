const db =  require('../data/dbConfig');

module.exports = {
    add,
    findBy,
    findById,
    getUserHabits
}

async function add(user){
    const [id] = await db('user').insert(user)

    return findById(id)
}

function findById(id){
    return db('user')
        .where({id})
        .first();
}

function findBy(username){
    return db('user')
        .where({username})
        .first();
}

async function getUserHabits(username){
    const user = await findBy(username);
    if(user){
        return db('habits')
        .join('user', {'user.id': 'habits.user_id'})
        .where('user.id', `${user.id}`)
    }else{
        return 'this user does not exist';
    }
}