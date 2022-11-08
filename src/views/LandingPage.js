import React from "react";
import HomeLogged from "../components/Home/HomeLogged";
import HomeNotLogged from "../components/Home/HomeNotLogged";
import { useAuthContext } from "../contexts/AuthContext";


export default function LandingPage() {
  const { user } = useAuthContext();

  return (
    <div className="landingPageMain">
      {user ? (
        <HomeLogged />
      ) : (
        <HomeNotLogged/>
      )}
    </div>
  );
}
