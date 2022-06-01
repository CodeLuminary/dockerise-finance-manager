import navbar_style from "../css/navbar.module.css";
import {Link} from "react-router-dom";

const Navbar = ()=>{
    return (
        <div className={navbar_style.nav}>
            <ul>
                <li className={navbar_style.highlight}><Link to="/">Income/Expenses</Link></li>
                <li><Link to="/">Assets/Liabilities</Link></li>
                <li><Link to="/">Financial Statement</Link></li>
            </ul>
        </div>
    )
}

export default Navbar