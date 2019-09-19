import mongoose = require("mongoose");

export interface IRead<T>   {
    find(): Promise<T[]>;
    findOne(id: string): Promise<T>;
  }
  