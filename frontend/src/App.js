import './App.css';
import MyNavbar from './components/Nav';
import Login from './router/Login/Login'
import Sign_up from './router/Sign_up/sign_up'
import Home from './router/Main/Home'
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import useState from 'react'
import Board from './router/Board/Board';
import CategoryBooks from './router/Board/CategoryBooks/CategoryBooks';
import WritePage from './router/Board/CategoryBooks/WritePage/WritePage';
import BooksReviewPage from './router/Board/CategoryBooks/BooksReviewPage/BooksReviewPage';
import BooksPostData from './router/Board/CategoryBooks/BooksPostData/BooksPostData';
import isLogin from './components/isLogin';
import BooksChangeData from './router/Board/CategoryBooks/BooksChangeData/BooksChangeData';


function App() {

	return (
		<div className="App">
			<MyNavbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/sign_up" element={<Sign_up />} />
				<Route path="/board" element={<Board />} />
				<Route path="/board/categoryBooks/:id" element={<CategoryBooks />} />
				<Route path="/board/categoryBooks/:id/review" element={<BooksReviewPage />} />
				<Route path="/board/categoryBooks/:id/postreview/:postId" element={<BooksPostData />} />
				<Route path="/board/categoryBooks/:id/changereview/:postId" element={<BooksChangeData />} />
				<Route path="/board/categoryBooks/:id/write" element={<WritePage />} />
				<Route path="*" />
			</Routes>
		</div>
	);
}

export default App;
