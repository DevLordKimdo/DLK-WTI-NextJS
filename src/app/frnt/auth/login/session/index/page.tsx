'use client';

import '@/css/styles.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const API_SERVER: string = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`;

export default function Index() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [myData, setMyData] = useState<String>();

    const checkAuth = async () => {
        try {
            const chkAuth = await fetch(`${API_SERVER}/rest/auth/login/session/index`, {
                method: 'GET',
                credentials: 'include',
            });
            const response = await chkAuth.text();
            if (response === 'Success') {
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

    const requestData = async () => {
        const reqData = await fetch(`${API_SERVER}/rest/auth/login/session/request-data`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await reqData.text();
        setMyData(data);
    }

    useEffect(() => {
        checkAuth();
        requestData();
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
        router.push('/frnt/auth/login/session/login');
    }

    return (
        <>
            <h2>WELCOME INDEX PAGE</h2>
            <button type="button" onClick={fn_logout}>로그아웃</button>
            <div>Sample Data : {myData}</div>
            <form name="form"></form>
        </>
    );
}