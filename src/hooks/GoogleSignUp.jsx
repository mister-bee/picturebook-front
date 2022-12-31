// import firebase from 'firebase/app';
// import 'firebase/auth';
// import { useFirebase } from 'react-firebase-hooks/auth';

// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// function GoogleSignUp() {
//   const [user, loading, error] = useFirebase(
//     firebase.auth(),
//     auth => auth.signInWithPopup(googleAuthProvider)
//   );

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }
//   if (user) {
//     return <div>Welcome, {user.displayName}</div>;
//   }

//   return (
//     <button onClick={() => firebase.auth.signInWithPopup(googleAuthProvider)}>
//       Sign in with Google
//     </button>
//   );
// }
