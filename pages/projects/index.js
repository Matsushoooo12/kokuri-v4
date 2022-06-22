import React from "react";
import Link from "next/link";
import { AuthContext } from "../_app";

const Projects = () => {
  const { currentUser } = React.useContext(AuthContext);
  return (
    <>
      {currentUser ? (
        <h1>Projects</h1>
      ) : (
        <>
          <h1>Projects</h1>
          <Link href="/login">
            <a>ログインへ</a>
          </Link>
        </>
      )}
    </>
  );
};

export default Projects;
