import Navbar from "../components/navbar";
import {Routes, Route} from "react-router-dom";
import IncomeExpense from "../components/income_expense";
import AssetLiability from "../components/asset_liability";
import Settings from "../components/settings";

const Home = ()=>{
    return (
        <>
            <Navbar />
            <div className="content">
                <Routes>
                    <Route index element={<IncomeExpense />}/>
                    <Route path="/asset-liability" element={<AssetLiability/>}/>
                    <Route path="/settings" element={<Settings />}/>
                </Routes>
            </div>
        </>
    )
}

export default Home;