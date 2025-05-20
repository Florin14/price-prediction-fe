import React, { useRef, ReactNode, FormEvent } from "react";

interface FormLayoutProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
    className?: string;
    autoComplete?: string;
    style?: any;
}

const FormLayout: React.FC<FormLayoutProps> = ({ onSubmit, children, className, autoComplete = "off", style }) => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (document.activeElement && formRef.current && formRef.current.contains(document.activeElement)) {
            (document.activeElement as HTMLElement).blur();
        }
        // Trim all text input values to prevent whitespace issues
        if (formRef.current) {
            const textInputs = formRef.current.querySelectorAll('input[type="text"], textarea');
            textInputs.forEach((input: Element) => {
                if ((input as HTMLInputElement | HTMLTextAreaElement).value) {
                    (input as HTMLInputElement | HTMLTextAreaElement).value = (input as HTMLInputElement | HTMLTextAreaElement).value.trim();
                }
            });
        }
        setTimeout(() => {
            onSubmit(e);
        }, 0);
    };

    return (
        <form style={style} className={className} onSubmit={handleSubmit} autoComplete={autoComplete}>
            {children}
        </form>
    );
};

export default FormLayout;
