/* Login & SignUp */

export const EmailCheckUrl = `https://reseep:8000/api/emailcheck/` //이메일 체크(Post)
export const SignUpUrl = `https://reseep:8000/api/accounts/logout/` // 회원가입(Post)

export const LoginUrl = `https://reseep:8000/api/accounts/login/` // 로그인(Post)
export const LogoutUrl = `https://reseep:8000/api/accounts/logout/` // 로그인(Post)
/* JWT */
export const refreshUrl = `https://reseep:8000/api/accounts/token/refresh/` // 로그인(Post)

/* Category */

export const CategoryListUrl = `https://reseep:8000/api/books/` // 카테고리 리스트 가져오기(Get) , 생성시 Post
export const CategoryDelete = (id: number) => `https://reseep:8000/api/books/${id}/` // 카테고리 책 삭제(Delete)

/* Books & Review */
export const ReviewBooks = (id:number) => `https://reseep:8000/api/books/${id}/review/` // Books 리뷰(Get) , 리뷰 복습완료(Post)

export const BooksListUrl = (id:number) => `https://reseep:8000/api/books/${id}/posts/` // 책들 리스트
export const BooksImageUpload = (id:number) => `https://reseep:8000/api/books/posts/${id}/imgs/` //Books 이미지 업로드 (Post)
export const BooksPostUrl = (id:number) => `https://reseep:8000/api/books/${id}/posts/` // Books 포스트 생성(Post)
export const BooksPostDataUrl = (id:number , postId:number) => `https://reseep:8000/api/books/${id}/posts/${postId}/` // 책하나의 값(get) , 수정(put)