import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Hompage</h1>
            <Link to="/dashboard">Go to Dashboad</Link>
        </div>
    )
}

export default Home
Home