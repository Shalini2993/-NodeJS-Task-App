const mongodb = require('mongodb')
const { UUID } = require('bson')
const { MongoClient, ObjectId } = mongodb

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const client = new MongoClient(connectionURL);

const objectId = new UUID().toBinary()

//------------------------------------------Old implementation -------------------------------------------

// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.log('Unable to connect to database')
//     }
//     console.log('Connected successfully')
//     const db = client.db(databaseName)
//     db.collection('users').insertOne({
//         name: 'Andrew',
//         age: 27
//     }, (error, result) => {
//         if (error) {
//             return console.log('unable to insert users')
//         }
//         console.log(result.ops)
//     })
// })

async function run() {

    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    console.log("Connected successfully to server");
    const db = client.db(databaseName)

    //------------------------------------------------------InsertOne document---------------------------------
    // try {
    //     const result = await db.collection('users').insertOne({
    //         _id: objectId,
    //         name: 'Andrew',
    //         age: 29
    //     })
    //     console.log(result)
    // } catch (error) {
    //     console.log(error)
    // }

    //-----------------------------------------------InsertMany Document---------------------------------------
    // try {
    //     const result = await db.collection('users').insertMany([{
    //         name: 'Andrew',
    //         age: 29
    //     }, {
    //         name: 'Shalini',
    //         age: 27
    //     }])
    //     console.log(result)
    // } catch (error) {
    //     console.log(error)
    // }

    //--------------------------------------------------Find one and find------------------------------------------

    // try {
    //     const result = await db.collection('users').find({ age: 29 }).toArray()
    //     await console.log(result)
    // } catch (err) {
    //     console.log(err)
    // }

    //===============================================updateone===========================================
    // const updatePromise = await db.collection('users').updateOne({
    //     _id: new ObjectId("64071efbe60fa764f8956939")
    // }, {
    //     $set: {
    //         name: 'Mike'
    //     }
    // })
    // console.log(updatePromise)

    //==========================================Increment data=========================================
    // const updatePromise = await db.collection('users').updateOne({
    //     _id: new ObjectId("64071efbe60fa764f8956939")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // })
    // console.log(updatePromise)

    //============================================updateMany=========================================
    // const updatePromise = await db.collection('users').updateMany({
    //     name: 'Andrew'
    // }, {
    //     $set: {
    //         name: 'Mike'
    //     }
    // })
    // console.log(updatePromise)

    //==================================== Delete one  Doc===============================================
    // await db.collection('users').deleteOne({
    //     name: 'Mike'
    // })

    //==========================================Delete Many===========================================

    // await db.collection('users').deleteMany({
    //     age: 29
    // })



}
run().catch(console.dir);

