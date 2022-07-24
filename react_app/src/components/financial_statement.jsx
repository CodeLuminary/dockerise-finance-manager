import inc_exp_style from "../css/inc_exp.module.css";
import {getFinancialStatement} from "../helperFunctions/Api_communication.js";
import {useState} from "react";

const FinancialStatement = ()=>{
    const [financialStatement, setFinancialStatement] = useState({})
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const HandleSumbit=(event)=>{
        event.preventDefault();
        getFinancialStatement({
            from, to
        })
        .then(result=>{
            console.log(result, 'result')
        })
        .catch(error=>console.log(error));
        //console.log(fs['from'])
    }

    return (
        <>
            <form id="fs" onSubmit={HandleSumbit}>
                <span className={inc_exp_style.label}>From</span>
                <input type="date" onChange={e=>setFrom(e.target.value)} className="input" /><br/>
                <span className={inc_exp_style.label}>To</span>
                <input type="date" onChange={e=>setTo(e.target.value)} className="input" /><br/>
                <input type="submit" className="btn" value="Get Financial Statement"/>
            </form>
            <>
                {financialStatement.income ?
                (
                    <>
                    </>
                ):``          
                }
            </>
        </>
    )
}

export default FinancialStatement;