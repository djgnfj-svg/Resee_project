import './App.css';
import MyNavbar from './components/Nav';
import Login from './router/Login/Login'
import Sign_up from './router/Sign_up/Sign_up'
import Home from './router/Main/Home'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import useState from 'react'
import Board from './router/Board/Board';
import CategoryBooks from './router/Board/CategoryBooks/CategoryBooks';
import WritePage from './router/Board/CategoryBooks/WritePage/WritePage';
import BooksReviewPage from './router/Board/CategoryBooks/BooksReviewPage/BooksReviewPage';

function App() {
	let { index } = useParams();

	return (
		<div className="App">
				<MyNavbar />
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/login" element={<Login />}/>
					<Route path="/sign_up" element={<Sign_up />}/>
					<Route path="/board" element={<Board />}/>
					<Route path="/board/CategoryBooks/:index" element={<CategoryBooks />}/>
					<Route path="/board/CategoryBooks/:index/test" element={<WritePage />}/>
					<Route path="/board/CategoryBooks/:index/Review" element={<BooksReviewPage />}/>
					<Route path="*" element={<div>testa</div>}/>
				</Routes>
		</div>
	);
}

export default App;
