/* Login & SignUp */

export const EmailCheckUrl = `${process.env.REACT_APP_PORT}/api/emailcheck/` //이메일 체크(Post)
export const SignUpUrl = `${process.env.REACT_APP_PORT}/api-auth/` // 회원가입(Post)

export const LoginUrl = `${process.env.REACT_APP_PORT}/api-auth/login/` // 로그인(Post)
export const LogoutUrl = `${process.env.REACT_APP_PORT}/api-auth/logout/` // 로그인(Post)
/* JWT */
export const refreshUrl = `${process.env.REACT_APP_PORT}/api-auth/token/refresh/` // 로그인(Post)

/* Category */
export const CategoryListUrl = `${process.env.REACT_APP_PORT}/api/books/` // 카테고리 리스트 가져오기(Get) , 생성시 Post
export const CategoryDelete = (id: number) => `${process.env.REACT_APP_PORT}/api/books/${id}/` // 카테고리 책 삭제(Delete)

/* Books & Review */
export const ReviewBooks = (id:number) => `${process.env.REACT_APP_PORT}/api/books/${id}/review/` // Books 리뷰(Get) , 리뷰 복습완료(Post)

export const BooksListUrl = (id:number) => `${process.env.REACT_APP_PORT}/api/books/${id}/posts/` // 책들 리스트
export const BooksImageUpload = (id:number) => `${process.env.REACT_APP_PORT}/api/books/posts/${id}/imgs/` //Books 이미지 업로드 (Post)
export const BooksPostUrl = (id:number) => `${process.env.REACT_APP_PORT}/api/books/${id}/posts/` // Books 포스트 생성(Post)
export const BooksPostDataUrl = (id:number , postId:number) => `${process.env.REACT_APP_PORT}/api/books/${id}/posts/${postId}/` // 책하나의 값(get) , 수정(put)