import inc_exp_style from "../css/inc_exp.module.css";

const Settings = ()=>{
    return (
        <div>
            <h2>ACCOUNTING SETTINGS</h2>
            <span className={inc_exp_style.label}>Currency</span>
            <input type="text" className="input" placeholder="Enter currency"/><br/>
            <span className={inc_exp_style.label}>Company Name</span>
            <input className="input" placeholder="Enter company name"/>
            <button className="btn">Save Change(s)</button>
        </div>
    )
}

export default Settings;