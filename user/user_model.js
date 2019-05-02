const db =  require('../data/dbConfig');

module.exports = {
    all,
    add,
    findBy,
    findById,
    getUserHabits
}

async function all(user){
    return db('user')
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
    console.log(user)
    if(user){
        return db('habits')
        .join('user', {'user.id': 'habits.user_id'})
        .where('user.id', `${user.id}`)
    }else{
        return 'this user does not exist';
    }
}