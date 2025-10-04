import { DbCrudType } from '@/types/db.crud.type';

interface StepProps {
    formData: DbCrudType;
    setFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
    onReset: () => void;
}

export default function Step1({ formData, setFormData, onNext, onBack }: StepProps) {
    return (
        <div>
            <h2>STEP 1</h2>
            <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            <br />
            <button onClick={onBack}>뒤로</button>
            <button onClick={onNext}>다음</button>
        </div>
    );
}