// #빅데이터_수집_저장 #미니실습, #몽고디비
// 📌 기본 실습 문제
// 1. Embedded Document (Rich Document)
// users 컬렉션을 생성하고, name, age, address 필드를 가진 문서를 삽입하시오.

db.createCollection("users")
db.users.insertOne({
    name: "Son",
    age: 28,
    address: {
        street: "156 Main Street",
        city: "London",
        country: "England"
    }
})

// products 컬렉션에 name, price, manufacturer 필드를 가진 문서를 삽입하시오.

db.createCollection("products")
db.products.insertOne({
    name: "Son",
    price: 29.99,
    manufacturer: "Acme Inc"

})

// orders 컬렉션에 주문 정보(orderId, userId, items)를 Embedded Document로 삽입하시오.

db.createCollection("orders")
db.orders.insertMany({
    orderId: "ord001",
    userId: "swh001",
    items: [{
        productId: "prd001",
        name: "Son",
        quantity: 10,
        price: 49.99
    },
    {
        productId: "prd005",
        name: "Kim",
        quantity: 15,
        price: 59.99
    },
    {
        productId: "prd003",
        name: "Messi",
        quantity: 25,
        price: 129.99
    }]
})

// books 컬렉션에 title, author, details(페이지 수, 출판 연도 포함) 필드를 가진 문서를 삽입하시오.

db.createCollection("books")
db.books.insertMany([{
    title: "MongoDB Basics",
    author: "Son",
    details: {
        page: 378,
        publishedYear: 2023
    },
},
{
    title: "Python Basics",
    author: "Dean",
    details: {
        page: 459,
        publishedYear: 2022
    }
},
{
    title: "Mastering NoSQL",
    author: "John",
    details: {
        page: 325,
        publishedYear: 2021
    }
}
])

// reviews 컬렉션에 productId, userId, rating, comment를 Embedded Document로 저장하시오.

db.createCollection("reviews")
db.reviews.insertMany([
    {
        review: {
            productId: "prd003",
            userId: "Dean",
            rating: 4.3,
            comment: "Decent quality, but a bit overpriced."
        }
    },
    {
        review: {
            productId: "prd007",
            userId: "Son",
            rating: 4.8,
            comment: "Good price and fast shipping!"
        }
    },
    {
        review: {
            productId: "prd012",
            userId: "Hong",
            rating: 4.9,
            comment: "Absolutely love it!will buy again"
        }
    }
])

// 2. Link 구조
// users 컬렉션과 orders 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.

const usersResult = db.users.insertMany([
    { name: "Sean", age: 35, email: "Sean@gmail.com" },
    { name: "Bob", age: 28, email: "Bob@gmail.com" },
    { name: "James", age: 47, email: "James@gmail.com" }
]);

db.orders.insertMany([
    {
        orderId: "ord003",
        userId: usersResult.insertedIds[0],
        items: [
            { productId: "prd003", name: "Laptop", quantity: 1, price: 1500 },
            { productId: "prd005", name: "Mouse", quantity: 2, price: 30 }
        ]
    },
    {
        orderId: "ord005",
        userId: usersResult.insertedIds[1],
        items: [
            { productId: "prd005", name: "Keyboard", quantity: 1, price: 50 }
        ]
    },
    {
        orderId: "ord007",
        userId: usersResult.insertedIds[2],
        items: [
            { productId: "prd007", name: "Moniter", quantity: 3, price: 350 }
        ]
    }
]);

// posts 컬렉션과 comments 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.

const postsResult = db.posts.insertMany([
    {
        title: "My First Post",
        content: "This is the content of my first post.",
        author: "Sean"
    },
    {
        title: "MongoDB Tips",
        content: "Some useful tips for MongoDB.",
        author: "James"
    }
]);

db.comments.insertMany([
    {
        postId: postsResult.insertedIds["0"],  // 첫 번째 게시글의 _id 참조
        commentText: "Great post! Really enjoyed it.",
        user: "Charlie",
        createdAt: new Date()
    },
    {
        postId: postsResult.insertedIds["0"],
        commentText: "Thanks for sharing!",
        user: "David",
        createdAt: new Date()
    },
    {
        postId: postsResult.insertedIds["1"],  // 두 번째 게시글의 _id 참조
        commentText: "Very useful tips, thanks.",
        user: "Eve",
        createdAt: new Date()
    }
]);

// students 컬렉션과 courses 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.

const coursesResult = db.courses.insertMany([
    { name: "MongoDB Basics", instructor: "Dr.Hong", credits: 3 },
    { name: "Advanced JavaScript", instructor: "Prof.Son", credits: 5 },
    { name: "Data Structures", instructor: "Dr.Lee", credits: 7 }
])

db.students.insertMany([
    {
        name: "Kate",
        age: 22,
        major: "Computer Science",
        courses: [coursesResult.insertedIds[0], coursesResult.insertedIds[1]]
    },
    {
        name: "Tommy",
        age: 27,
        major: "Software Enginnering",
        courses: [coursesResult.insertedIds[0], coursesResult.insertedIds[1]]
    },
    {
        name: "Charlie",
        age: 25,
        major: "Musical",
        courses: [coursesResult.insertedIds[0], coursesResult.insertedIds[1]]

    }
]);

// employees 컬렉션과 departments 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.

const departmentsResult = db.departments.insertMany([
    { name: "Engineering", location: "Seoul" },
    { name: "Marketing", location: "Busan" },
    { name: "HR", location: "Incheon" }
]);

// employees 컬렉션에 직원 데이터 삽입 (부서 ID를 참조)
db.employees.insertMany([
    {
        name: "Alice Kim",
        position: "Software Engineer",
        salary: 75000,
        departmentId: departmentsResult.insertedIds["0"] // Engineering 부서
    },
    {
        name: "Bob Lee",
        position: "Marketing Manager",
        salary: 68000,
        departmentId: departmentsResult.insertedIds["1"] // Marketing 부서
    },
    {
        name: "Charlie Park",
        position: "HR Specialist",
        salary: 60000,
        departmentId: departmentsResult.insertedIds["2"] // HR 부서
    }
]);


// doctors 컬렉션과 patients 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.

const doctorsResult = db.doctors.insertMany([
    { name: "Dr.kim", speciality: "Cardiology", hospital: "Seoul General Hospital" },
    { name: "Dr.Hong", speciality: "Dermatology", hospital: "Busan Skin Clinic" },
    { name: "Dr.Choi", speciality: "Pediatrics", hospital: "Incheon Children's Hospital" }
]);

// patients 컬렉션에 환자 데이터 삽입 (담당 의사 ID를 참조)
db.patients.insertMany([
    {
        name: "Alice Kim",
        age: 29,
        condition: "Hypertension",
        doctorId: doctorsResult.insertedIds["0"] // Dr. Kim (Cardiology)
    },
    {
        name: "Bob Lee",
        age: 35,
        condition: "Eczema",
        doctorId: doctorsResult.insertedIds["1"] // Dr. Lee (Dermatology)
    },
    {
        name: "Charlie Park",
        age: 10,
        condition: "Flu",
        doctorId: doctorsResult.insertedIds["2"] // Dr. Park (Pediatrics)
    }
]);


// 3. 계층형 데이터 구조
// categories 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
// comments 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
// company_structure 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
// locations 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
// menus 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.