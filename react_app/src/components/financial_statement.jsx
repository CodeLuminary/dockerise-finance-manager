import inc_exp_style from "../css/inc_exp.module.css";
import {getFinancialStatement} from "../helperFunctions/Api_communication.js";
import {useState} from "react";

const FinancialStatement = ()=>{
    const [incomeExpense, setIncomeExpense] = useState({});
    const [assetLiabilty, setAssetLiability] = useState({});
    const [incomeYear, setIncomeYear] = useState({});
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const HandleSumbit=(event)=>{
        event.preventDefault();
        getFinancialStatement({
            from, to
        })
        .then(result=>{
            //Re arrange data for easy display
            /*
            Data(income, asset, liabilities, expenses) are arranged in this format:
             E.g for income
              income: {
                  'income_title': {
                      'income_year': income_amount
                  }
              }
              The others follows suit
             */
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

            //Asset Liabilities
            const asset = {}; const liabilities = {};

            result.asset_liabilities.forEach((value)=>{
                
                const year = new Date(value.transaction_date).getFullYear();
                incomeYear[year] = 1;
                if(value.type=='asset'){
                    if(!asset[value.title]) asset[value.title] = {}
                    asset[value.title][year] = value.amount;
                }
                else{
                    if(!liabilities[value.title]) liabilities[value.title] = {}
                    liabilities[value.title][year] = value.amount;
                }

                
            })
            asset['Total Assets'] = {}
            liabilities['Total Liabilities'] = {}
            liabilities['Retained Earning'] = {}
            liabilities["Shareholder's Equity"] = {}
                    
            for(let x in incomeYear){
                let assetTotal = 0; let liabilityTotal = 0;
                for(let y in asset){
                    if(asset[y][x])
                        assetTotal += asset[y][x];
                }
                for(let y in liabilities){
                    if(liabilities[y][x])
                        liabilityTotal += liabilities[y][x];
                }
                asset['Total Assets'][x] = assetTotal;
                liabilities['Total Liabilities'][x] = liabilityTotal;
                liabilities['Retained Earning'][x] = expenses['Net Profit'][x];
                liabilities["Shareholder's Equity"][x] = assetTotal + Number(expenses['Net Profit'][x]) - liabilityTotal;
            }
            console.log(income, 'income')
            setAssetLiability({
                ...asset,
                ...liabilities
            });
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

                {Object.keys(assetLiabilty).length > 0 ?
                (   <>
                    <h3>BALANCE SHEET</h3>
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
                                Object.keys(assetLiabilty).map((incExp, index)=>(
                                    <tr className={incExp=='Total Assets' || incExp=='Total Liabilities'? inc_exp_style.draw: ``} key={index}>
                                        <td>{incExp}</td>
                                        {
                                            Object.keys(incomeYear).map((year,index)=>(
                                                <td key={index}>{assetLiabilty[incExp][year]? assetLiabilty[incExp][year]: `-`}</td>
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