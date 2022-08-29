import React from 'react'
import {Link}from 'react-router-dom'

function SignIn() {
  return (
    <>
      <div class="text-center mt-24">
            <div class="flex items-center justify-center">
              <svg fill="none" viewBox="0 0 24 24" class="w-12 h-12 text-blue-500" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h2 class="text-4xl tracking-tight">
              Sign In into your account
            </h2>
            <span class="text-sm">or <a href="#" class="text-blue-500"> 
              <Link to='/signUp'>Sign Up</Link>
            </a>
        </span>
      </div>
      <div class="flex justify-center my-2 mx-4 md:mx-0">
        <form class="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-full px-3 mb-6">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='Password'>Email address</label>
                  <input class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='email'  required/>
              </div>
              <div class="w-full md:w-full px-3 mb-6">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='Password'>Password</label>
                  <input class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='password' required/>
              </div>
              <div class="w-full flex items-center justify-between px-3 mb-3 ">
                  <label for="remember" class="flex items-center w-1/2">
                    <input type="checkbox" name="" id="" class="mr-1 bg-white shadow"/>
                    <span class="text-sm text-gray-700 pt-1">Remember Me</span>
                  </label>
                  <div class="w-1/2 text-right">
                    <a href="#" class="text-blue-500 text-sm tracking-tight">Forget your password?</a>
                  </div>
              </div>
              <div class="w-full md:w-full px-3 mb-6">
                  <button class="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">Sign In</button>
              </div>
            </div>
        </form>
      </div>
    </>
  )
}

export default SignIn