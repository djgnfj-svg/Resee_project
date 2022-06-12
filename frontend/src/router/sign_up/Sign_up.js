import "./Sign_up.css";

function Sign_up() {
	return (
		<main>
			<form id="login_form" class="form_class" action="login/login-access.php" method="post">
				<div class="form_div">
					<label>Sign Up:</label>
					<input class="field_class" name="login_txt" type="text" placeholder="Insira o seu login" autofocus />
					<label>Password:</label>
					<input id="pass" class="field_class" name="password_txt" type="password" placeholder="Insira a sua senha" />
					<button class="submit_class" type="submit" form="login_form" onclick="return validarLogin()">Entrar</button>
				</div>
				<div class="info_div">
					<p>Ainda não é um usuário registrado? <a href="register/reg-form.php">Cadastre-se!</a></p>
				</div>
			</form>
		</main>
	);
}

export default Sign_up;
