
import express from 'express'
import mongoose from 'mongoose'
import config from '../config/config.mongodb';
const { db: { host, port, name } } = config
const connect = `mongodb://${host}:${port}/${name}`
console.log(connect)
class Database{
    static instance: Database;
    constructor()
    {
      this.connect()
    }
    connect(type = 'mongodb')
    {
          if (type === 'mongodb') {
        mongoose.set('debug', true)
        mongoose.connect(connect,{
            maxPoolSize : 50 
        })
        .then(() => console.log('✅ MongoDB connected!!!'))
        .catch(err => console.error('❌ MongoDB connection error:',err))
        }
    }
    static getIntance() : Database
    {
        if(!Database.instance)
        {
            Database.instance = new Database()
        }
        return Database.instance;
    }
}
const instanceMongo = Database.getIntance()
export default instanceMongo