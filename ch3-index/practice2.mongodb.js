// #빅데이터_수집_저장 #미니실습, #몽고디비

db.users.insertOne({ name: "Son", email: "Son@gmail.com" })

db.users.insertOne({ name: "Charlie" })

db.users.insertMany([
    { name: "Son", status: "active", email: "Son@gmail.com", city: "London" },
    { name: "Kim", status: "inactive", email: "Kim@gmail.com", city: "Germany" }
])

db.users.dropIndexes()

db.users.dropIndex("status_1")

// ✅ 1. users 컬렉션에서 age 필드에 단일 인덱스 생성

db.users.createIndex({ age: 1 })

// ✅ 2. users 컬렉션에서 기존에 존재하는 모든 인덱스 조회

db.users.getIndexes()

// ✅ 3. users 컬렉션에서 city 필드의 단일 인덱스를 삭제

db.users.createIndex({ city: 1 })
db.users.dropIndex("city_1")

// ✅ 4. users 컬렉션에서 age와 city 필드에 대한 복합 인덱스 생성

db.users.createIndex({ age: 1, city: 1 })

// ✅ 5. users 컬렉션에서 email 필드를 기준으로 유니크 인덱스 생성

db.users.createIndex({ email: 1 }, { unique: true })

// ✅ 6. users 컬렉션에서 status 필드의 스파스 인덱스 생성

db.users.createIndex({ status: 1 }, { sparse: true })

// ✅ 7. users 컬렉션에서 age 필드에 대해 30세 이상만 포함하는 부분 인덱스 생성

db.users.createIndex({ age: 1 }, { partialFilterExpression: { age: { $gte: 30 } } })

// ✅ 8. transactions 컬렉션에서 date 필드에 대한 백그라운드 인덱스 생성

db.transactions.createIndex({ date: 1 }, { background: true })

// ✅ 9. products 컬렉션에서 name과 category 필드를 포함하는 커버드 인덱스 생성

db.products.createIndex({ name: 1, category: 1 })

// ✅ 10. locations 컬렉션에서 coordinates 필드에 대한 지리 공간 인덱스 생성

db.locations.createIndex({ coordinates: "2dsphere" })

// ✅ 11. 특정 좌표(서울)에서 반경 10km 내 위치 검색 ($center)

db.locations.find({
    coordinates: {
        $geoWithin: {
            $center: [[126.978, 37.5665], 10 / 3963.2]  // 서울 위도 37.5665, 경도 126.978 기준, 10km (마일 단위로 변환)
        }
    }
})

// ✅ 12. 특정 지역의 사각형 범위 내 검색 ($box)

db.locations.find({
    coordinates: {
        $geoWithin: {
            $box: [[126.8, 37.5], [127.2, 37.7]]  // 서울의 대략적인 사각형 영역
        }
    }
})

// ✅ 13. 다각형 영역 내 검색 ($polygon)

db.locations.find({
    coordinates: {
        $geoWithin: {
            $polygon: [
                [126.8, 37.5],  // 좌측 하단 점
                [126.9, 37.5],  // 우측 하단 점
                [126.9, 37.6],  // 우측 상단 점
                [126.8, 37.6]   // 좌측 상단 점
            ]
        }
    }
})

// ✅ 14. businesses 컬렉션에서 다중 위치 지점 데이터 저장 및 인덱스 생성

db.businesses.insertMany([
    {
        name: "Cafe A",
        category: "Cafe",
        locations: [
            { type: "Point", coordinates: [127.1, 37.6] }, // 첫 번째 지점
            { type: "Point", coordinates: [127.2, 37.7] }  // 두 번째 지점
        ]
    },
    {
        name: "Restaurant B",
        category: "Restaurant",
        locations: [
            { type: "Point", coordinates: [126.9, 37.5] }  // 첫 번째 지점
        ]
    }
])


// ✅ 15. 현재 위치에서 가장 가까운 장소 찾기 ($nearSphere)

db.locations.find({
    coordinates: {
        $nearSphere: {
            $geometry: { type: "Point", coordinates: [127.1, 37.6] },  // 현재 위치 (경도, 위도)
            $maxDistance: 5000  // 5km 이내
        }
    }
})


// ✅ 16. places 컬렉션에서 GeoON 형식의 포인트 데이터 저장 및 인덱스 생성

db.places.insertMany([
    {
        name: "Place A",
        location: {
            type: "Point",  // GeoJSON 포인트
            coordinates: [127.1, 37.6]  // [경도, 위도] 형식
        }
    },
    {
        name: "Place B",
        location: {
            type: "Point",
            coordinates: [127.2, 37.7]
        }
    }
])


// ✅ 17. 특정 카테고리(Technology)를 구독한 사용자 찾기

db.users.find({
    subscriptions: { $in: ["Technology"] }
})


// ✅ 18. 특정 사용자가 특정 제품을 구매했는지 확인

db.users.find({
    "orders": {
        $elemMatch: { product: "Laptop" }
    }
})


// ✅ 19. 최근에 가입한 사용자 찾기

db.users.find().sort({ joinedAt: -1 })


// ✅ 20. 이메일 도메인별 사용자 수 계산

db.users.aggregate([
    {
        $project: {
            emailDomain: { $substrBytes: ["$email", { $add: [{ $indexOfBytes: ["$email", "@"] }, 1] }, -1] }
        }
    },
    {
        $group: {
            _id: "$emailDomain",
            userCount: { $sum: 1 }
        }
    }
])