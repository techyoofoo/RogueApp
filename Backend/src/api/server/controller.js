import serverSchema from "./model";
import mongoose, { Schema } from "mongoose";
import { postToMq } from '../../mqservice/service';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export const create = async (req, res) => {
    let conString = `server=${req.body.server};database=${req.body.database};uid=${req.body.userid};pwd=${req.body.password};pooling=${req.body.pooling};`
    var encrypted = encrypt(conString);
    const createServer = new serverSchema({ name: req.body.name, clientid: req.body.clientid, iv: encrypted.iv, key: encrypted.key, connection: encrypted.encryptedData });
    await createServer
        .save()
        .then(data => {
            postToMq("server", "Yoofoo.Server.Create", { id: data._id, clientid: data.clientid, connection: conString });
            res.send({ status: 200, id: data._id, message: "Database configuration saved successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error occurred while creating."
            });
        });
};

export const findServerById = async (req, res) => {
    await serverSchema.findById({ _id: req.params.id })
        .then(ServerInfo => {
            let conString = decrypt(ServerInfo);
            res.send({ clientid: ServerInfo.clientid, name: ServerInfo.name, connection: conString });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

export const testConnection = (req, res) => {
    var sql = require("mssql");
    var config = {
        user: req.body.userid,
        password: req.body.password,
        server: req.body.server,
        database: req.body.database,
        port: req.body.port
    };
    sql.connect(config, function (err) {
        if (err) {
            sql.close();
            res.send(false);
        }
        else {
            sql.close();
            res.send(true);
        }
    });
}


function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), key: key.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.connection, 'hex');
    let key = Buffer.from(text.key, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}