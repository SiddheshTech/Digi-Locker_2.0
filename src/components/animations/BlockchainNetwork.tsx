import { useMemo } from 'react';
import { motion } from 'framer-motion';

const BlockchainNetwork = () => {
    const nodes = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        targetX: Math.random() * 5 - 2.5,
        targetY: Math.random() * 5 - 2.5,
        duration: 4 + Math.random() * 4
    })), []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {nodes.map((node) => (
                    <motion.circle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r={node.size / 10}
                        fill="var(--primary-400)"
                        initial={{ opacity: 0.3, scale: 0.8 }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scale: [0.8, 1.2, 0.8],
                            x: [0, node.targetX, 0],
                            y: [0, node.targetY, 0]
                        }}
                        transition={{
                            duration: node.duration,
                            repeat: Infinity,
                            delay: node.delay
                        }}
                    />
                ))}
                {nodes.map((node, i) => {
                    const nextNode = nodes[(i + 1) % nodes.length];
                    return (
                        <motion.line
                            key={`line-${i}`}
                            x1={node.x}
                            y1={node.y}
                            x2={nextNode.x}
                            y2={nextNode.y}
                            stroke="var(--primary-500)"
                            strokeWidth="0.05"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.2 }}
                            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default BlockchainNetwork;
