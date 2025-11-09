'use client';

import '@/css/styles.css'
import { useState, useEffect } from 'react';
import { DbSearchType } from '@/types/db.search.type';
const API_SERVER: string = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`;

export default function Search() {

    const [list, setList] = useState<DbSearchType[]>([]);
    const [search, setSearch] = useState<DbSearchType>({ searchOption: 'title', searchKeyword: '', searchDateStart: '', searchDateEnded: '', });
    
    const requestData = () => {
        fetch(`${API_SERVER}/rest/db/search/basic/list`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(search),
        })
        .then(response => response.json())
        .then(data => setList(data));
    }

    useEffect(() => { requestData(); },[]);

    const Change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    }

    const Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        requestData();
    }

    return (
        <>
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
                        <th>번호</th>
                        <th>제목</th>
                        <th>이름</th>
                        <th>날짜</th>
                        <th>조회</th>
                    </tr>
                </thead>
                <tbody>
					{list.map(list => (
						<tr key={list.idx}>
							<td>{list.idx}</td>
							<td>{list.title}</td>
							<td>{list.username}</td>
							<td>{list.datetime}</td>
							<td>{list.hit}</td>
						</tr>
					))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            <form onSubmit={Submit}>
                                <select name="searchOption" value={search.searchOption} onChange={Change} >
                                    <option value="title"   >title</option>
                                    <option value="content" >content</option>
                                    <option value="username">username</option>
                                </select>
                                <input type="text" name="searchKeyword"   value={search.searchKeyword}   onChange={Change} />
                                <input type="date" name="searchDateStart" value={search.searchDateStart} onChange={Change} /> ~
                                <input type="date" name="searchDateEnded" value={search.searchDateEnded} onChange={Change} />
                                <input type="submit" value="검색" />
                            </form>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}