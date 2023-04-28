import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebase.config";
import { setUser, toggleLoading } from "./features/auth/authSlice";
import { Toaster } from "react-hot-toast";

function App() {

  const { isLoading } = useSelector(state => state.auth);

  console.log(isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) { 
        dispatch(setUser(user.email));
      } else {
        // when not sign in
        // then set isLoading false
        // because initially isLoading is true
        dispatch(toggleLoading())
      }
    })
  }, [])
  return (

    <>
      <Toaster />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
