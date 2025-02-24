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