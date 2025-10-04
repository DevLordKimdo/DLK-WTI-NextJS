import { DbCrudType } from '@/types/db.crud.type';

interface StepProps {
    formData: DbCrudType;
    setFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
    onReset: () => void;
}

export default function Step3({ formData, setFormData, onNext, onBack }: StepProps) {
    return (
        <div>
            <h2>STEP 3</h2>
            <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
            <br />
            <button onClick={onBack}>뒤로</button>
            <button onClick={onNext}>제출</button>
        </div>
    );
}
