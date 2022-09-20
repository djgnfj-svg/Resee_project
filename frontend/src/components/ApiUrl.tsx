/* Login & SignUp */

export const EmailCheckUrl = `http://127.0.0.1:8000/api/emailcheckedaaadasd/` //이메일 체크(Post)
export const SignUpUrl = `http://127.0.0.1:8000/api/accounts/` // 회원가입(Post)

export const LoginUrl = `http://127.0.0.1:8000/api/accounts/login/` // 로그인(Post)

/* Category */

export const CategoryListUrl = `http://127.0.0.1:8000/api/books/` // 카테고리 리스트 가져오기(Get) , 생성시 Post
export const CategoryDelete = (id: number) => `http://127.0.0.1:8000/api/books/${id}/` // 카테고리 책 삭제(Delete)


/* Books & Review */
export const ReviewBooks = (id:number) => `http://127.0.0.1:8000/api/books/${id}/review/` // Books 리뷰(Get) , 리뷰 복습완료(Post)

export const BooksListUrl = (id:number) => `http://127.0.0.1:8000/api/books/${id}/post/` // 책들 리스트
export const BooksImageUpload = (id:number) => `http://127.0.0.1:8000/api/books/post/${id}/imgs/` //Books 이미지 업로드 (Post)
export const BooksPostUrl = (id:number) => `http://127.0.0.1:8000/api/books/${id}/post/` // Books 포스트 생성(Post)
export const BooksPostData = (id:number , postId:number) => `http://127.0.0.1:8000/api/books/${id}/post/${postId}/` // 책하나의 값(get) , 수정(put)