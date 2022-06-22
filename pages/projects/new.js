import React from "react";
import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const CreateProject = () => {
  const [user] = useAuthState(auth);
  const [title, setTitle] = React.useState("");
  const handleSubmit = () => {};
  return (
    <form>
      <div>new</div>
    </form>
  );
};

export default CreateProject;
