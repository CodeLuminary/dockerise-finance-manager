import inc_exp_style from "../css/inc_exp.module.css";

const IncomeExpense = ()=>{
    return (
        <div>
            <h2>INCOME/EXPENSE</h2>
            <span className={inc_exp_style.label}>Expenditure Type</span>
            <select className="input">
                <option>Expense</option>
                <option>Income</option>
            </select><br/>
            <span className={inc_exp_style.label}>Expenditure title/name</span>
            <input type="text" className="input" placeholder="Enter expenditure name"/><br/>
            <span className={inc_exp_style.label}>Expenditure description</span>
            <textarea className="textarea"></textarea><br/>
            <span className={inc_exp_style.label}>Amount</span>
            <input type="text" className="input" placeholder="Enter amount"/><br/>
            <span className={inc_exp_style.label}>Date/Time</span>
            <input type="datetime-local" className="input" />
            <span>Is Expenditure Recurrent</span><input type="checkbox"/><br/>
            <div>
                <span className={inc_exp_style.label}>How Often(in month)</span>
                <input type="number" className="input"/>
            </div>
            <button className="btn">Save</button>
        </div>
    )
}

export default IncomeExpense;