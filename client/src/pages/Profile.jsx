
import { useSelector } from "react-redux"
import { useRef } from "react";
import { useState, useEffect } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { updateUserStart, updateUserFailure, updateUserSuccess } from "../redux/user/userSlice";

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();

  // console.log(formData);

  useEffect( () => {
    if(image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    // console.log(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload ' + progress + '% done');
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, profilePicture: downloadURL });
          });
        }
    );
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    

    try{
      e.preventDefault();
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      console.log(data);
      
      if(data.success === false){
        dispatch(updateUserFailure(data));
        return;
      }
      
      dispatch(updateUserSuccess(data));
      setUpdate(true);

    }
    catch(err){
      dispatch(updateUserFailure(data));
    }

  };

  // console.log(formData);

  return (
    <div className= 'p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center '> Profile </h1>
      <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => {setImage(e.target.files[0]);} }/>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <img 
          src={ formData.profilePicture || currentUser.profilePicture} 
          alt='profile' 
          className = 'h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-3'
          onClick={ () => fileRef.current.click()}
        />

        <p className="text-center">
          {imageError ? (<span className="text-red-700"> Error uploading image </span>) 
            : (imagePercent > 0 && imagePercent < 100) ? (<span className="text-black"> 'Uploading {imagePercent} %'</span>) 
            : (imagePercent == 100) ? (<span className="text-green-700 font-bold"> Image uploaded sucessfully </span>)
            : '' 
          }
        </p>

        <input defaultValue={currentUser.username} type='text' id = 'username' placeholder="Username" className="bg-slate-100 rounded-lg p-3"  onChange={handleChange} />
        <input defaultValue={currentUser.email} type='email' id = 'email' placeholder ='Email' className="bg-slate-100 rounded-lg p-3" onChange={handleChange}/>
        <input type='password' id = 'password' placeholder ='Password' className="bg-slate-100 rounded-lg p-3" onChange={handleChange}/>
        <button className='bg-slate-700 text-white font-semibold p-3 uppercase rounded-lg hover:opacity-95 disabled: opacity-60' > Update </button>
      </form>
      <div className="flex mt-6 justify-between">
        <span className="text-red-700 cursor-pointer"> Delete Account </span>
        <span className="text-red-700 cursor-pointer"> Sign Out </span>
      </div>

      <p className="text-blue-700 mt-5" > {update && 'User is updated successfully!'}</p>
    </div> 
  )
}
