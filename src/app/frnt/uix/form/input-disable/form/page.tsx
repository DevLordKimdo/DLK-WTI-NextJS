'use client'

import '@/css/styles.css'
import { useState } from 'react';
const API_SERVER: string = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`;

export default function Form() {

    const [textNormal,   setTextNormal]   = useState('Normal');
    const [textReadonly, setTextReadonly] = useState('Readonly');
    const [textDisabled, setTextDisabled] = useState('Disabled');
    const [textRequired, setTextRequired] = useState('');
    const [textHidden,   setTextHidden]   = useState('Hidden');

    const [checkboxNormal1, setCheckboxNormal1] = useState(false);
    const [checkboxNormal2, setCheckboxNormal2] = useState(false);
    const [checkboxNormal3, setCheckboxNormal3] = useState(false);
    const [checkboxReadonlyTrue,  setCheckboxReadonlyTrue]  = useState(true);
    const [checkboxReadonlyFalse, setCheckboxReadonlyFalse] = useState(false);
    const [checkboxDisabledTrue,  setCheckboxDisabledTrue]  = useState(true);
    const [checkboxDisabledFalse, setCheckboxDisabledFalse] = useState(false);

    const [selectNormal,   setSelectNormal]   = useState('A');
    const [selectReadonly, setSelectReadonly] = useState('A');
    const [selectDisabled, setSelectDisabled] = useState('A');

    const [radioNormal,   setRadioNormal]   = useState('A');
    const [radioReadonly, setRadioReadonly] = useState('A');
    const [radioDisabled, setRadioDisabled] = useState('A');

    const [textareaNormal,   setTextareaNormal]   = useState('Normal');
    const [textareaReadonly, setTextareaReadonly] = useState('Readonly');  
    const [textareaDisabled, setTextareaDisabled] = useState('Disabled');  

    const Submit = async (e: any) => {
        e.preventDefault();
        
        const data = new FormData(e.target);
        
        if(!data.has('checkboxNormal3')) { data.set('checkboxNormal3','false') }

        await fetch(`${API_SERVER}/rest/uix/form/input-disable/submit`, {
            method: 'POST',
            body: data
        });
    };

    return (
        <form onSubmit={Submit}>
            <h2>Input Text</h2>
            <input type="text"   name="textNormal"   value={textNormal}   onChange={(e: any)=>setTextNormal(e.target.value)} /><br/>
            <input type="text"   name="textReadonly" value={textReadonly} onChange={()=>{}} /><br />
            <input type="text"   name="textDisabled" value={textDisabled} onChange={()=>{}} disabled /><br />
            <input type="text"   name="textRequired" value={textRequired} onChange={(e: any)=>setTextRequired(e.target.value)} placeholder="Required" required /><br/>
            <input type="hidden" name="textHidden"   value={textHidden}/><br/>

            <h2>CheckBox</h2>
		    <div>Normal 1 : <input type="checkbox" name="checkboxNormal1" checked={checkboxNormal1} onChange={(e:any)=>setCheckboxNormal1(e.target.checked)} /></div>
		    <div>Normal 2 : <input type="checkbox" name="checkboxNormal2" checked={checkboxNormal2} onChange={(e:any)=>setCheckboxNormal2(e.target.checked)} value="true" /></div>
		    <div>Normal 3 : <input type="checkbox" name="checkboxNormal3" checked={checkboxNormal3} onChange={(e:any)=>setCheckboxNormal3(e.target.checked)} value="true" /></div>
            <div>Readonly True  : <input type="checkbox" name="checkboxReadonlyTrue"  value="true" checked={checkboxReadonlyTrue}  onChange={() => {}} /></div>
            <div>Readonly False : <input type="checkbox" name="checkboxReadonlyFalse" value="true" checked={checkboxReadonlyFalse} onChange={() => {}} /></div>
            <div>Readonly(Style) True  : <input type="checkbox" name="" value="true" checked={true}  onChange={() => {}} style={{opacity: "0.5", cursor: "not-allowed accent-color: gray"}} /></div>
            <div>Readonly(Style) False : <input type="checkbox" name="" value="true" checked={false} onChange={() => {}} style={{opacity: "0.5", cursor: "not-allowed accent-color: gray"}} /></div>
            <div>Disabled True  : <input type="checkbox" name="checkboxDisabledTrue"  value="true" checked={checkboxDisabledTrue}  disabled /></div>
            <div>Disabled False : <input type="checkbox" name="checkboxDisabledFalse" value="true" checked={checkboxDisabledFalse} disabled /></div>

            <h2>Select</h2>
            <div>Normal : 
                <select name="selectNormal" value={selectNormal} onChange={(e:any)=>setSelectNormal(e.target.checked)}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>
            <div>Readonly : 
                <select name="selectReadonly" value={selectReadonly} onChange={() => {}}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>
            <div>Readonly(Style) : 
                <select name="" value={selectReadonly} onChange={() => {}} style={{opacity: "0.5"}}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>
            <div>Disabled : 
                <select name="selectDisabled" value={selectDisabled} disabled>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>

            <h2>Radio</h2>
            <div>Normal
                <input type="radio" name="radioNormal" value="A" checked={radioNormal == 'A'} onChange={(e:any) => setRadioNormal(e.target.value)} />
                <input type="radio" name="radioNormal" value="B" checked={radioNormal == 'B'} onChange={(e:any) => setRadioNormal(e.target.value)} />
                <input type="radio" name="radioNormal" value="C" checked={radioNormal == 'C'} onChange={(e:any) => setRadioNormal(e.target.value)} />
            </div>
            <div>Readonly
                <input type="radio" name="radioReadonly" value="A" checked={radioReadonly == 'A'} onChange={() => {}} />
                <input type="radio" name="radioReadonly" value="B" checked={radioReadonly == 'B'} onChange={() => {}} />
                <input type="radio" name="radioReadonly" value="C" checked={radioReadonly == 'C'} onChange={() => {}} />
            </div>
            <div>Readonly(style)
                <input type="radio" name="radioReadonly" value="A" checked={radioReadonly == 'A'} onChange={() => {}} style={{ opacity: "0.5", cursor: "not-allowed accent-color: gray" }}/>
                <input type="radio" name="radioReadonly" value="B" checked={radioReadonly == 'B'} onChange={() => {}} style={{ opacity: "0.5", cursor: "not-allowed accent-color: gray" }}/>
                <input type="radio" name="radioReadonly" value="C" checked={radioReadonly == 'C'} onChange={() => {}} style={{ opacity: "0.5", cursor: "not-allowed accent-color: gray" }}/>
            </div>
            <div>Disabled
                <input type="radio" name="radioDisabled" value="A" checked={radioDisabled == 'A'} disabled />
                <input type="radio" name="radioDisabled" value="B" checked={radioDisabled == 'B'} disabled />
                <input type="radio" name="radioDisabled" value="C" checked={radioDisabled == 'C'} disabled />
            </div>

            <h2>TextArea</h2>
            <textarea name="textareaNormal"   value={textareaNormal}   onChange={(e:any)=>{setTextareaNormal(e.target.value)}} /><br/>
            <textarea name="textareaReadonly" value={textareaReadonly} onChange={()=>{}} readOnly /><br/>
            <textarea name="textareaDisabled" value={textareaDisabled} onChange={()=>{}} disabled /><br/>

            <h2>전송</h2>
            <input type="submit" value="전송"/>
        </form>
    );
}

// hooks를 이용하여 input 값들을 form 전달하는 작업.
// hooks를 이용하지 않고 단순 전달하는 코드는 page(noneUseHook).tsx 참조