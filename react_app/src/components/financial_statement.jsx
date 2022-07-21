import inc_exp_style from "../css/inc_exp.module.css";
import {getFinancialStatement} from "../helperFunctions/Api_communication.js";
import {useState} from "react";

const FinancialStatement = ()=>{
    const [financialStatement, setFinancialStatement] = useState({})

    const HandleSumbit=(event)=>{
        event.preventDefault();
        getFinancialStatement()
    }

    return (
        <>
            <form onSubmit={HandleSumbit}>
                <span className={inc_exp_style.label}>From</span>
                <input type="date" name="from" className="input" /><br/>
                <span className={inc_exp_style.label}>To</span>
                <input type="date" name="to" className="input" /><br/>
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