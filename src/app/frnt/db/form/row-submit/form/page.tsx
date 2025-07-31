'use client';

import '@/css/styles.css'
import { useState, useEffect } from 'react';

export default function Form() {

    const [rows, setRows] = useState<{queue: number}[]>([]);
    const [nextQueue, setNextQueue] = useState(1);

    const AddRow = () => {
        setRows((preRow) => ([...preRow, {queue: nextQueue}]));
        setNextQueue((queueNum) => (queueNum + 1));
    };

    const deleteRow = (targetQueue: number) => {
        setRows(queue => queue.filter(row => row.queue !== targetQueue));
    };

    useEffect(() => {
        setRows([{queue: 1}, {queue: 2}, {queue: 3}]);
        setNextQueue(4);
    }, []);

    function RowTable({queue}: {queue:number}) {
        return (
            <tr>
                <td><span>{queue}</span></td>
                <td><input type="text" name="title" /></td>
                <td><input type="text" name="name" /></td>
                <td><textarea name="content" /></td>
                <td>
                    <button type="button" onClick={() => deleteRow(queue)}>삭제</button>
                    <button type="button">복사</button>
                </td>
            </tr>
        );
    }

    return(
        <>
            <form name="form">
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
                            <th><button type="button">전송</button></th>
                            <th>제목</th>
                            <th>이름</th>
                            <th>내용</th>
                            <th><button type="button" onClick={AddRow}>추가</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row => (
                            <RowTable key={row.queue} queue={row.queue} />
                        ))}
                    </tbody>
                </table>
            </form>
        </>
    );
}