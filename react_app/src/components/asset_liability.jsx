import { useState } from "react";
import inc_exp_style from "../css/inc_exp.module.css";

const AssetLiability = ()=>{
    const [typeRate, setTypeRate] = useState('Appreciation');
    return (
        <div>
            <h2>INCOME/EXPENSE</h2>
            <span className={inc_exp_style.label}>Type</span>
            <select className="input">
                <option>Asset</option>
                <option>Liability</option>
            </select><br/>
            <span className={inc_exp_style.label}>Title/Name</span>
            <input type="text" className="input" placeholder="Enter expenditure name"/><br/>
            <span className={inc_exp_style.label}>Description</span>
            <textarea className="textarea"></textarea><br/>
            <span className={inc_exp_style.label}>Amount</span>
            <input type="text" className="input" placeholder="Enter amount"/><br/>
            <span className={inc_exp_style.label}>Date/Time</span>
            <input type="datetime-local" className="input" />
            <span className={inc_exp_style.label}>{typeRate} Duration(in month)</span>
            <input type="number" value="1" className="input"/><br/>
            <span className={inc_exp_style.label}>{typeRate} Rate</span>
            <input type="text" placeholder={`Enter rate of ${typeRate} e.g 5 for 5 USD/ month`} className="input"/><br/>
            
            <button className="btn">Save</button>
        </div>
    )
}

export default AssetLiability;