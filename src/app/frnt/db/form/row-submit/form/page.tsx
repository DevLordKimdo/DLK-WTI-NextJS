'use client';

import '@/css/styles.css'
import { useState, useEffect } from 'react';
import { DbCrudType } from '@/types/db.crud.type';
const BASE_URL: string = `${process.env.NEXT_PUBLIC_BASE_URL}`;

interface RowSubmitType extends DbCrudType {
    idx: number;
}

export default function Form() {
    const [rows, setRows] = useState<RowSubmitType[]>([]);
    const [nextIdx, setNextIdx] = useState(1);

    const addRow = () => {
        setRows(prev => [...prev, { idx: nextIdx, title: '', username: '', content: '' }]);
        setNextIdx(prev => prev + 1);
    };

    const deleteRow = (idx: number) => {
        setRows(prev => prev.filter(row => row.idx !== idx));
    };

    const changeRow = (idx: number, field: keyof RowSubmitType, value: string) => {
        setRows(prev => prev.map(row => 
            row.idx === idx ? { ...row, [field]: value } : row
        ));
    };

    const copyRow = (idx: number) => {
        const source = rows.find(row => row.idx === idx);
        if (source) {
            setRows(prev => [...prev, { ...source, idx: nextIdx }]);
            setNextIdx(prev => prev + 1);
        }
    };

    const submit = async (e: any) => {
        e.preventDefault();
        await fetch(`${BASE_URL}/rest/db/form/row-submit/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rows),
        });
    };

    useEffect(() => {
        setRows([
            { idx: 1, title: '', username: '', content: '' },
            { idx: 2, title: '', username: '', content: '' },
            { idx: 3, title: '', username: '', content: '' }
        ]);
        setNextIdx(4);
    }, []);

    return (
        <form onSubmit={submit}>
            <table>
                <colgroup> 
                    <col style={{width: "10%"}}/>
                    <col style={{width: "40%"}}/>
                    <col style={{width: "20%"}}/>
                    <col style={{width: "20%"}}/>
                    <col style={{width: "10%"}}/>
                </colgroup>
                <thead>
                    <tr>
                        <th><button type="submit">전송</button></th>
                        <th>제목</th>
                        <th>이름</th>
                        <th>내용</th>
                        <th><button type="button" onClick={addRow}>추가</button></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={row.idx}>
                            <td>
                                <span>{index + 1}</span>
                            </td>
                            <td>
                                <input type="text" name="title" value={row.title} onChange={e => changeRow(row.idx, 'title', e.target.value)} />
                            </td>
                            <td>
                                <input type="text" name="username" value={row.username} onChange={e => changeRow(row.idx, 'username', e.target.value)} />
                            </td>
                            <td>
                                <textarea name="content" value={row.content} onChange={e => changeRow(row.idx, 'content', e.target.value)} />
                            </td>
                            <td>
                                <button type="button" onClick={() => deleteRow(row.idx)}>삭제</button>
                                <button type="button" onClick={() => copyRow(row.idx)}>복사</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </form>
    );
}