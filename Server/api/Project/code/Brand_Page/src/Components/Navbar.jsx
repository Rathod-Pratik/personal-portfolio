import react from 'react'

const navbar=()=>{
    return(
        <div className='container'>
            <div className="logo"><img src="/Image/brand_logo.png" alt="brand logo" /></div>
            <div className="nav">
                <ul>
                    <li>MENU</li>
                    <li>LOCATION</li>
                    <li>ABOUT</li>
                    <li>CONTECT</li>
                </ul>
            </div>
            <div className="btn">
                <button>Login</button>
            </div>
        </div>
    )
}
export default navbar