// useAuth.js

// import { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// export function useAuth() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });
//     return unsubscribe;
//   }, []);
  
//   return user;
// }