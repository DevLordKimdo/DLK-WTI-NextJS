import { DbCrudType } from '@/types/db.crud.type';

interface StepProps {
    formData: DbCrudType;
    setFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
    onReset: () => void;
}

export default function done({ formData, onReset }: StepProps) {
    return (
        <div>
            <h2>제출 완료!</h2>
            <p>작성자: {formData.username}</p>
            <p>제목: {formData.title}</p>
            <p>내용: {formData.content}</p>
            <button onClick={onReset}>처음으로</button>
        </div>
    );
}