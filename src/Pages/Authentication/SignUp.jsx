import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Auth } from 'aws-amplify';

function SignUp() {
    let navigate=useNavigate();
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const [confirmPassword, setConfirmPassword]=useState(null);
    const [emailError, setEmailError]=useState("");
    const [passwordError, setPasswordError]=useState("Enter a combination of 6 or more letters and numbers");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");

    const userCredentialVerification = event => {
        if(password==confirmPassword && email!=null&&password!=null && confirmPassword!=null){
            console.log(email);
            console.log(password);
            userSignUp();
        }
        else{
            console.log(email);
            console.log("The Passwords do not match!");
            setPasswordError("The Passwords do not Match");
        }
        event.preventDefault();   //Prevents page refresh on Submit
    }

    async function userSignUp() {
        try {
            const { user } = await Auth.signUp({
                username:email,
                password:password,
                attributes: {
                    email:email,
                    name:firstName,
                    middle_name:middleName,
                    family_name:lastName
                },
                autoSignIn: {
                    enabled: true,
                }
            });
            console.log(user);
            navigate('/confirmSignUp',{state:{username:email}});
        } catch (error) {
            console.log('error signing up:', error);
        }
    }
    return (
        <>
            <div className="text-center mt-24">
                <div className="flex items-center justify-center">
                    <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                </div>
                <h2 className="text-4xl tracking-tight">
                    Sign Up for a new Account
                </h2>
                <span className="text-sm">or <a href="#" className="text-blue-500" onClick={()=>navigate('/signin')}> 
                    Log into an existing Account
                </a>
            </span>
            </div>
            <div className="flex justify-center my-2 mx-4 md:mx-0">
            <form className="w-full max-w-xl bg-white rounded-lg shadow-md p-6" onSubmit={userCredentialVerification}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email address</label>
                        <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='email' 
                        onChange={(e)=>{
                            if(!e.target.value.includes("@")||!e.target.value.includes(".")){
                                setEmailError("Email is in Incorrect Format");
                                setEmail(null);
                            }
                            else{
                                setEmailError("");
                                setEmail(e.target.value);
                            }
                            }} required/>
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Password</label>
                        <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='password' 
                        onChange={(e)=>{
                            
                            if(e.target.value.length>6){
                                if(e.target.value.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i
                                )){
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }
                                else{
                                    setPasswordError("Password should be alphanumerical");
                                }
                                
                            }
                            else{
                                setPasswordError("Password is too weak.")
                            }
                            }} required/>
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Confirm Password</label>
                        <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='password' 
                        onChange={(e)=>{
                            if(password==e.target.value){
                                setConfirmPassword(e.target.value)
                                setPasswordError("");
                            }
                            else{
                                setPasswordError("The passwords do not match")
                            }
                            }} required/>
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">First Name</label>
                        <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='text' 
                        onChange={(e)=>{
                            setFirstName(e.target.value);
                            }} required/>
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Middle Name</label>
                        <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='text' 
                        onChange={(e)=>{
                            setMiddleName(e.target.value);
                            }} required/>
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Last Name</label>
                        <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='text' 
                        onChange={(e)=>{
                            setLastName(e.target.value);
                            }} required/>
                    </div>
                    <div className="w-full text-left">
                        <a href="#" className="text-md pl-4 tracking-tight">{emailError}</a>
                    </div>
                    <div className="w-full text-left">
                        <a href="#" className="text-md pl-4 tracking-tight">{passwordError}</a>
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                        <button className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500" type='submit'>Sign in</button>
                    </div>
                </div>
            </form>
            </div>
        </>
    );
}


export default SignUp