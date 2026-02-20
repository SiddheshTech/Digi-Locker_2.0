import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InstitutionPortal() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login?role=institution', { replace: true });
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
            <div className="text-secondary">Redirecting to login...</div>
        </div>
    );
}
