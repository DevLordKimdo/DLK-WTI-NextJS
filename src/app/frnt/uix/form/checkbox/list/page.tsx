'use client'

import '@/css/styles.css'
import { useState, useEffect } from 'react';
import { DbCrudType } from '@/types/db.crud.type';
const BASE_URL: string = `${process.env.NEXT_PUBLIC_BASE_URL}`;

interface CheckboxType extends DbCrudType {
    idx: number;
    checked: boolean;
}

export default function List() {

    const [list, setList] = useState<CheckboxType[]>([]);

    useEffect(() => {
        fetch(`${BASE_URL}/rest/uix/form/checkbox/list`)
        .then(response => response.json())
        .then(data => setList(data));
    }, []);

    const isAllChecked = list.length > 0 && list.every(item => item.checked);

    const CheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        let checked = e.target.checked;
        setList(list.map(item => ({ ...item, checked })));
    };

    const SetChecked = (idx: number, checked: boolean) => {
        setList(list.map(item => item.idx === idx ? { ...item, checked } : item ));
    }

    const [updateForm, setUpdateForm] = useState<DbCrudType>({ title: '', content: '', name: '', hit: 0 });

    const ChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
    };

    const CheckCopy = async (e:any) => {
        e.preventDefault();

        // 체크박스가 체크된 것들 대상으로 idx 값을 String 으로 변환해 넣어주기
        let checkedList = list.filter(item => item.checked).map(item => item.idx.toString());

        // API 쪽은 DTO 또는 타입 때문에 객체 키(key)값 정확히 기입해서 보내줘야 함
        let checkIdx = { idxList : checkedList }

        await fetch(`${BASE_URL}/rest/uix/form/checkbox/copy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(checkIdx),
        });

        // API와 통신을 해서 데이터를 가져와 다시 그려주기
        const response = await fetch(`${BASE_URL}/rest/uix/form/checkbox/list`);
        const data = await response.json();
        setList(data);
    }

    // 프론트엔드 쪽이 JSON형식이 아닌 FormData 형식으로 보내준다면 코드를 아래처럼 작성해야함. 하지만 REST API 권장사항으로 데이터 전달은 Form 보다는 JSON 방식으로 보내는 것을 권장.
    /*
    const CheckCopyForm = async (e:any) => {
        e.preventDefault();

        const checkedList = list.filter(item => item.checked).map(item => item.idx);
        const formData = new FormData();
        checkedList.forEach(id => { formData.append('checkIdx', id.toString()); });

        await fetch(`${BASE_URL}/rest/uix/form/checkbox/copy-form`, {
            method: 'POST',
            body: formData
        });

        const response = await fetch(`${BASE_URL}/rest/uix/form/checkbox/list`);
        const data = await response.json();
        setList(data);
    }
    */

    const CheckUpdate = async (e:any) => {
        e.preventDefault();
        let checkedList = list.filter(item => item.checked).map(item => item.idx.toString());
        let dataForm = { idxList: checkedList, ...updateForm }

        await fetch(`${BASE_URL}/rest/uix/form/checkbox/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(dataForm),
        });

        const response = await fetch(`${BASE_URL}/rest/uix/form/checkbox/list`);
        const data = await response.json();
        setList(data);
    }

    const CheckDelete = async (e:any) => {
        e.preventDefault();
        const checkedList = list.filter(item => item.checked).map(item => item.idx.toString());
        let checkIdx = { idxList : checkedList }

        await fetch(`${BASE_URL}/rest/uix/form/checkbox/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(checkIdx),
        });

        const response = await fetch(`${BASE_URL}/rest/uix/form/checkbox/list`);
        const data = await response.json();
        setList(data);
    }

    return (
        <>
            <form name="form">
                <table border={1}>
                    <colgroup> 
                        <col style={{width: " 5%"}}/>
                        <col style={{width: "10%"}}/>
                        <col style={{width: "35%"}}/>
                        <col style={{width: "20%"}}/>
                        <col style={{width: "20%"}}/>
                        <col style={{width: "10%"}}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th><input type="checkbox" name="checkAll" checked={isAllChecked} onChange={CheckAll} /></th>
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
                                <td><input type="checkbox" name="checkIdx" value={list.idx} checked={list.checked || false} onChange={(e) => SetChecked(list.idx, e.target.checked)} /></td>
                                <td>{list.idx}</td>
                                <td>{list.title}</td>
                                <td>{list.name}</td>
                                <td>{list.datetime}</td>
                                <td>{list.hit}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6}>
                                     제목 : <input type="text" name="title"  value={updateForm.title}  onChange={ChangeForm} />
                                <br/>이름 : <input type="text" name="name" value={updateForm.name} onChange={ChangeForm} />
                                <br/>내용 : <textarea name="content" value={updateForm.content} onChange={ChangeForm}  />
                                <br/>조회수 : <input type="number" name="hit" min="0" max="1000" value={updateForm.hit} onChange={ChangeForm} />
                                <br/>
                                <button type="button" onClick={CheckCopy}>일괄 게시글 복제</button>
                                <button type="button" onClick={CheckUpdate}>일괄 수정</button>
                                <button type="button" onClick={CheckDelete}>일괄 삭제</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </form>
        </>
    );
}
