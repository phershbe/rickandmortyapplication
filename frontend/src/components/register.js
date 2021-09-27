import React from 'react'

const Register = () => {
    return (
        <>
        <h1 className="text-center mt-5 pt-4">Register</h1>
        <form className="text-center">
            <input placeholder="username" />
            <input placeholder="password" />
            <button>Submit</button>
        </form>
        </>
    )
}

export default Register;