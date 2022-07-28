import inc_exp_style from "../css/inc_exp.module.css";
import {getFinancialStatement} from "../helperFunctions/Api_communication.js";
import {useState} from "react";

const FinancialStatement = ()=>{
    const [incomeExpense, setIncomeExpense] = useState({});
    const [assetLiabiltiy, setAssetLiability] = useState({});
    const [incomeYear, setIncomeYear] = useState({});
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const HandleSumbit=(event)=>{
        event.preventDefault();
        getFinancialStatement({
            from, to
        })
        .then(result=>{
            console.log(result, 'result');
            const income = {}; const expenses = {};
            const incomeYear = {}
            result.income_expenses.forEach((value)=>{
                
                const year = new Date(value.transaction_date).getFullYear();
                incomeYear[year] = 1;
                if(value.type=='income'){
                    if(!income[value.title]) income[value.title] = {}
                    income[value.title][year] = value.amount;
                }
                else{
                    if(!expenses[value.title]) expenses[value.title] = {}
                    expenses[value.title][year] = value.amount;
                }

                
            })

            income['Gross Profit'] = {}
            expenses['Total Expenses'] = {}
            expenses['Net Profit'] = {}
                    
            for(let x in incomeYear){
                let incomeTotal = 0; let expensesTotal = 0;
                for(let y in income){
                    if(income[y][x])
                        incomeTotal += income[y][x];
                }
                for(let y in expenses){
                    if(expenses[y][x])
                        expensesTotal += expenses[y][x];
                }
                income['Gross Profit'][x] = incomeTotal;
                expenses['Total Expenses'][x] = expensesTotal;
                expenses['Net Profit'][x] = incomeTotal - expensesTotal;
            }
            console.log(income, 'income')
            setIncomeExpense({
                ...income,
                ...expenses
            });
            setIncomeYear(incomeYear);

            
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
            
            
                {Object.keys(incomeExpense).length > 0 ?
                (   <>
                    <h3>INCOME STATEMENT</h3>
                    <table className={inc_exp_style.fs_tab}>
                        <thead>
                            <tr>
                                <th></th>
                                {
                                    Object.keys(incomeYear).map((year,index)=>(
                                        <th key={index}>{year}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>    
                            {
                                Object.keys(incomeExpense).map((incExp, index)=>(
                                    <tr className={incExp=='Gross Profit' || incExp=='Total Expenses'? inc_exp_style.draw: ``} key={index}>
                                        <td>{incExp}</td>
                                        {
                                            Object.keys(incomeYear).map((year,index)=>(
                                                <td key={index}>{incomeExpense[incExp][year]? incomeExpense[incExp][year]: `-`}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }    
                        </tbody>
                    </table>
                    </>
                ):``          
                }
            </form>
        </>
    )
}

export default FinancialStatement;