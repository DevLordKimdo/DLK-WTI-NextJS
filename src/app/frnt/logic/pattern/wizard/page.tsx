'use client'

import { useState, useEffect } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import done  from './done';
import { DbCrudType } from '@/types/db.crud.type';

interface StepProps {
    formData: DbCrudType;
    setFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
    onReset: () => void;
}

const Start = ({ onNext }: StepProps) => {
    return (
        <>
            <h2>글 작성</h2>
            <button onClick={onNext}>시작하기</button>
        </>
    );
}

export default function Index() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<DbCrudType>({ username: '', title: '', content: '' });

    const steps = [Start, Step1, Step2, Step3, done];
    const CurrentStep = steps[step];

    useEffect(() => {
        if (step === 4) { Submit(); }
    }, [step]);

    const Submit = () => {
        console.log("username : " , formData.username);
        console.log("   title : " , formData.title);
        console.log(" content : " , formData.content);
    }

    const FormReset = () => {
        setFormData({ username: '', title: '', content: '' });
    }

    return (
        <CurrentStep 
            formData={formData}
            setFormData={setFormData}
            onNext={() => setStep(step + 1)}
            onBack={() => setStep(step - 1)}
            onReset={() => { setStep(0); FormReset(); }}
        />
    );
}