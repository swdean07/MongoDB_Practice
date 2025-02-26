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

// 각 사용자 ObjectId 생성
var userId1 = ObjectId();
var userId2 = ObjectId();
var userId3 = ObjectId();

// users 컬렉션에 데이터 삽입 (ObjectId 값을 명시적으로 설정)
db.users.insertMany([
    { _id: ObjectId("65d94f2f9a1d4a3b0c5a1b01"), name: "Sean", age: 35, email: "Sean@gmail.com" },
    { _id: ObjectId("65d94f2f9a1d4a3b0c5a1b02"), name: "Bob", age: 28, email: "Bob@gmail.com" },
    { _id: ObjectId("65d94f2f9a1d4a3b0c5a1b03"), name: "James", age: 47, email: "James@gmail.com" }
]);

// orders 컬렉션에 데이터 삽입 (users 컬렉션 참조)
db.orders.insertMany([
    {
        orderId: "ord003",
        userId: ObjectId("65d94f2f9a1d4a3b0c5a1b01"),  // Sean의 _id 참조
        items: [
            { productId: "prd003", name: "Laptop", quantity: 1, price: 1500 },
            { productId: "prd005", name: "Mouse", quantity: 2, price: 30 }
        ]
    },
    {
        orderId: "ord005",
        userId: ObjectId("65d94f2f9a1d4a3b0c5a1b02"),  // Bob의 _id 참조
        items: [
            { productId: "prd006", name: "Keyboard", quantity: 1, price: 50 }
        ]
    },
    {
        orderId: "ord007",
        userId: ObjectId("65d94f2f9a1d4a3b0c5a1b03"),  // James의 _id 참조
        items: [
            { productId: "prd007", name: "Monitor", quantity: 3, price: 350 }
        ]
    }
]);


// posts 컬렉션과 comments 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.

// 각 게시글 ObjectId 생성
var postId1 = ObjectId("65d94f2f9a1d4a3b0c5a1c01");
var postId2 = ObjectId("65d94f2f9a1d4a3b0c5a1c02");

// posts 컬렉션에 데이터 삽입
db.posts.insertMany([
    {
        _id: postId1,
        title: "MongoDB Reference Example",
        content: "This is a post about MongoDB references.",
        author: "Alice",
        createdAt: new Date()
    },
    {
        _id: postId2,
        title: "Understanding NoSQL",
        content: "This post explains the basics of NoSQL databases.",
        author: "Bob",
        createdAt: new Date()
    }
]);

// comments 컬렉션에 데이터 삽입 (posts 컬렉션 참조)
db.comments.insertMany([
    {
        _id: ObjectId("65d94f2f9a1d4a3b0c5a1d01"),
        postId: postId1,  // 첫 번째 게시글 참조
        author: "John",
        text: "Great explanation!",
        createdAt: new Date()
    },
    {
        _id: ObjectId("65d94f2f9a1d4a3b0c5a1d02"),
        postId: postId1,  // 첫 번째 게시글 참조
        author: "Emma",
        text: "Very helpful, thanks!",
        createdAt: new Date()
    },
    {
        _id: ObjectId("65d94f2f9a1d4a3b0c5a1d03"),
        postId: postId2,  // 두 번째 게시글 참조
        author: "Liam",
        text: "I finally understand NoSQL!",
        createdAt: new Date()
    }
]);

// students 컬렉션과 courses 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.

// 각 학생 ObjectId 생성
var studentId1 = ObjectId("65d94f2f9a1d4a3b0c5a1e01");
var studentId2 = ObjectId("65d94f2f9a1d4a3b0c5a1e02");
var studentId3 = ObjectId("65d94f2f9a1d4a3b0c5a1e03");

// students 컬렉션에 데이터 삽입
db.students.insertMany([
    {
        _id: studentId1,
        name: "Alice",
        age: 22,
        email: "alice@example.com"
    },
    {
        _id: studentId2,
        name: "Bob",
        age: 24,
        email: "bob@example.com"
    },
    {
        _id: studentId3,
        name: "Charlie",
        age: 23,
        email: "charlie@example.com"
    }
]);

// courses 컬렉션에 데이터 삽입 (students 컬렉션 참조)
db.courses.insertMany([
    {
        _id: ObjectId("65d94f2f9a1d4a3b0c5a1f01"),
        studentId: studentId1,  // Alice의 _id 참조
        courseName: "Database Systems",
        credits: 3,
        semester: "Spring 2025"
    },
    {
        _id: ObjectId("65d94f2f9a1d4a3b0c5a1f02"),
        studentId: studentId2,  // Bob의 _id 참조
        courseName: "Machine Learning",
        credits: 4,
        semester: "Spring 2025"
    },
    {
        _id: ObjectId("65d94f2f9a1d4a3b0c5a1f03"),
        studentId: studentId3,  // Charlie의 _id 참조
        courseName: "Computer Networks",
        credits: 3,
        semester: "Fall 2025"
    }
]);


// employees 컬렉션과 departments 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.

// 각 부서 ObjectId 생성
var departmentId1 = ObjectId("65d94f2f9a1d4a3b0c5a1g01");
var departmentId2 = ObjectId("65d94f2f9a1d4a3b0c5a1g02");
var departmentId3 = ObjectId("65d94f2f9a1d4a3b0c5a1g03");

// departments 컬렉션에 데이터 삽입
db.departments.insertMany([
    {
        _id: departmentId1,
        name: "Engineering",
        location: "Building A"
    },
    {
        _id: departmentId2,
        name: "Marketing",
        location: "Building B"
    },
    {
        _id: departmentId3,
        name: "Human Resources",
        location: "Building C"
    }
]);

// employees 컬렉션에 데이터 삽입 (departments 컬렉션 참조)
db.employees.insertMany([
    {
        _id: ObjectId("65d94f2f9a1d4a3b0c5a1h01"),
        name: "Alice",
        age: 30,
        email: "alice@company.com",
        departmentId: departmentId1 // Engineering 부서 참조
    },
    {
        _id: ObjectId("65d94f2f9a1d4a3b0c5a1h02"),
        name: "Bob",
        age: 35,
        email: "bob@company.com",
        departmentId: departmentId2 // Marketing 부서 참조
    },
    {
        _id: ObjectId("65d94f2f9a1d4a3b0c5a1h03"),
        name: "Charlie",
        age: 28,
        email: "charlie@company.com",
        departmentId: departmentId3 // Human Resources 부서 참조
    }
]);



// doctors 컬렉션과 patients 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.

// 각 의사 ObjectId 생성
var doctorId1 = ObjectId("65d94f2f9a1d4a3b0c5a1i01");
var doctorId2 = ObjectId("65d94f2f9a1d4a3b0c5a1i02");
var doctorId3 = ObjectId("65d94f2f9a1d4a3b0c5a1i03");

// doctors 컬렉션에 데이터 삽입
db.doctors.insertMany([
    {
        _id: doctorId1,
        name: "Dr. Smith",
        specialty: "Cardiology",
        email: "smith@hospital.com"
    },
    {
        _id: doctorId2,
        name: "Dr. Johnson",
        specialty: "Neurology",
        email: "johnson@hospital.com"
    },
    {
        _id: doctorId3,
        name: "Dr. Son",
        specialty: "Pediatrics",
        email: "lee@hospital.com"
    }
]);

// patients 컬렉션에 데이터 삽입 (doctors 컬렉션 참조)
db.patients.insertMany([
    {
        _id: ObjectId("65d94f2f9a1d4a3b0c5a1j01"),
        name: "Sean",
        age: 45,
        email: "Sean@patient.com",
        doctorId: doctorId1 // Dr. Smith 참조 (심장내과)
    },
    {
        _id: ObjectId("65d94f2f9a1d4a3b0c5a1j02"),
        name: "Bob",
        age: 38,
        email: "bob@patient.com",
        doctorId: doctorId2 // Dr. Johnson 참조 (신경과)
    },
    {
        _id: ObjectId("65d94f2f9a1d4a3b0c5a1j03"),
        name: "Charlie",
        age: 10,
        email: "charlie@patient.com",
        doctorId: doctorId3 // Dr. Son 참조 (소아과)
    }
]);



// 3. 계층형 데이터 구조
// categories 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.

// 최상위 카테고리 ObjectId 생성
var electronicsId = ObjectId("65d94f2f9a1d4a3b0c5a1k01");
var clothingId = ObjectId("65d94f2f9a1d4a3b0c5a1k02");

// 하위 카테고리 ObjectId 생성
var laptopsId = ObjectId("65d94f2f9a1d4a3b0c5a1k03");
var smartphonesId = ObjectId("65d94f2f9a1d4a3b0c5a1k04");
var mensWearId = ObjectId("65d94f2f9a1d4a3b0c5a1k05");
var womensWearId = ObjectId("65d94f2f9a1d4a3b0c5a1k06");

// categories 컬렉션에 데이터 삽입
db.categories.insertMany([
    {
        _id: electronicsId,
        name: "Electronics",
        parentId: null // 최상위 카테고리
    },
    {
        _id: clothingId,
        name: "Clothing",
        parentId: null // 최상위 카테고리
    },
    {
        _id: laptopsId,
        name: "Laptops",
        parentId: electronicsId // "Electronics"의 하위 카테고리
    },
    {
        _id: smartphonesId,
        name: "Smartphones",
        parentId: electronicsId // "Electronics"의 하위 카테고리
    },
    {
        _id: mensWearId,
        name: "Men's Wear",
        parentId: clothingId // "Clothing"의 하위 카테고리
    },
    {
        _id: womensWearId,
        name: "Women's Wear",
        parentId: clothingId // "Clothing"의 하위 카테고리
    }
]);


// comments 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.

// 최상위 댓글 ObjectId 생성
var commentId1 = ObjectId("65d94f2f9a1d4a3b0c5a1l01");
var commentId2 = ObjectId("65d94f2f9a1d4a3b0c5a1l02");

// 대댓글(답글) ObjectId 생성
var replyId1 = ObjectId("65d94f2f9a1d4a3b0c5a1l03");
var replyId2 = ObjectId("65d94f2f9a1d4a3b0c5a1l04");

// comments 컬렉션에 데이터 삽입
db.comments.insertMany([
    {
        _id: commentId1,
        postId: ObjectId("65d94f2f9a1d4a3b0c5a1p01"), // 특정 게시글 참조
        userId: ObjectId("65d94f2f9a1d4a3b0c5a1u01"), // 댓글 작성자 참조
        content: "This is the first comment.",
        parentId: null, // 최상위 댓글
        createdAt: new Date()
    },
    {
        _id: commentId2,
        postId: ObjectId("65d94f2f9a1d4a3b0c5a1p01"), // 동일 게시글 참조
        userId: ObjectId("65d94f2f9a1d4a3b0c5a1u02"), // 다른 작성자
        content: "This is another top-level comment.",
        parentId: null, // 최상위 댓글
        createdAt: new Date()
    },
    {
        _id: replyId1,
        postId: ObjectId("65d94f2f9a1d4a3b0c5a1p01"), // 동일 게시글 참조
        userId: ObjectId("65d94f2f9a1d4a3b0c5a1u03"), // 답글 작성자
        content: "This is a reply to the first comment.",
        parentId: commentId1, // 첫 번째 댓글의 대댓글
        createdAt: new Date()
    },
    {
        _id: replyId2,
        postId: ObjectId("65d94f2f9a1d4a3b0c5a1p01"), // 동일 게시글 참조
        userId: ObjectId("65d94f2f9a1d4a3b0c5a1u01"), // 원 댓글 작성자가 답글을 다시 답
        content: "This is a reply to the second comment.",
        parentId: commentId2, // 두 번째 댓글의 대댓글
        createdAt: new Date()
    }
]);


// company_structure 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.

// 최상위 부서 ObjectId 생성
var companyId = ObjectId("65d94f2f9a1d4a3b0c5a1m01");
var hrDeptId = ObjectId("65d94f2f9a1d4a3b0c5a1m02");
var itDeptId = ObjectId("65d94f2f9a1d4a3b0c5a1m03");

// 하위 부서 ObjectId 생성
var recruitmentId = ObjectId("65d94f2f9a1d4a3b0c5a1m04");
var payrollId = ObjectId("65d94f2f9a1d4a3b0c5a1m05");
var devTeamId = ObjectId("65d94f2f9a1d4a3b0c5a1m06");
var supportTeamId = ObjectId("65d94f2f9a1d4a3b0c5a1m07");

// company_structure 컬렉션에 데이터 삽입
db.company_structure.insertMany([
    {
        _id: companyId,
        name: "ABC Corporation",
        parentId: null, // 최상위 조직 (회사)
        level: "Company"
    },
    {
        _id: hrDeptId,
        name: "Human Resources",
        parentId: companyId, // ABC Corporation의 하위 부서
        level: "Department"
    },
    {
        _id: itDeptId,
        name: "IT Department",
        parentId: companyId, // ABC Corporation의 하위 부서
        level: "Department"
    },
    {
        _id: recruitmentId,
        name: "Recruitment Team",
        parentId: hrDeptId, // Human Resources의 하위 부서
        level: "Team"
    },
    {
        _id: payrollId,
        name: "Payroll Team",
        parentId: hrDeptId, // Human Resources의 하위 부서
        level: "Team"
    },
    {
        _id: devTeamId,
        name: "Development Team",
        parentId: itDeptId, // IT Department의 하위 부서
        level: "Team"
    },
    {
        _id: supportTeamId,
        name: "Support Team",
        parentId: itDeptId, // IT Department의 하위 부서
        level: "Team"
    }
]);


// locations 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.

// 최상위 위치 (국가) ObjectId 생성
var usaId = ObjectId("65d94f2f9a1d4a3b0c5a1n01");
var canadaId = ObjectId("65d94f2f9a1d4a3b0c5a1n02");

// 중간 계층 (도시) ObjectId 생성
var newYorkId = ObjectId("65d94f2f9a1d4a3b0c5a1n03");
var losAngelesId = ObjectId("65d94f2f9a1d4a3b0c5a1n04");
var torontoId = ObjectId("65d94f2f9a1d4a3b0c5a1n05");
var vancouverId = ObjectId("65d94f2f9a1d4a3b0c5a1n06");

// 하위 위치 (지점) ObjectId 생성
var nyBranch1Id = ObjectId("65d94f2f9a1d4a3b0c5a1n07");
var nyBranch2Id = ObjectId("65d94f2f9a1d4a3b0c5a1n08");
var laBranch1Id = ObjectId("65d94f2f9a1d4a3b0c5a1n09");
var torontoBranchId = ObjectId("65d94f2f9a1d4a3b0c5a1n10");
var vancouverBranchId = ObjectId("65d94f2f9a1d4a3b0c5a1n11");

// locations 컬렉션에 데이터 삽입
db.locations.insertMany([
    {
        _id: usaId,
        name: "United States",
        parentId: null, // 최상위 국가
        level: "Country"
    },
    {
        _id: canadaId,
        name: "Canada",
        parentId: null, // 최상위 국가
        level: "Country"
    },
    {
        _id: newYorkId,
        name: "New York",
        parentId: usaId, // 미국의 하위 도시
        level: "City"
    },
    {
        _id: losAngelesId,
        name: "Los Angeles",
        parentId: usaId, // 미국의 하위 도시
        level: "City"
    },
    {
        _id: torontoId,
        name: "Toronto",
        parentId: canadaId, // 캐나다의 하위 도시
        level: "City"
    },
    {
        _id: vancouverId,
        name: "Vancouver",
        parentId: canadaId, // 캐나다의 하위 도시
        level: "City"
    },
    {
        _id: nyBranch1Id,
        name: "New York Branch 1",
        parentId: newYorkId, // 뉴욕의 하위 지점
        level: "Branch"
    },
    {
        _id: nyBranch2Id,
        name: "New York Branch 2",
        parentId: newYorkId, // 뉴욕의 하위 지점
        level: "Branch"
    },
    {
        _id: laBranch1Id,
        name: "Los Angeles Branch 1",
        parentId: losAngelesId, // 로스앤젤레스의 하위 지점
        level: "Branch"
    },
    {
        _id: torontoBranchId,
        name: "Toronto Branch",
        parentId: torontoId, // 토론토의 하위 지점
        level: "Branch"
    },
    {
        _id: vancouverBranchId,
        name: "Vancouver Branch",
        parentId: vancouverId, // 밴쿠버의 하위 지점
        level: "Branch"
    }
]);


// menus 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.

// 최상위 메뉴 (카테고리) ObjectId 생성
var mainMenuId = ObjectId("65d94f2f9a1d4a3b0c5a1m01");
var drinksMenuId = ObjectId("65d94f2f9a1d4a3b0c5a1m02");
var foodMenuId = ObjectId("65d94f2f9a1d4a3b0c5a1m03");

// 서브 메뉴 ObjectId 생성
var hotDrinksId = ObjectId("65d94f2f9a1d4a3b0c5a1m04");
var coldDrinksId = ObjectId("65d94f2f9a1d4a3b0c5a1m05");
var appetizersId = ObjectId("65d94f2f9a1d4a3b0c5a1m06");
var mainDishesId = ObjectId("65d94f2f9a1d4a3b0c5a1m07");

// 메뉴 아이템 ObjectId 생성
var coffeeId = ObjectId("65d94f2f9a1d4a3b0c5a1m08");
var teaId = ObjectId("65d94f2f9a1d4a3b0c5a1m09");
var juiceId = ObjectId("65d94f2f9a1d4a3b0c5a1m10");
var pizzaId = ObjectId("65d94f2f9a1d4a3b0c5a1m11");
var burgerId = ObjectId("65d94f2f9a1d4a3b0c5a1m12");

// menus 컬렉션에 데이터 삽입
db.menus.insertMany([
    {
        _id: mainMenuId,
        name: "Main Menu",
        parentId: null, // 최상위 메뉴
        level: "Category"
    },
    {
        _id: drinksMenuId,
        name: "Drinks",
        parentId: mainMenuId, // Main Menu의 하위 메뉴
        level: "Category"
    },
    {
        _id: foodMenuId,
        name: "Food",
        parentId: mainMenuId, // Main Menu의 하위 메뉴
        level: "Category"
    },
    {
        _id: hotDrinksId,
        name: "Hot Drinks",
        parentId: drinksMenuId, // Drinks의 하위 서브 메뉴
        level: "Subcategory"
    },
    {
        _id: coldDrinksId,
        name: "Cold Drinks",
        parentId: drinksMenuId, // Drinks의 하위 서브 메뉴
        level: "Subcategory"
    },
    {
        _id: appetizersId,
        name: "Appetizers",
        parentId: foodMenuId, // Food의 하위 서브 메뉴
        level: "Subcategory"
    },
    {
        _id: mainDishesId,
        name: "Main Dishes",
        parentId: foodMenuId, // Food의 하위 서브 메뉴
        level: "Subcategory"
    },
    {
        _id: coffeeId,
        name: "Coffee",
        parentId: hotDrinksId, // Hot Drinks의 하위 아이템
        level: "Item"
    },
    {
        _id: teaId,
        name: "Tea",
        parentId: hotDrinksId, // Hot Drinks의 하위 아이템
        level: "Item"
    },
    {
        _id: juiceId,
        name: "Juice",
        parentId: coldDrinksId, // Cold Drinks의 하위 아이템
        level: "Item"
    },
    {
        _id: pizzaId,
        name: "Pizza",
        parentId: appetizersId, // Appetizers의 하위 아이템
        level: "Item"
    },
    {
        _id: burgerId,
        name: "Burger",
        parentId: mainDishesId, // Main Dishes의 하위 아이템
        level: "Item"
    }
]);

