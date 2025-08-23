'use client';

import '@/css/styles.css'
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DbCrudType } from '@/types/db.crud.type';
import Link from 'next/link';

const BASE_URL: string = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export default function Read() {
    const router = useRouter();
    const { idx } = useParams<{ idx: string }>();
    const [Read, setRead] = useState<DbCrudType>();

    useEffect(() => {
        fetch(`${BASE_URL}/rest/db/crud/basic/read/${idx}`)
        .then(response => response.json())
        .then(data => setRead(data));
    }, [idx]);

    const Delete = async () => {
        await fetch(`${BASE_URL}/rest/db/crud/basic/delete/${idx}`, {
            method: 'GET',
        });
        router.push('/frnt/db/crud/basic/list');
    };

    const Update = async (e: any) => {
        e.preventDefault();
    
        await fetch(`${BASE_URL}/rest/db/crud/basic/update/${idx}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Read),
        });

        const response = await fetch(`${BASE_URL}/rest/db/crud/basic/read/${idx}`);
        const data = await response.json();
        setRead(data);
    };

    if (!Read) return <div>로딩중...</div>;

    return (
        <div>
            <form onSubmit={Update}>
                <div>번호 : {Read.idx}</div>
                <div>날짜 : {Read.datetime}</div>
                <div>조회 : {Read.hit}</div>
                <div>이름 : <input    value={Read.username} onChange={e => setRead({...Read, username: e.target.value})}    /></div>
                <div>제목 : <input    value={Read.title}    onChange={e => setRead({...Read, title: e.target.value})}   /></div>
                <div>내용 : <textarea value={Read.content}  onChange={e => setRead({...Read, content: e.target.value})} /></div>
                <button type="submit">수정</button>
            </form>
            <Link href="/frnt/db/crud/basic/list"><button>목록</button></Link>
            <button type="button" onClick={Delete}>삭제</button>
        </div>
     );
}