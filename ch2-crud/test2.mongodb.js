db.createCollection("cappedC", { capped: true, size: 10000 });
db.cappedC.insertOne({ x: 1 });
db.cappedC.find();

for (i = 0; i < 1000; i++) {
    db.cappedC.insertOne({ x: i });
}

for (i = 0; i < 1000; i++) {
    db.testCollection.insertOne({ x: i });
}
db.testCollection.find();

db.users.insertOne(
    { name: "Alice", age: 25 }
);

db.users.insertOne(
    { name: "Alice", age: 25, place: "Busan" }
);

db.emp.insertOne({ eno: 1101, fname: 'JIMMY' });
db.emp.insertOne({ eno: 1102, fname: 'ADAM', lname: 'KROLL' });
db.emp.insertOne({ eno: 1103, fname: 'SMITH', job: 'CLERK' });
db.emp.find()
db.emp.find().sort({ eno: 1 })

db.testCollection.insertOne({ _id: 1, x: 1 })
db.testCollection.find().sort({ _id: 1 })

db.user.insertMany([
    { username: "Kei", password: 4321 },
    { username: "Mijoo", password: 3212 },
    { username: "Yein", password: 3123 },
]);

db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } });
db.users.updateMany({ age: { $gte: 20 } }, { $set: { isAdult: true } });

db.users.deleteOne({ name: "Alice" });
db.users.deleteMany({ age: { $lt: 25 } });

db.users.insertOne(
    { name: "Alice1", age: 15 }
);
db.users.insertOne(
    { name: "Alice2", age: 17, place: "Busan" }
);

db.users.insertOne(
    { name: "Alice3", age: 12 }
);
db.users.insertOne(
    { name: "Alice4", age: 18, place: "Busan" }
);

db.users.find().sort({ age: -1 }).limit(3);

db.users.find().sort({ age: -1 }).skip(1).limit(3);

db.users.find({}, { name: 1, _id: 0 });

db.users.countDocuments({ age: { $gte: 30 } });

db.users.find({ age: { $exists: true } });

db.users.find({ place: { $exists: true } });

db.users.find({ age: { $in: [25, 30, 35] } });

db.users.find({ age: { $gte: 18, $lte: 30 } });

db.users.find({ $or: [{ age: 25 }, { name: "Alice" }] });
db.users.find({ $and: [{ age: 25 }, { name: "Alice" }] });

db.users.updateOne({ name: "Alice" }, { $push: { hobbies: "Reading" } });
db.users.find()

db.users.updateOne({ name: "Alice" }, { $push: { hobbies: "Swimming" } });

db.users.updateOne({ name: "Alice" }, { $pull: { hobbies: "Reading" } });

db.users.updateMany({ name: "Alice" }, { $unset: { place: "" } });
db.users.find()

db.users.updateMany({}, { $rename: { "name": "Fullname" } });
db.users.find()

db.users.drop();

db.dropDatabase();