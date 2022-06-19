import { signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth, googleProvider } from "../../firebase/config";

const Login = () => {
  const router = useRouter();
  const login = async () => {
    await signInWithPopup(auth, googleProvider).then(() => {
      router.push("/");
    });
  };
  return (
    <>
      <h1>Login</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
      <button onClick={login}>Sign In With Google</button>
    </>
  );
};

export default Login;
