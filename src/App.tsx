import { CheckIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import Flame from './components/Flame';
import { useEffect, useRef, useState } from 'react';

const App = () => {
    const cardsRef = useRef<HTMLElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [mouseOnCard, setMouseOnCard] = useState(false);
    const [gradientCenter, setGradientCenter] = useState({
        cx: '50%',
        cy: '50%',
    });

    const handleMouseMove = (
        event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        if (cardsRef.current) {
            const rect = cardsRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setCursor({
                x,
                y,
            });
        }
    };

    useEffect(() => {
        if (cardsRef.current && cursor.x !== null && cursor.y !== null) {
            const cardRect = cardsRef.current.getBoundingClientRect();
            const cxPercentage = (cursor.x / cardRect.width) * 100;
            const cyPercentage = (cursor.y / cardRect.height) * 100;

            setGradientCenter({
                cx: `${cxPercentage}%`,
                cy: `${cyPercentage}%`,
            });
        }
    }, [cursor, cardsRef]);

    return (
        <main className="w-full h-screen flex place-items-center justify-center">
            <section
                className="relative w-[44rem] h-[26rem] p-[1px] flex items-center justify-center"
                ref={cardsRef}
                onMouseEnter={() => setMouseOnCard(true)}
                onMouseLeave={() => setMouseOnCard(false)}
                onMouseMove={(e) => handleMouseMove(e)}
            >
                <div className="card">
                    <div className="flex flex-col w-2/5 justify-between">
                        <div className="flex flex-col gap-5">
                            <CircleStackIcon className="w-14 rounded-lg bg-neutral-950/70 stroke-amber-400 p-2 shadow-inner" />
                            <h1 className="font-poppins text-neutral-200 tracking-wide text-2xl">
                                Database
                            </h1>
                            <p className="-mt-2 font-poppins text-neutral-500 tracking-wide">
                                Every project is a full Postgres database, the
                                world's most trusted relational database.
                            </p>
                        </div>
                        <div className="flex flex-col font-poppins text-neutral-200 tracking-wide">
                            <span className="flex flex-row gap-2">
                                <CheckIcon className="w-5" />
                                <p>100% portable</p>
                            </span>
                            <span className="flex flex-row gap-2">
                                <CheckIcon className="w-5" />
                                <p>Built-in Auth with RLS</p>
                            </span>
                            <span className="flex flex-row gap-2">
                                <CheckIcon className="w-5" />
                                <p>Easy to extend</p>
                            </span>
                        </div>
                    </div>
                    <div className="w-3/5 flex flex-col place-items-center">
                        <Flame
                            cursor={cursor}
                            mouseOnCard={mouseOnCard}
                            gradientCenter={gradientCenter}
                        />
                    </div>
                </div>

                <svg className="absolute -z-10 top-0 left-0 w-full h-full">
                    <defs>
                        <radialGradient
                            id="rectangleGradient"
                            gradientUnits="userSpaceOnUse"
                            cx={gradientCenter.cx}
                            cy={gradientCenter.cy}
                        >
                            {mouseOnCard && <stop stopColor="#fbbf24" />}
                            <stop offset={1} stopColor="#404040" />
                        </radialGradient>
                    </defs>
                    <rect
                        className="fill-[url('#rectangleGradient')] w-full h-full"
                        rx={8}
                    />
                </svg>
            </section>
        </main>
    );
};

export default App;
