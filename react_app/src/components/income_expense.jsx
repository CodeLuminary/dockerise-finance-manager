import { useState } from "react";
import inc_exp_style from "../css/inc_exp.module.css";
import {AddIncomeExpense} from "../helperFunctions/Api_communication.js";

const IncomeExpense = ()=>{
    const [expenditureType, setExpenditureType] = useState("expense");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [recurrency, setRecurrency] = useState(0);
    const [datetime, setDateTime] = useState('');
    const [isRecurrent, setIsRecurrent] = useState(false);

    const HandleSubmit = (e)=>{
        e.preventDefault();
        AddIncomeExpense({
            type: expenditureType,
            title,
            description,
            amount,
            is_recurrency: isRecurrent,
            recurrency,
            transaction_date: datetime
        })
    }

    return (
        <form onSubmit={HandleSubmit}>
            <h2>INCOME/EXPENSE</h2>
            <span className={inc_exp_style.label}>Expenditure Type</span>
            <select className="input" onChange={e=>setExpenditureType(e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select><br/>
            <span className={inc_exp_style.label}>Expenditure title/name</span>
            <input onChange={e=>setTitle(e.target.value)} type="text" className="input" placeholder="Enter expenditure name"/><br/>
            <span className={inc_exp_style.label}>Expenditure description</span>
            <textarea onChange={e=>setDescription(e.target.value)} className="textarea"></textarea><br/>
            <span className={inc_exp_style.label}>Amount</span>
            <input onChange={e=>setAmount(Number(e.target.value))} type="text" className="input" placeholder="Enter amount"/><br/>
            <span className={inc_exp_style.label}>Date/Time</span>
            <input on type="datetime-local" onChange={e=>setDateTime(e.target.value)} className="input" />
            <span>Is Expenditure Recurrent</span>
            <input type="checkbox" onChange={e=>setIsRecurrent(e.target.checked)}/><br/>
            <div>
                <span className={inc_exp_style.label}>How Often(in month)</span>
                <input type="number" onChange={e=>setRecurrency(Number(e.target.value))} className="input"/>
            </div>
            <input type="submit" className="btn" value="Save"/>
        </form>
    )
}

export default IncomeExpense;