'use client';

import '@/css/styles.css'
const API_SERVER: string = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`;

export default function Login() {

    const fn_login = () => {

    }

    return (
        <>
            <form name="form">
                <h2>로그인을 해주세요</h2>
                <table border={1}>
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td><input type="text" name="username"/></td>
                        </tr>
                        <tr>
                            <td>패스워드</td>
                            <td><input type="password" name="password"/></td>
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