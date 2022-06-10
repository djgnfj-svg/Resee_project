import './App.css';
import MyNavbar from './Nav';

function App() {
	return (
		<div className="App">
			<MyNavbar />
			<div class="hero-image">
				<div class="hero-text">
					<h1>I am John Doe</h1>
					<p>And I'm a Photographer</p>
					<button class='hero-button'>Hire me</button>
				</div>
			</div>
		</div>
	);
}

export default App;
