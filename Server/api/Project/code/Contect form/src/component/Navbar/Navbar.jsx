import style from './Navbar.module.css'

const navbar = () => {
  console.log(style)
  return (
    <div className={style.container}>
      <div className="logo">
        <img src="\Image\Frame 2 1.png" alt="" />
      </div>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contect</li>
      </ul>
    </div>
  )
}

export default navbar
