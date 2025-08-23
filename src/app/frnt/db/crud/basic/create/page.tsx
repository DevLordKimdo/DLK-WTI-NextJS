'use client';

import '@/css/styles.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DbCrudType } from '@/types/db.crud.type';
const BASE_URL: string = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export default function Create() {
    const router = useRouter();

    const [form, setForm] = useState<DbCrudType>({ title: '', content: '', username: '' });

    const Change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const Submit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch(`${BASE_URL}/rest/db/crud/basic/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(form),
        });

        router.push('/frnt/db/crud/basic/list');
    };

    return (
        <form onSubmit={Submit}>
            이름 : <input    name="username"    value={form.username}    onChange={Change} placeholder="이름" /><br/>
            제목 : <input    name="title"   value={form.title}   onChange={Change} placeholder="제목" /><br/>
            내용 : <textarea name="content" value={form.content} onChange={Change} placeholder="내용" /><br/>
            <button type="submit">작성</button>
        </form>
    );

}

// 해설
// 이벤트 핸들러 함수 Change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {} 에 해설
// React.ChangeEvent<> : React에서 제공하는 타입지정. HTML onChange 이벤트가 발생했을 때 생성되는 이벤트 객체 타입을 정의한것. 여기에 <>를 붙이면 제네릭이 됨.
// HTMLInputElement : input 태그를 가리킴
// HTMLTextAreaElement : TextArea 태그를 가리킴
// 이밖에 (HTMLDivElement: Div 태그를 가리킴, HTMLButtonElement: Button태그를 가리킴, HTMLSelectElement: Select 태그를 가리킴) 등이 있음.
// 
// 이벤트 핸들러 함수 const Submit = async (e: React.FormEvent) => {} 해설
// React.FormEvent: 폼 제출(Submit) 이벤트에 사용되는 타입.
// 위 모든 것들은 사실상 타입 지정때문에 사용하는 타입관련 함수들. 타입지정이 아니라면 사용될 일이 없다.
//
// e.preventDefault();: 폼 제출(Submit)시 새로고침 효과(페이지 깜빡)를 막기위함
