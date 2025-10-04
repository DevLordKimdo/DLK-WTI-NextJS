import { DbCrudType } from '@/types/db.crud.type';

interface StepProps {
    formData: DbCrudType;
    setFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
    onReset: () => void;
}

export default function Step2({ formData, setFormData, onNext, onBack }: StepProps) {
    return (
        <div>
            <h2>STEP 2</h2>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            <br />
            <button onClick={onBack}>뒤로</button>
            <button onClick={onNext}>다음</button>
        </div>
    );
}