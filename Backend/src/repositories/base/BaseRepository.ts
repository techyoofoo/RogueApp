// import all interfaces
import { IWrite } from '../interfaces/IWrite';
import { IRead } from '../interfaces/IRead';
import mongoose = require("mongoose");

// we imported all types from mongodb driver, to use in code
import { MongoClient, Db, Collection, InsertOneWriteOpResult } from 'mongodb';

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
 
  public readonly _collection: Collection;
  public  _model: mongoose.Document;
  
  constructor(model: mongoose.Document) {
    this._model = model;
  } 
  

  // we add to method, the async keyword to manipulate the insert result
  // of method.
  async create(): Promise<boolean> {
    this._model
    .save()
    .then(data => {
       return true;
    })
    
    return false;

    //const result: InsertOneWriteOpResult = await this._collection.insert(item);
   
    //return !!result.result.ok;
  }


  update(id: string, item: T): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  find(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
