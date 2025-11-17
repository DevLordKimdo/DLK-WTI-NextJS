'use client';

import '@/css/styles.css'
const API_SERVER: string = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`;

export default function Index() {

    const fn_logout = async () => {
        await fetch(`${API_SERVER}/rest/auth/login/session/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            credentials: 'include'
        });
    }

    return (
        <>
            <h2>WELCOME INDEX PAGE</h2>
            <button type="button" onClick={fn_logout}>로그아웃</button>
            <form name="form"></form>
        </>
    );
}