'use client';

import '@/css/styles.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DbCrudType } from '@/types/db.crud.type';
const BASE_URL: string = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export default function List() {
	const [list, setList] = useState<DbCrudType[]>([]);

	useEffect(() => {
		fetch(`${BASE_URL}/rest/db/crud/basic/list`)
		.then(response => response.json())
		.then(data => setList(data));
	}, []);


	return (
		<div>
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
							<td><Link href={`/frnt/db/crud/basic/read/${list.idx}`}>{list.title}</Link></td>
							<td>{list.username}</td>
							<td>{list.datetime}</td>
							<td>{list.hit}</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td><Link href="/frnt/db/crud/basic/create"><button>글작성</button></Link></td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}