# 애기어때 - 백엔드 서버

## 시작하기
```
git clone https://kdt-gitlab.elice.io/sw_track/class_07/web_project/team02/backend.git
-
npm install
-
npm run dev
```

## 사용한 기술 스택
+ express.js
+ jsonwebtoken (JWT)
+ mongoose (mongoDB Atlas)
+ nanoid
+ nodemon
+ nodemailer

## 간략한 API 명세서 
### User : 사용자
+ 사용자 로그인
    + POST /users/login
    + 사용자를 확인하고 토큰을 생성한다.
+ 사용자 회원가입
    + POST /users/join
    + 사용자 계정을 생성한다.
+ 아이디 중복 체크
    + POST /users/join/:id
    + 사용자
+ 사용자 본인인증
    + POST /users
    + 사용자 계정을 수정하기 위해 비밀번호를 입력한다.
+ 사용자 정보 수정
    + PUT /users
    + req.body로 사용자 정보를 받아와 수정한다.
+ 사용자 정보 삭제
    + DELETE /users
    + 토큰에서 사용자 아이디를 가져와 사용자를 삭제한다.
+ 사용자 정보 조회
    + GET /users
    + 토큰에서 사용자 아이디를 가져와 정보를 불러온다.
+ 비밀번호 변경 전 본인확인
    + POST /users/password
    + 비밀번호 변경을 위해 사용자 정보를 받아온다.
+ 비밀번호 변경
    + PUT /users/password/:userid
    + 비밀번호를 변경한다.
+ 아이디 찾기
    + POST /users/id
    + 사용자 아이디를 이름과 이메일로 찾는다.

### Admin : 관리자
+ 관리자 로그인
    + POST /admin/login
    + 관리자를 확인하고 토큰을 생성한다.
+ 관리자 계정 생성
    + POST /admin/signup
    + 관리자 계정을 생성한다.

### Products : 상품
+ 상품 전체 불러오기
    + GET /products?page={}
    + 상품 전체를 페이징해서 불러온다.
+ 상품 상세정보 불러오기
    + GET /products/:seq
    + 상품 시퀀스로 상품 정보를 불러온다.
+ 상품 검색하기
    + GET /products/search?name={}&page={}
    + 검색한 상품명을 받아와 찾은 상품들을 페이징해서 불러온다.

> 토큰에서 관리자를 확인해서 라우팅한다.
+ 관리자 상품 추가
    + POST /products
    + req.body에서 상품 정보들을 불러와서 상품을 생성한다.
+ 관리자 상품 수정
    + PUT /products
    + req.body에서 상품 정보들을 불러와서 상품을 수정한다.
+ 관리자 상품 삭제
    + DELETE /products/:seq
    + 상품 시퀀스로 상품을 삭제한다.

### Category : 카테고리
+ 전체 메인 카테고리 불러오기
    + GET /categories/main
    + 전체 메인 카테고리의 정보를 불러온다.
+ 전체 서브 카테고리 불러오기
    + GET /categories/sub
    + 전체 서브 카테고리 정보를 불러온다.
+ 카테고리 상품 불러오기
    + GET /categories/products?en_name={}&page={}
    + 해당 카테고리의 전체 상품을 페이징해서 불러온다.

> 토큰에서 관리자를 확인해서 라우팅한다.
+ 관리자 메인 카테고리 추가
    + POST /categories/main
    + 카테고리 이름을 받아와 메인 카테고리를 생성한다. (서브 카테고리를 참조한다.)
+ 관리자 서브 카테고리 추가
    + POST /categories/sub
    + 서브 카테고리 이름, 메인 카테고리 이름을 받아와 서브 카테고리를 생성한다. (메인 카테고리를 참조한다.)
+ 관리자 메인 카테고리 수정
    + PUT /categories/main
    + 메인 카테고리의 이름을 변경한다.
+ 관리자 서브 카테고리 수정
    + PUT /categories/sub
    + 서브 카테고리의 이름을 변경한다.
+ 관리자 카테고리 삭제
    + DELETE /categories/:en_name
    + 카테고리 이름을 받아와 삭제한다.

### Order : 주문
+ 특정 사용자의 모든 주문 불러오기
    + GET /orders
    + 토큰에서 사용자 정보를 받아와 해당 사용자의 모든 주문을 불러온다.
+ 주문 정보 불러오기
    + GET /orders/:id
    + 주문 아이디로 주문 정보를 검색한다.
+ 주문 추가
    + POST /orders
    + req.body에서 주문자 정보, 상품 정보를 불러와 주문을 생성한다.
+ 주문 정보 수정
    + PUT /orders
    + 주문 아이디를 통해 주문자 정보를 수정한다.
+ 주문 취소
    + PUT /orders/:id
    + 주문 아이디를 통해 주문을 취소상태로 변경한다.

> 토큰에서 관리자를 확인해서 라우팅한다.
+ 관리자 주문 상태 수정
    + PUT /orders
    + 주문 아이디를 통해 배송 상태를 수정한다.
+ 관리자 주문 삭제
    + DELETE /orders/:id
    + 주문 아이디를 통해 주문을 삭제한다.

## 백엔드 팀원
+ 김정운 : products, categories
+ 이희주 : users
+ 곽동선 : orders, admin
