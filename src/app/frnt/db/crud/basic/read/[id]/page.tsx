"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { DbCrudType } from '@/types/db.crud.type';
import Link from 'next/link';

const BASE_URL: string = `${process.env.NEXT_PUBLIC_BASE_URL}`;

interface Props {
    params: Promise<{ id: string }>;
}

export default function Read({ params }: Props) {
    const { id } = use(params);
    const router = useRouter();
    const [Post, setPost] = useState<DbCrudType | null>(null);

    useEffect(() => {
        fetch(`${BASE_URL}/rest/db/crud/basic/read/${id}`)
        .then(response => response.json())
        .then(data => setPost(data));
    }, [id]);

    const Delete = async () => {
        await fetch(`${BASE_URL}/rest/db/crud/basic/delete/${id}`, {
            method: 'GET',
        });
        router.push('/frnt/db/crud/basic/list');
    };

    const Update = async (e: any) => {
        e.preventDefault();
    
        await fetch(`${BASE_URL}/rest/db/crud/basic/update/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Post),
        });

        const response = await fetch(`${BASE_URL}/rest/db/crud/basic/read/${id}`);
        const data = await response.json();
        setPost(data);
    };

    if (!Post) return <div>로딩중...</div>;

    return (
        <div>
            <form onSubmit={Update}>
                <div>번호 : {Post.idx}</div>
                <div>날짜 : {Post.datetime}</div>
                <div>조회 : {Post.hit}</div>
                <div>이름 : <input value={Post.name} onChange={e => setPost({...Post, name: e.target.value})} /></div>
                <div>제목 : <input value={Post.title} onChange={e => setPost({...Post, title: e.target.value})} /></div>
                <div>내용 : <textarea value={Post.content} onChange={e => setPost({...Post, content: e.target.value})} /></div>
                <button type="submit">수정</button>
            </form>
            <Link href="/frnt/db/crud/basic/list"><button>목록</button></Link>
            <button type="button" onClick={Delete}>삭제</button>
        </div>
     );
}