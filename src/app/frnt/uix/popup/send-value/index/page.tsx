'use client'

import '@/css/styles.css'
import { useState, useEffect } from 'react';

const openPopup = () => {
	window.open('/frnt/uix/popup/send-value/popup','popup','width=300, height=200, top=50, left=50, scrollbars=yes');
}

export default function Index() {

    const [form , setForm] = useState({ name:'', title:'', option:'option1', checkbox:false, content:'' });

    const change = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
        //setForm({...form, [e.target.name]: e.target.value, }) 로 할 경우 checkbox가 작동되지 않음.
        //setForm({...form, [e.target.name]: e.target.checked}); 로 따로 빼줘야 하는데 (.value가 아닌 .checked로 해야함 위 처럼 코드 작성하면 따로 만들필요가 없음)
    }

	useEffect(() => {
		const getData = (e: any) => { setForm(e.data.data); };
		
		window.addEventListener('message', getData);
		
		// 컴포넌트 언마운트 시 제거 (메모리 누수 방지)
		return () => { window.removeEventListener('message', getData); };
	}, []);

	return (
		<>
			이름 : <input type="text" name="name"  value={form.name} onChange={change} /><br/>
			제목 : <input type="text" name="title" value={form.title} onChange={change} /><br/>
			옵션 : <select name="option" value={form.option} onChange={change}>
				<option value="option1">option1</option>
				<option value="option2">option2</option>
				<option value="option3">option3</option>
			</select><br/>
			체크 : <input type="checkbox" name="checkbox" checked={form.checkbox} onChange={change} /><br/>
			내용 : <textarea name="content" value={form.content} onChange={change} /><br/>
			<button onClick={openPopup}>팝업창 띄우기</button>
		</>
	);
}

// 팝업창의 값을 부모창으로 전달하는 코드
// 주의. 현대적인 프론트엔드 개발에서는 팝업창을 사용하지 않음. 모달창을 사용하면 사용했지.