import { TokenRepository } from './repositories/TokenRepository'
import Token from './model';
// Create and Save a new user
exports.create = (req, res) => {
    const token = new Token(req.body);
    //const connection = await MongoClient.connect('mongodb://localhost');
   // const db = connection.db('rogue-app');
  //  const token = new Token("new id", "test");
    // initializing the repository
    const repository = new TokenRepository(token);
    // call create method from generic repository
    const result = await repository.create();
    console.log(` inserted with ${result ? 'success' : 'fail'}`)
    
};