'use client';

import '@/css/styles.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const API_SERVER: string = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`;

export default function Index() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${API_SERVER}/rest/auth/login/session/index`, {
                    method: 'GET',
                    credentials: 'include',
                });
                console.log(response);
                const data = await response.text();
                if (data === 'Success') {
                    setIsAuthenticated(true);
                } else {
                    router.push('/frnt/auth/login/session/login');
                }
            } catch (error) {
                router.push('/frnt/auth/login/session/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

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