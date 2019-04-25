const db =  require('../data/dbConfig');

module.exports = {
    add,
    findBy,
    findById
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