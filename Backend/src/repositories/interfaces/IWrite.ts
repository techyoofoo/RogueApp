import mongoose = require("mongoose");

export interface IWrite<T>  {
    create(): Promise<boolean>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
  }
  