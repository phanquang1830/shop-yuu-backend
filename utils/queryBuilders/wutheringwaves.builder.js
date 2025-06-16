import { Op } from "sequelize";

const buildWutheringWavesQuery = (query) =>{
    const where = {};

    if(query.server) {
        where.server = {
            [Op.like]: query.server.trim().toLowerCase()
        }
    }

    if(query.union_level) {
        where.union_level = Number(query.union_level)
    }

    if(query.limited_characters) {
        const names = query.limited_characters.split(',');

        where[Op.or] = names.map(name =>({
            limited_characters: { [Op.like]: `%${name.trim()}%` }
        }))
    }

    return where

}

export default buildWutheringWavesQuery