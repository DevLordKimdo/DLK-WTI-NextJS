'use client'

import '@/css/styles.css'

export default function Index() {
	return (
		<>
			<h2>Iframe Content List</h2>
			<iframe src="/frnt/uix/iframe/basic/content" />

			<h2>Iframe Content (border none)</h2>
			<iframe src="/frnt/uix/iframe/basic/content" style={{border: "none"}} />
		</>
	);
}