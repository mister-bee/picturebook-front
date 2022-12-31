import useFirebase from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

// const useGoogleSignUp = () => {
//   const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

//   const [user, loading, error] = useFirebase(
//     firebase.auth(),
//     auth => auth.createUserWithPopup(googleAuthProvider)
//   );

//   return { user, loading, error };
// }

// export default useGoogleSignUp;
