const { default: Link } = require("next/link");

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
    </>
  );
};

export default Login;
