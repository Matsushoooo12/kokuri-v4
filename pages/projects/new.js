import React from "react";
import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../_app";
import Link from "next/link";

const CreateProject = () => {
  const [user] = useAuthState(auth);
  const [title, setTitle] = React.useState("");
  const { currentUser } = React.useContext(AuthContext);
  return (
    <>
      {currentUser ? (
        <form>
          <div>new</div>
        </form>
      ) : (
        <>
          <h1>new</h1>
          <Link href="/login">
            <a>ログインへ</a>
          </Link>
        </>
      )}
    </>
  );
};

export default CreateProject;
