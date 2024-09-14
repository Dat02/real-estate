import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

export default function OAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick  = async (e) => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const info  = await signInWithPopup(auth, provider);
            // console.log(info);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: info.user.displayName,
                    email: info.user.email,
                    photo: info.user.photoURL
                })
            })
            
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');

        } catch (error) {
            console.log(error);
        }
    };

    return (
      <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-lg p-3 font-bold uppercase hover:opacity-95'>Continue with Google</button>
    );
}
