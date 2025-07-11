"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DbCrudType } from '@/types/db.crud.type';
const BASE_URL: string = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export default function Create() {
    const router = useRouter();

    const [form, setForm] = useState<DbCrudType>({ title: '', content: '', name: '' });

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
            이름 : <input    name="name"    value={form.name}    onChange={Change} placeholder="이름" /><br/>
            제목 : <input    name="title"   value={form.title}   onChange={Change} placeholder="제목" /><br/>
            내용 : <textarea name="content" value={form.content} onChange={Change} placeholder="내용" /><br/>
            <button type="submit">작성</button>
        </form>
    );

}