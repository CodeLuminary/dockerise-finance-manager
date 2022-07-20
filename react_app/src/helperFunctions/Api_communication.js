import Api from "./Api";

export const AddIncomeExpense = (dataObject)=>{
  Api.PostApi('/add-income-expense',dataObject)
  .then(result=>{
    if(result.isSuccessful) alert("Income/Expense added successfully")
    else alert("Action failed. Income/Expense could not be added")
  })
}

export const changeSetting = (dataObject)=>{
    Api.PostApi('/change-settings',dataObject)
  .then(result=>{
      if(result.isSuccessful) alert("Settings change successfully")
      else alert("Action failed. Settings could not be changed")
  })
}

export const AddAssetsLiability = (dataObject)=>{
    Api.PostApi('/add-asset-liability',dataObject)
    .then(result=>{
        if(result.isSuccessful) alert("Asset/Liability added successfully")
      else alert("Action failed. Asset/Liability could not be added")
    })
}

export const getFinancialStatement = (dataObject)=>{
  return new Promise((resolve, reject)=>{
    Api.PostApi('/get-financial-statement',dataObject)
    .then(result=>resolve(result))
    .catch(error=>reject(error))
  })
}