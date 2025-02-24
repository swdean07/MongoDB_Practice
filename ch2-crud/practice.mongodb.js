// #빅데이터_수집_저장 #미니실습, #몽고디비

// 0번,
// user 컬렉션 생성, 샘플 데이터 추가 해보기.
// 필드, name, age, email, hobbies 배열

// 0번
db.createCollection("user");

db.user.insertMany([
    {
        name: "swh",
        age: 25,
        email: "swh@gmail.com",
        hobbies: ["soccer", "tennis", "gaming", "swimming"]
    },
    {
        name: "swh2",
        age: 35,
        email: "swh2@gmail.com",
        hobbies: ["soccer", "youtube", "gaming", "swimming"]
    },
    {
        name: "swh3",
        age: 42,
        email: "swh3@gmail.com",
        hobbies: ["soccer", "tennis", "gaming", "webtoon"]
    }
]);

// 0-2번,
// employees 컬렉션 생성, 샘플 데이터 추가 해보기.
// 필드, name, age, department, skills 배열

// 0-2번
db.createCollection("employees")

// db.employees.insertOne({
//     name: ["swh", "Son", "Min", "Lee"],
//     age: [28, 25, 36, 45],
//     department: ["Engineering", "IT", "HR", "CS"],
//     skills: ["JavaScript", "Visual Basic", "MongoDB", "Node.js"]
// })

db.employees.insertMany([
    { name: "swh", age: 28, department: "Engineering", skills: ["JavaScript"] },
    { name: "Son", age: 25, department: "IT", skills: ["Visual Basic"] },
    { name: "Min", age: 36, department: "HR", skills: ["MongoDB"] },
    { name: "Lee", age: 45, department: "CS", skills: ["Node.js"] }
]);

// 1. Capped Collection을 생성하고,
// 컬렉션 명: logs
// size : 5000
// 데이터를 삽입한 후 조회하는 코드를 작성하세요.
// (오래된 데이터 삭제 확인,)

// 1번
db.createCollection("logs", { capped: true, size: 5000 });

for (i = 0; i < 1000; i++) {
    db.logs.insertOne({
        message: `log entry ${i}`,
        createdAt: new Date()
    });
}

db.logs.find();

// 2. use를 사용하여 myDatabase 데이터베이스를 선택하세요.

// 2번
use("myDataBase")

// 3. students 컬렉션에 { name: "John", age: 22 } 데이터를 삽입하세요.

// 3번
db.createCollection("students")
db.students.insertMany([
    { name: "Chris", age: 25 },
    { name: "Mark", age: 28 },
    { name: "Dean", age: 30 }
]);

db.students.insertOne({ name: "John" }, { age: 22 });

// 4. students 컬렉션에서 모든 데이터를 조회하세요.

// 4번
db.students.find();

// 5. students 컬렉션에서 name이 "John"인 문서를 조회하세요.

// 5번
db.students.findOne({ name: "John" });

// 6. students 컬렉션에서 name이 "John"인 문서의 age를 23으로 업데이트하세요.

// 6번
db.students.updateOne({ name: "John" }, { $set: { age: 23 } });

// 7. students 컬렉션에서 age가 20 이상인
// 문서의 status 필드를 "active"로 설정하세요.

// 7번
db.students.updateMany(
    { age: { $gte: 20 } },
    { $set: { status: "active" } }
);

db.students.find();

// 8. students 컬렉션에서 name이 "John"인 문서를 삭제하세요.

// 8번
db.students.deleteOne({ name: "John" });

// 9. students 컬렉션에서 모든 데이터를 삭제하세요.

// 9번
db.students.updateMany({ age: { $gte: 23 } }, { $set: { isAdult: true } });
db.students.deleteMany({});

// 10. students 컬렉션에서 age 기준으로 내림차순 정렬 후
// 3개만 출력하세요.

// 10번
db.students.find().sort({ age: -1 }).limit(3);

// 11. students 컬렉션에서 name과 age만 조회하세요 (단, _id는 제외).

// 11번
db.students.find({}, { name: 1, age: 1, _id: 0 });

// 14. employees 컬렉션에서 age가 30 이상인 문서의 개수를 확인하세요.

// 14번
db.employees.countDocuments({ age: { $gte: 30 } });
db.students.find();

// 15. employees 컬렉션에서 email 필드가 존재하는 문서를 조회하세요.

// 15번
db.employees.find({ email: { $exists: true } });

// 16. employees 컬렉션에서 department가 "HR" 또는 "IT"인 문서를 조회하세요.

// 16번
db.employees.find({ $or: [{ department: "HR" }, { department: "IT" }] });

// 17. employees 컬렉션에서 age가 25 이상 35 이하인 문서를 조회하세요.

// 17번
db.employees.find({
    age: { $gte: 25, $lte: 35 }
});

// 18. employees 컬렉션에서 age가 30이거나 department가
// "Finance"인 문서를 조회하세요.

// 18번
db.employees.find({ $or: [{ age: 30 }, { department: "Finance" }] });

// 19. employees 컬렉션에서 skills 배열에 "Python"을 추가하세요.

// 19번
db.employees.updateMany(
    {},
    { $push: { skills: "Python" } }
);


// 20. employees 컬렉션에서 skills 배열에서 "Python"을 제거하세요.

// 20번
db.employees.updateMany(
    {},
    { $pull: { skills: "Python" } }
);