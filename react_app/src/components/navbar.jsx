import navbar_style from "../css/navbar.module.css";
import {Link} from "react-router-dom";
import {useState} from "react"

const Navbar = ()=>{
    const [selected, setSelected] = useState(1);
    return (
        <div className={navbar_style.nav}>
            <ul>
                <li onClick={()=>setSelected(1)} className={selected==1? navbar_style.highlight: ``}><Link to="/">Income/Expenses</Link></li>
                <li onClick={()=>setSelected(2)} className={selected==2? navbar_style.highlight: ``}><Link to="asset-liability">Assets/Liabilities</Link></li>
                <li onClick={()=>setSelected(3)} className={selected==3? navbar_style.highlight: ``}><Link to="/financial-statement">Financial Statement</Link></li>
            </ul>
        </div>
    )
}

export default Navbar