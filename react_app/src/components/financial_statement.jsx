import inc_exp_style from "../css/inc_exp.module.css";

const FinancialStatement = ()=>{
    return (
        <div>
            <span className={inc_exp_style.label}>From</span>
            <input type="date" className="input" /><br/>
            <span className={inc_exp_style.label}>To</span>
            <input type="date" className="input" /><br/>
            <button className="btn">Get Financial Statement</button>
        </div>
    )
}

export default FinancialStatement;