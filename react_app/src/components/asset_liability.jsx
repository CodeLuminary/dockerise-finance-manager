import { useState } from "react";
import inc_exp_style from "../css/inc_exp.module.css";
import {AddAssetsLiability} from "../helperFunctions/Api_communication.js";

const AssetLiability = ()=>{
    const [typeRate, setTypeRate] = useState('Appreciation');
    const [propType, setPropType] = useState("asset");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [datetime, setDateTime] = useState('');

    const HandleSubmit = (e)=>{
        e.preventDefault();
        AddAssetsLiability({
            type: propType,
            title,
            description,
            amount,
            transaction_date: datetime
        })
    }

    return (
        <form onSubmit={HandleSubmit}>
            <h2>INCOME/EXPENSE</h2>
            <span className={inc_exp_style.label}>Type</span>
            <select className="input">
                <option value="asset">Asset</option>
                <option value="liability">Liability</option>
            </select><br/>
            <span className={inc_exp_style.label}>Title/Name</span>
            <input type="text" onChange={e=>setTitle(e.target.value)} className="input" placeholder="Enter expenditure name"/><br/>
            <span className={inc_exp_style.label}>Description</span>
            <textarea className="textarea" onChange={e=>setDescription(e.target.value)}></textarea><br/>
            <span className={inc_exp_style.label}>Amount</span>
            <input type="text" onChange={e=>setAmount(Number(e.target.value))} className="input" placeholder="Enter amount"/><br/>
            <span className={inc_exp_style.label}>Date/Time</span>
            <input  type="date" onChange={e=>setDateTime(e.target.value)} className="input" />
           
            <input type="submit" className="btn" value="Save"/>
        </form>
    )
}

export default AssetLiability;