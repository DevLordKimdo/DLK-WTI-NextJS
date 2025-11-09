'use client';

import '@/css/styles.css'
const API_SERVER: string = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`;

export default function Index() {

    const RequestSession = async () => {
        await fetch(`${API_SERVER}/rest/auth/session/basic/request-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            credentials: 'include'
        });
    };

    const CheckSession = async () => {
        const response = await fetch(`${API_SERVER}/rest/auth/session/basic/check-session`, {
            method: 'GET',
            credentials: 'include'
        });
        
        const result = await response.text();
        console.log(result);
    };

    const DeleteSession = async () => {
        await fetch(`${API_SERVER}/rest/auth/session/basic/delete-session`, {
            method: 'POST',
            credentials: 'include'
        });
    };

    return (
        <>
            <h2>Session Request</h2>
            <div>
                <button onClick={RequestSession}>세션 요청</button>
            </div>
            
            <h2>Check Session</h2>
            <div>
                <button onClick={CheckSession}>세션 확인</button>
            </div>
            
            <h2>Delete Session</h2>
            <div>
                <button onClick={DeleteSession}>세션 삭제</button>
            </div>
        </>
    );
}