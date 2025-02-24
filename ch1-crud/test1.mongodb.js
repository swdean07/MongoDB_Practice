use('testDB')
db.testCollection.insertOne({
    name: '홍상우',
    age: 20,
    favoritefood: ['돼지수육', '파스타', '고기']
})

db.testCollection.find()

db.testCollection.updateOne({
    name: '홍상우'
},
    {
        $set: { age: 33 }
    })

db.testCollection.deleteOne({ name: "홍상우" })