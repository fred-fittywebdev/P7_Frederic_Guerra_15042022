// styles
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Forgot from './components/Forgot/Forgot';
import Reset from './components/Reset/Reset';
import { CurrentUserContextProvider } from './Context/UseCurrentUser';
import { UserList } from './pages';
import Ajoutmembre from './pages/AjoutMembres/Ajoutmembre';
// import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PostList from './pages/PostList/PostList';
import Profil from './pages/Profil/Profil';
import Register from './pages/Register/Register';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/home">
						<Home />
					</Route>
					<Route exact path="/profil">
						<Profil />
					</Route>
					<Route exact path="/user-list">
						<UserList />
					</Route>
					<Route exact path="/ajout-membre">
						<Ajoutmembre />
					</Route>
					<Route exact path="/post-list">
						<PostList />
					</Route>
					<Route exact path="/">
						<Login />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route path="/forgot">
						<Forgot />
					</Route>
					<Route exact path="/reset/:forgot_token">
						<Reset />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
