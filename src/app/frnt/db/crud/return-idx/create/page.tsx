'use client';

import '@/css/styles.css'
import { useState } from 'react';
import { DbCrudType } from '@/types/db.crud.type';
const BASE_URL: string = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export default function Create() {

    const [form, setForm] = useState<DbCrudType>({ title: '', content: '', username: '' });

    const Change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const Submit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch(`${BASE_URL}/rest/db/crud/return-idx/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(form),
        });

        setForm({ title: '', content: '', username: '' });
    };

    return (
        <form onSubmit={Submit}>
            이름 : <input    name="username"    value={form.username}    onChange={Change} /><br/>
            제목 : <input    name="title"   value={form.title}   onChange={Change} /><br/>
            내용 : <textarea name="content" value={form.content} onChange={Change} /><br/>
            <button type="submit">작성</button>
        </form>
    );

}