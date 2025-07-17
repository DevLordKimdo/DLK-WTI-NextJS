'use client'

import { useState } from 'react';

export default function Popup() {

    const [form , setForm] = useState({ name:'', title:'', option:'option1', checkbox:false, content:'' });

    const change = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
        //setForm({...form, [e.target.name]: e.target.value, }) 로 할 경우 checkbox가 작동되지 않음.
        //setForm({...form, [e.target.name]: e.target.checked}); 로 따로 빼줘야 하는데 (.value가 아닌 .checked로 해야함 위 처럼 코드 작성하면 따로 만들필요가 없음)
    }

    const Send = () => {

        window.opener.postMessage({ type:'popup', data: form }, '*');

        /* 직접 부모창의 id 값을 추적해 지정한 값을 넣어주는 '레거시' 방식. 
        window.opener.document.getElementById("name").value = form.name;
        window.opener.document.getElementById("title").value = form.title;
        window.opener.document.getElementById("content").value = form.content;

        if(form.option == "option1"){
        	window.opener.document.getElementById("option").options[0].selected = true;
        } else if (form.option == "option2") {
        	window.opener.document.getElementById("option").options[1].selected = true;
        } else {
        	window.opener.document.getElementById("option").options[2].selected = true;
        }

        if(form.checkbox == true){
        	window.opener.document.getElementById("checkbox").checked = true;
        } else {
        	window.opener.document.getElementById("checkbox").checked = false;
        }
        */

        window.close();
    }

    return (
        <>
            <form name="form">
                이름 : <input type="text" name="name"  value={form.name} onChange={change} /><br/>
                제목 : <input type="text" name="title" value={form.title} onChange={change} /><br/>
                옵션 : <select name="option" value={form.option} onChange={change}>
                    <option value="option1">option1</option>
                    <option value="option2">option2</option>
                    <option value="option3">option3</option>
                </select><br/>
                체크 : <input type="checkbox" name="checkbox" checked={form.checkbox} onChange={change} /><br/>
                내용 : <textarea name="content" value={form.content} onChange={change} /><br/>
            </form>
            <button onClick={Send}>전달하기</button>
        </>
    );
}
