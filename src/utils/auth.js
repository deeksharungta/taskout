import { redirect, useNavigate } from "react-router-dom";

export function checkAuthLoader(auth) {
  auth.onAuthStateChanged((user) => {
    console.log(user);
    if (!user) {
      return redirect("/auth/login");
    }
  });
}
