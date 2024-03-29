import './App.css';
import MyNavbar from './components/Nav';
import Home from './router/Main/Home'
import { Routes, Route} from 'react-router-dom';
import Board from './router/Board/Board';
import CategoryBooks from './router/Board/CategoryBooks/CategoryBooks';
import WritePage from './router/Board/CategoryBooks/WritePage/WritePage';
import BooksReviewPage from './router/Board/CategoryBooks/BooksReviewPage/BooksReviewPage';
import BooksPostData from './router/Board/CategoryBooks/BooksPostData/BooksPostData';
import BooksChangeData from './router/Board/CategoryBooks/BooksChangeData/BooksChangeData';
import Login from '../src/router/LoginPage/Login/Login'
import Sign_up from '../src/router/LoginPage/Sign_up/Sign_up'
import EmailCheck from './router/LoginPage/EmailCheck/EmailCheck';
import TooManyRequest from './components/TooManyRequest/TooManyRequest';
import NonePage from './components/NonePage';
import TestEmailChecked from './TestEmailChecked';

function App() {

	return (
		<div className="App">
			<MyNavbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/sign_up" element={<Sign_up />} />
				<Route path="/sign_up/emailcheck" element={<EmailCheck />} />
				<Route path="/board" element={<Board />} />
				<Route path="/board/categoryBooks/:id" element={<CategoryBooks />} />
				<Route path="/board/categoryBooks/:id/review" element={<BooksReviewPage />} />
				<Route path="/board/categoryBooks/:id/postreview/:postId" element={<BooksPostData />} />
				<Route path="/board/categoryBooks/:id/changereview/:postId" element={<BooksChangeData />} />
				<Route path="/board/categoryBooks/:id/write" element={<WritePage />} />
				<Route path="/board/toomanyrequest" element={<TooManyRequest />} />
				<Route path="/test" element={<TestEmailChecked />} />
				<Route path="*" element={<NonePage />} />
			</Routes>
		</div>
	);
}

export default App;
