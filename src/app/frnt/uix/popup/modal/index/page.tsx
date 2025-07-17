'use client'

import '@/css/styles.css'
import { useState } from 'react';
import './base.css'

interface ModalProps {
	isOpen: boolean;
	onClose:() => void;
	// 잘 모르겠으면 any 타입으로 지정할 것.
}

const ModalContent = ({ isOpen, onClose }: ModalProps) => {
	if (!isOpen) return null;

	return (
		<>
			{/* 모달창 배경. (반투명 검정색) */}
			<div className="modal-overlay" id="modalOverlay" onClick={onClose}></div>
			
			{/* 모달창 */}
			<div id="modal">
				<h2>모달창</h2>
				<p>이것은 기본적인 모달창.</p>
				<button onClick={onClose}>닫기</button>
			</div>
		</>
	);
}

export default function Index() {
	const [modalState, setModalState] = useState(false);

	const openModal  = () => { setModalState(true) }
	const closeModal = () => { setModalState(false) }

	return (
		<>
			{/* 기본 콘텐츠 */}
			<h2>모달창 예제</h2>
			<button onClick={openModal}>모달창 열기</button>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			
			<ModalContent isOpen={modalState} onClose={closeModal} />
		</>
	);
}

// 해설
// 템플릿 엔진(Thymeleaf, EJS) 등으로 모달팝업 창 구현할때는 css 스타일에 display:none 를 입히고 block/none 옵션 선택으로 구현했으나 (display 스타일 제어 방식)
// React 에서 그런 식으로 개발을 할 경우 성능이 안좋아지는 단점이 있음.
// React 에서는 {modal && <div>...} 이런 방식을 사용함 (조건부 렌더링 방식)
// 팝업 동작을 외부 함수로 만들고 그 함수를 조건부 방식으로 호출하는 방법을 사용함
// 함수를 호출할때 Props를 지정해 주입해야 한다는 번거로움이 있음.