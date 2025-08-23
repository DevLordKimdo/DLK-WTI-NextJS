'use client';

import '@/css/styles.css'
import { useState } from 'react';
import { DbTransactionalType } from '@/types/db.transactional.type';
const BASE_URL: string = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export default function Form() {

    const [form, setForm] = useState<DbTransactionalType>({ username: '', title: '', content: '', errorOption: 'true', transOption: 'false' });
    const [checkValue , setCheckValue] = useState({ errorCheck: true, transCheck: false });

    const ChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const ChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckValue({ ...checkValue, [e.target.name]: e.target.checked })
    }

    const Submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const dataForm = { ...form, errorOption: checkValue.errorCheck ? true : false, transOption: checkValue.transCheck ? true : false }

        await fetch(`${BASE_URL}/rest/db/transactional/basic/form`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(dataForm),
        });
    }

    return (
        <>
        	<form onSubmit={Submit}>
                이름 : <input type="text" name="username" value={form.username} onChange={ChangeValue} /><br/>
                제목 : <input type="text" name="title"    value={form.title}    onChange={ChangeValue} /><br/>
                내용 :          <textarea name="content"  value={form.content}  onChange={ChangeValue} /><br/>
                에러 폼 전송      <input type="checkbox" name="errorCheck" checked={checkValue.errorCheck} onChange={ChangeCheck}/><br/>
                트랜잭션 옵션 적용 <input type="checkbox" name="transCheck" checked={checkValue.transCheck} onChange={ChangeCheck} /><br/>
                <button type="submit">작성</button>
            </form>
        </>
    );
}