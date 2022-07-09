import { useState } from "react";
import inc_exp_style from "../css/inc_exp.module.css";
import {AddAssetsLiability} from "../helperFunctions/Api_communication.js";

const AssetLiability = ()=>{
    const [typeRate, setTypeRate] = useState('Appreciation');
    const [incomeType, setIncomeType] = useState("asset");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [duration, setDuration] = useState(0);
    const [rate, setRate] = useState(0.0);

    const HandleSubmit = (e)=>{
        e.preventDefault();
        AddAssetsLiability({
            type: incomeType,
            title,
            description,
            amount,
            change_duration: duration,
            change_rate: rate
        })
    }

    return (
        <form onsubmit={HandleSubmit}>
            <h2>INCOME/EXPENSE</h2>
            <span className={inc_exp_style.label}>Type</span>
            <select className="input">
                <option value="asset">Asset</option>
                <option value="asset">Liability</option>
            </select><br/>
            <span className={inc_exp_style.label}>Title/Name</span>
            <input type="text" oninput={e=>setTitle(e.target.value)} className="input" placeholder="Enter expenditure name"/><br/>
            <span className={inc_exp_style.label}>Description</span>
            <textarea className="textarea" oninput={e=>setDescription(e.target.value)}></textarea><br/>
            <span className={inc_exp_style.label}>Amount</span>
            <input type="text" oninput={e=>setAmount(Number(e.target.value))} className="input" placeholder="Enter amount"/><br/>
            <span className={inc_exp_style.label}>Date/Time</span>
            <input type="datetime-local" className="input" />
            <span className={inc_exp_style.label}>{typeRate} Duration(in month)</span>
            <input type="number" oninput={e=>setDuration(Number(e.target.value))} value="1" className="input"/><br/>
            <span className={inc_exp_style.label}>{typeRate} Rate</span>
            <input type="text" oninput={e=>setTitle(Number(e.target.value))} placeholder={`Enter rate of ${typeRate} e.g 5 for 5 USD/ month`} className="input"/><br/>
            
            <input className="btn" value="Save"/>
        </div>
    )
}

export default AssetLiability;