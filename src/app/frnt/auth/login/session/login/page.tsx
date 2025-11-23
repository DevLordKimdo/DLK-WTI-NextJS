'use client';

import '@/css/styles.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const API_SERVER: string = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`;

export default function Login() {
    const router = useRouter();
    const [form, setForm] = useState({ username: '' , password: '' });

    const Change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const fn_login = async () => {
        const login = await fetch(`${API_SERVER}/rest/auth/login/session/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(form),
            credentials: 'include'
        });
        const loginResult = await login.text();
        if (loginResult === 'Success') {
            router.push('/frnt/auth/login/session/index');
        }
    }

    return (
        <>
            <form name="form">
                <h2>로그인을 해주세요</h2>
                <table border={1}>
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td><input type="text" name="username" value={form.username} onChange={Change} /></td>
                        </tr>
                        <tr>
                            <td>패스워드</td>
                            <td><input type="password" name="password" value={form.password} onChange={Change}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="button" onClick={fn_login}>로그인</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
}