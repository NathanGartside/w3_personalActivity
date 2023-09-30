const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

async function getAll(req, res) {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists); // we just need the first one (the only one)
    });
}

async function getSingle(req, res) {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({_id: id});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]); // we just need the first one (the only one)
    });
}

async function addContact(req, res) {
    const person = {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, favoriteColor: req.body.favoriteColor, birthday: req.body.birthday};
    const result = await mongodb.getDb().db().collection('contacts').insertOne(person);
    
    if(result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result || 'Something went wrong')
    }
}

async function updateContact(req, res) {
    const person = {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, favoriteColor: req.body.favoriteColor, birthday: req.body.birthday};
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').replaceOne({_id:id}, person);
    console.log(result)
    if(result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result || "Something went wrong")
    }
}

async function deleteContact(req, res) {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({_id:id});
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
}

module.exports = {getAll, getSingle, addContact, updateContact, deleteContact};