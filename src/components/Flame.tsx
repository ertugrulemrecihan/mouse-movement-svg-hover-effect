import { useState, useEffect } from 'react';

interface FlameProps {
    cursor: { x: number; y: number };
    mouseOnCard: boolean;
    gradientCenter: { cx: string; cy: string };
}

const Flame = ({ cursor, mouseOnCard, gradientCenter }: FlameProps) => {
    const [gradientCenterInner, setGradientCenterInner] = useState({
        cx: '50%',
        cy: '50%',
    });

    useEffect(() => {
        setGradientCenterInner({
            cx: gradientCenter.cx,
            cy: gradientCenter.cy,
        });
    }, [cursor, gradientCenter]);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-96 h-96 duration-200 transition-all"
        >
            <defs>
                <radialGradient
                    id="emeraldGradient"
                    gradientUnits="userSpaceOnUse"
                    cx={gradientCenterInner.cx}
                    cy={gradientCenterInner.cy}
                >
                    {mouseOnCard && <stop stopColor="#fbbf24" />}
                    <stop offset={1} stopColor="#404040" />
                </radialGradient>
            </defs>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                className="fill-neutral-950/50"
                stroke='url("#emeraldGradient")'
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                className="fill-neutral-800/50"
                stroke='url("#emeraldGradient")'
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
            />
        </svg>
    );
};

export default Flame;
