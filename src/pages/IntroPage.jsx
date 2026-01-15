import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import styles from './IntroPage.module.css';
import cardBackImage from '../assets/cards/tarot_card_back.png';

const IntroPage = () => {
    const navigate = useNavigate();

    // Generate random particles
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 2
    }));

    return (
        <div className={styles.container}>
            {/* Background Particles */}
            <div className={styles.particlesContainer}>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className={styles.particle}
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <Header />

            <main className={styles.main}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className={styles.content}
                >
                    <motion.h1 className={styles.title}>
                        <span className={styles.titleTop}>2026</span>
                        <span className={styles.titleBottom}>MYSTIC TAROT</span>
                    </motion.h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        당신의 운명을 비추는 신비로운 거울
                        <br />
                        <span className={styles.subtitleSmall}>2026년의 흐름을 미리 확인해보세요</span>
                    </motion.p>

                    <div className={styles.visualContainer}>
                        {/* Decorative background circle */}
                        <div className={styles.glowCircle} />

                        {/* Floating Cards Composition */}
                        <motion.div
                            className={`${styles.card} ${styles.cardLeft}`}
                            animate={{ y: [0, -15, 0], rotate: [-10, -15, -10] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <img src={cardBackImage} alt="Tarot Card" />
                        </motion.div>

                        <motion.div
                            className={`${styles.card} ${styles.cardCenter}`}
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                            <img src={cardBackImage} alt="Tarot Card" />
                        </motion.div>

                        <motion.div
                            className={`${styles.card} ${styles.cardRight}`}
                            animate={{ y: [0, -15, 0], rotate: [10, 15, 10] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <img src={cardBackImage} alt="Tarot Card" />
                        </motion.div>
                    </div>

                    <motion.button
                        className={styles.startBtn}
                        onClick={() => navigate('/select')}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        운세 확인하기
                    </motion.button>
                </motion.div>
            </main>
        </div>
    );
};

export default IntroPage;
