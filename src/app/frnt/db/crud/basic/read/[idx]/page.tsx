'use client';

import '@/css/styles.css'
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DbCrudType } from '@/types/db.crud.type';
import Link from 'next/link';

const API_SERVER: string = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`;

export default function Read() {
    const router = useRouter();
    const { idx } = useParams<{ idx: string }>();
    const [read, setRead] = useState<DbCrudType>();

    useEffect(() => {
        fetch(`${API_SERVER}/rest/db/crud/basic/read/${idx}`)
        .then(response => response.json())
        .then(data => setRead(data));
    }, [idx]);

    const Delete = async () => {
        await fetch(`${API_SERVER}/rest/db/crud/basic/delete/${idx}`, {
            method: 'GET',
        });
        router.push('/frnt/db/crud/basic/list');
    };

    const Update = async (e: any) => {
        e.preventDefault();
    
        await fetch(`${API_SERVER}/rest/db/crud/basic/update/${idx}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(read),
        });

        const response = await fetch(`${API_SERVER}/rest/db/crud/basic/read/${idx}`);
        const data = await response.json();
        setRead(data);
    };

    if (!read) return <div>로딩중...</div>;

    return (
        <div>
            <form onSubmit={Update}>
                <div>번호 : {read.idx}</div>
                <div>날짜 : {read.datetime}</div>
                <div>조회 : {read.hit}</div>
                <div>이름 : <input    value={read.username} onChange={e => setRead({...read, username: e.target.value})}    /></div>
                <div>제목 : <input    value={read.title}    onChange={e => setRead({...read, title: e.target.value})}   /></div>
                <div>내용 : <textarea value={read.content}  onChange={e => setRead({...read, content: e.target.value})} /></div>
                <button type="submit">수정</button>
            </form>
            <Link href="/frnt/db/crud/basic/list"><button>목록</button></Link>
            <button type="button" onClick={Delete}>삭제</button>
        </div>
     );
}