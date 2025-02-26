// #빅데이터_수집_저장 #미니실습, #몽고디비
// 📌 기본 실습 문제
// 1. Embedded Document (Rich Document)
// users 컬렉션을 생성하고, name, age, address 필드를 가진 문서를 삽입하시오.

db.createCollection("users")

//예시1
db.users.insertOne({
    name: "Son",
    age: 28,
    address: {
        street: "156 Main Street",
        city: "London",
        country: "England"
    }
})

//예시2
db.users.insertOne({
    name: "John Doe",
    age: 30,
    address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001"
    }
});


// products 컬렉션에 name, price, manufacturer 필드를 가진 문서를 삽입하시오.

db.createCollection("products")

//예시1
db.products.insertOne({
    name: "Son",
    price: 29.99,
    manufacturer: "Acme Inc"

})

//예시2
db.products.insertMany([
    {
        name: "Smartphone",
        price: 800,
        manufacturer: "XYZ Tech"
    },
    {
        name: "Tablet",
        price: 400,
        manufacturer: "TechWorld"
    },
    {
        name: "Headphones",
        price: 150,
        manufacturer: "SoundCo"
    }
]);


// orders 컬렉션에 주문 정보(orderId, userId, items)를 Embedded Document로 삽입하시오.

db.createCollection("orders")

//예시1
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

//예시2
db.orders.insertOne({
    orderId: "ORD001",
    userId: "David",
    items: [
        { productId: "PROD001", name: "Laptop", quantity: 1, price: 1200 },
        { productId: "PROD002", name: "Mouse", quantity: 2, price: 25 }
    ],
    orderDate: ISODate("2024-02-25T12:00:00Z"),
    totalPrice: 1250
});

// books 컬렉션에 title, author, details(페이지 수, 출판 연도 포함) 필드를 가진 문서를 삽입하시오.

db.createCollection("books")

//예시1
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

//예시2
db.books.insertOne({
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    details: {
        pages: 180,
        publicationYear: 1925
    }
});


// reviews 컬렉션에 productId, userId, rating, comment를 Embedded Document로 저장하시오.

db.createCollection("reviews")

//예시1
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
]);

//예시2
db.reviews.insertOne({
    productId: "PROD001",
    userId: "Frank",
    rating: 4,
    comment: "Great product, very satisfied with the performance."
});


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

// 최상위 카테고리 (전자제품) ObjectId 생성
var catElectronics = ObjectId("67be61f48dd05ef4b630cb96");

// categories 컬렉션에 데이터 삽입 (최상위 카테고리 "전자제품")
db.categories.insertOne({
    _id: catElectronics,
    name: "전자제품",
    parentId: null  // 최상위 카테고리
});

// 하위 카테고리 (컴퓨터) 추가 (전자제품 카테고리의 하위 카테고리로 참조)
db.categories.insertOne({
    name: "컴퓨터",
    parentId: catElectronics  // 전자제품 카테고리의 하위 카테고리
});

// 추가 카테고리 삽입 (컴퓨터 -> 노트북)
var catLaptop = ObjectId();
db.categories.insertOne({
    _id: catLaptop,
    name: "노트북",
    parentId: catElectronics  // 전자제품 카테고리의 하위 카테고리
});

// 추가 카테고리 삽입 (노트북 -> 게이밍 노트북)
db.categories.insertOne({
    name: "게이밍 노트북",
    parentId: catLaptop  // 노트북 카테고리의 하위 카테고리
});

// 다른 카테고리 예시 추가 (전자제품 -> 스마트폰)
var catSmartphone = ObjectId();
db.categories.insertOne({
    _id: catSmartphone,
    name: "스마트폰",
    parentId: catElectronics  // 전자제품 카테고리의 하위 카테고리
});


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

// 최상위 회사 (ABC Corp) ObjectId 생성
var companyId = ObjectId("67be62f943ddc4f2d8a34376");

// 회사 삽입 (최상위 노드)
db.company_structure.insertOne({
    _id: companyId,
    name: "ABC Corp",
    parentId: null  // 최상위 회사 (parentId: null)
});

// 영업부 삽입 (ABC Corp의 하위 부서)
var salesDeptId = ObjectId();
db.company_structure.insertOne({
    _id: salesDeptId,
    name: "영업부",
    parentId: companyId  // ABC Corp의 하위 부서
});

// 영업부의 하위 부서 추가 (영업팀)
var salesTeamId = ObjectId();
db.company_structure.insertOne({
    _id: salesTeamId,
    name: "영업팀",
    parentId: salesDeptId  // 영업부의 하위 부서
});

// 영업부의 또 다른 하위 부서 추가 (마케팅팀)
var marketingTeamId = ObjectId();
db.company_structure.insertOne({
    _id: marketingTeamId,
    name: "마케팅팀",
    parentId: salesDeptId  // 영업부의 하위 부서
});

// 개발부 삽입 (ABC Corp의 또 다른 하위 부서)
var devDeptId = ObjectId();
db.company_structure.insertOne({
    _id: devDeptId,
    name: "개발부",
    parentId: companyId  // ABC Corp의 하위 부서
});

// 개발부의 하위 부서 추가 (프론트엔드팀)
var frontendTeamId = ObjectId();
db.company_structure.insertOne({
    _id: frontendTeamId,
    name: "프론트엔드팀",
    parentId: devDeptId  // 개발부의 하위 부서
});

// 개발부의 또 다른 하위 부서 추가 (백엔드팀)
var backendTeamId = ObjectId();
db.company_structure.insertOne({
    _id: backendTeamId,
    name: "백엔드팀",
    parentId: devDeptId  // 개발부의 하위 부서
});

// locations 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.

// 최상위 위치 (대한민국) ObjectId 생성
var countryId = ObjectId("67be63453ed75d2e5dcd7c10");

// locations 컬렉션에 최상위 위치 데이터 삽입
db.locations.insertOne({
    _id: countryId,
    name: "대한민국",
    parentId: null  // 최상위 위치 (국가)
});

// 하위 위치 추가 (서울특별시)
db.locations.insertOne({
    name: "서울특별시",
    parentId: countryId  // 대한민국에 속하는 하위 위치
});

// 서울특별시의 하위 위치 (강남구) 추가
var gangnamId = ObjectId();
db.locations.insertOne({
    _id: gangnamId,
    name: "강남구",
    parentId: countryId  // 대한민국에 속하는 하위 위치
});

// 강남구의 하위 위치 (역삼동) 추가
var yeoksamId = ObjectId();
db.locations.insertOne({
    _id: yeoksamId,
    name: "역삼동",
    parentId: gangnamId  // 강남구에 속하는 하위 위치
});

// 또 다른 하위 위치 추가 (서울특별시 -> 종로구)
var jongnoId = ObjectId();
db.locations.insertOne({
    _id: jongnoId,
    name: "종로구",
    parentId: countryId  // 대한민국에 속하는 하위 위치
});


// menus 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.

// 최상위 메뉴 (대시보드) ObjectId 생성
var dashboardId = ObjectId("67be640135f8904d92475f89");

// 대시보드 메뉴 삽입 (최상위 메뉴)
db.menus.insertOne({
    _id: dashboardId,
    name: "Dashboard",
    url: "/dashboard",
    parentId: null  // 최상위 메뉴
});

// 제품 메뉴 삽입 (최상위 메뉴)
var productsId = ObjectId();
db.menus.insertOne({
    _id: productsId,
    name: "Products",
    url: "/products",
    parentId: null  // 최상위 메뉴
});

// 하위 메뉴 추가 (Products -> Electronics)
var electronicsId = ObjectId();
db.menus.insertOne({
    _id: electronicsId,
    name: "Electronics",
    url: "/products/electronics",
    parentId: productsId  // Products 메뉴의 하위 메뉴
});

// Electronics 메뉴 하위 메뉴 추가 (Electronics -> Smartphones)
var smartphonesId = ObjectId();
db.menus.insertOne({
    _id: smartphonesId,
    name: "Smartphones",
    url: "/products/electronics/smartphones",
    parentId: electronicsId  // Electronics 메뉴의 하위 메뉴
});

// Electronics 메뉴 하위 메뉴 추가 (Electronics -> Laptops)
var laptopsId = ObjectId();
db.menus.insertOne({
    _id: laptopsId,
    name: "Laptops",
    url: "/products/electronics/laptops",
    parentId: electronicsId  // Electronics 메뉴의 하위 메뉴
});

// 또 다른 메뉴 삽입 (Products -> Furniture)
var furnitureId = ObjectId();
db.menus.insertOne({
    _id: furnitureId,
    name: "Furniture",
    url: "/products/furniture",
    parentId: productsId  // Products 메뉴의 하위 메뉴
});