// hooks를 사용하지 않는 방법으로 input form post전송 구현하는 방법.
// post 전송이 정상적으로 이루어 지는 것을 확인했으나 실무에서는 이런식으로 

'use client'

import '@/css/styles.css'
const BASE_URL: string = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export default function Form() {

    const Submit = async (e: any) => {
        e.preventDefault();
        
        const data = new FormData(e.target);

        await fetch(`${BASE_URL}/rest/uix/form/input-disable/submit`, {
            method: 'POST',
            body: data
        });
    };

    return (
        <form onSubmit={Submit}>
            <h2>Input Text</h2>

            <input type="text" name="textNormal"   defaultValue="Normal" /><br/>
            <input type="text" name="textReadonly" value="Readonly" readOnly /><br />
            <input type="text" name="textDisabled" value="Disabled" disabled /><br />
            {/* 입력값이 없으면 경고메세지가 뜨는 태그 옵션 */}
            <input type="text"   name="textRequired" defaultValue="" placeholder="Required" required /><br/>
            <input type="hidden" name="textHidden" value="Hidden"/><br/>

            <h2>CheckBox</h2>
		    <div>Normal 1 : <input type="checkbox" name="checkboxNormal1" /></div>
		    <div>Normal 2 : <input type="checkbox" name="checkboxNormal2" value="true" /></div>
            {/* 노드JS 경우 두개의 같은 name 값을 가진 input 태그 값을 받으면 두개 값을 하나의 배열로 전송함. */}
            {/* 자바 방식의 같은 name 값을 가진 태그를 전송하는 방법은 사실상 사용 불가능 */}
		    <div>Normal 3 : <input type="checkbox" name="checkboxNormal3" value="true" />
                <input type="hidden" name="checkboxNormal3" value="false" />
            </div>
            <div>Readonly True  : <input type="checkbox" name="checkboxReadonlyTrue"  value="true" checked={true}  onChange={() => {}} /></div>
            <div>Readonly False : <input type="checkbox" name="checkboxReadonlyFalse" value="true" checked={false} onChange={() => {}} /></div>
            <div>Readonly(Style) True  : <input type="checkbox" name="" value="true" checked={true}  onChange={() => {}} style={{opacity: "0.5", cursor: "not-allowed accent-color: gray"}} /></div>
            <div>Readonly(Style) False : <input type="checkbox" name="" value="true" checked={false} onChange={() => {}} style={{opacity: "0.5", cursor: "not-allowed accent-color: gray"}} /></div>
            <div>Disabled True  : <input type="checkbox" name="checkboxDisabledTrue"  value="true" checked={true}  disabled /></div>
            <div>Disabled False : <input type="checkbox" name="checkboxDisabledFalse" value="true" checked={false} disabled /></div>

            <h2>Select</h2>
            <div>Normal : 
                <select name="selectNormal" defaultValue="A">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>
            <div>Readonly : 
                <select name="selectReadonly" value="A" onChange={() => {}}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>
            <div>Readonly(Style) : 
                <select name="" value="A" onChange={() => {}} style={{opacity: "0.5"}}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>
            <div>Disabled : 
                <select name="selectDisabled" value="A" disabled>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>

            <h2>Radio</h2>
            <div>Normal
                <input type="radio" name="radioNormal" value="A" defaultChecked />
                <input type="radio" name="radioNormal" value="B" />
                <input type="radio" name="radioNormal" value="C" />
            </div>
            <div>Readonly
                <input type="radio" name="radioReadonly" value="A" checked={true}  onChange={() => {}} />
                <input type="radio" name="radioReadonly" value="B" checked={false} onChange={() => {}} />
                <input type="radio" name="radioReadonly" value="C" checked={false} onChange={() => {}} />
            </div>
            <div>Readonly(style)
                <input type="radio" name="radioReadonly" value="A" checked={true}  onChange={() => {}} style={{ opacity: "0.5", cursor: "not-allowed accent-color: gray" }}/>
                <input type="radio" name="radioReadonly" value="B" checked={false} onChange={() => {}} style={{ opacity: "0.5", cursor: "not-allowed accent-color: gray" }}/>
                <input type="radio" name="radioReadonly" value="C" checked={false} onChange={() => {}} style={{ opacity: "0.5", cursor: "not-allowed accent-color: gray" }}/>
            </div>
            <div>Disabled
                <input type="radio" name="radioDisabled" value="A" checked={true} disabled />
                <input type="radio" name="radioDisabled" value="B" disabled />
                <input type="radio" name="radioDisabled" value="C" disabled />
            </div>

            <h2>TextArea</h2>
            <textarea name="textareaNormal"   defaultValue="Normal" /><br/>
            <textarea name="textareaReadonly" defaultValue="Readonly" readOnly /><br/>
            <textarea name="textareaDisabled" defaultValue="Disabled" disabled /><br/>

            <h2>전송</h2>
            <input type="submit" value="전송"/>
        </form>
    );
}