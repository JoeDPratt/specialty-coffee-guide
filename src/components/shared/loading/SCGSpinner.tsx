import React, { useEffect, useRef } from 'react';
import SCGLogo from '@/components/icons/scg-logo-mark.svg';
import './SCGSpinner.css';

const SCGSpinner = ({ size = 64, hasGrounds = false }: { size?: number, hasGrounds?: boolean }) => {
    const groundsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (groundsRef.current) {
                const ground = document.createElement('div');
                ground.className = 'coffee-ground';
                ground.style.left = `${Math.random() * 100}%`;
                groundsRef.current.appendChild(ground);

                // Remove the ground after animation
                setTimeout(() => {
                    groundsRef.current?.removeChild(ground);
                }, 1000);
            }
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="spinner-container" style={{ width: size, height: size }}>
            <div className="logo-wrapper">
                <SCGLogo width={size} height={size} />
            </div>
            {hasGrounds && <div className="grounds-container" ref={groundsRef}></div>}
        </div>
    );
};

export default SCGSpinner;
