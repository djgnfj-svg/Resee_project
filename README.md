# 프로젝트명 : ReSee

#### url : https://www.reseep.com/
#### last_update : 22.10.2
#### 프로젝트 기간 : 22.09.14 ~ 진행중
#### 프로토타입 : 22.06.09 ~ 2022-07-21
---

## 🙉개발인원 2명

#### Back-end : [송영재](https://github.com/djgnfj-svg)
#### Front-end : [박형석](https://github.com/b-hyoung)

---

# ⭐️사용기술
## 공통
- Git & GitHub : 버전 관리
- Notion : 공유 문서
- Discord : 페어 프로그래밍

## Backend(송영재)

- Django, Python, DRF
- Mysql
- RESTful API
- AWS-EC2, RDS, ELB, nginx

## Frontend(박형석)
- HTML, CSS
- React.js
- TypeScript (진행중)
---
## 👜문서

- [ERD](https://www.erdcloud.com/d/XhuoHNQ8E5XDYvMaM) 송영재
- [API문서](https://reseep.com:8000/swagger) 송영재
- [시스템흐름도] 추가예정
- [화면정의서] 추가예정

---

## 💎기능
### 유저

- 회원가입

    ![회원가입](https://user-images.githubusercontent.com/87049249/189102596-a3e7632a-61a4-4f13-8286-65ca5c784fdd.gif)

- 책 CRUD

    ![책사용](https://user-images.githubusercontent.com/87049249/189107028-de391920-3719-4b22-9f5e-f09d4a2c8d04.gif)

- 수정 및 이미지업로드

    ![수정 및 이미지올리기](https://user-images.githubusercontent.com/87049249/189108741-3191da89-83b6-46fd-8052-fd81f138c193.gif)

- 복습 시스템

    ![복습하기](https://user-images.githubusercontent.com/87049249/189250292-f2956d70-9dee-4ef7-937b-7398ed260a49.gif)


## 🦼진행중
- docker를 활용한 CI/CD
    1. 현재는 github action을 통한 ci만 구축된 상태입니다.
- 유지보수를 위한 TypeScript도입
---
## 추가예정

#### 공동
- 소셜 로그인
- 수익수단?

#### Front
- 반응형 (2순위)
- 디자인 (2순위)

#### Back 
- OAuth (2순위)
- 유저가입 구현(2순위)

#### 버그
- 인증을 안한계정은 아무것도 못하게 해놨으나, 재가입을 진행시에 이미 있는 이메일이라고 뜨는 버그
#### 문제
- 포폴사이트에서 진짜이메일 인증을 해야하는가?
    - Test계정을 만들어 제공
순위기준
1. 급하고 중요
2. 안급한데 중요
3. 급한데 안중요
4. 안급하고 안중요
5. 정책상 애메해서 넣을수 없는거 (포폴사이트에서 진짜이메일 인증을 해야하는가?)
