import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import styles from './IntroPage.module.css';

const IntroPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className={styles.content}
                >
                    <motion.h1
                        className={styles.title}
                    >
                        2026년<br />당신의 운세
                    </motion.h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        신비로운 타로 카드가 들려주는 당신의 미래
                    </motion.p>

                    <motion.div
                        className={styles.cardVisual}
                        animate={{ y: [0, -20, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Placeholder for Floating Card Visual */}
                        <div className={styles.floatingCard} />
                    </motion.div>

                    <motion.button
                        className={styles.startBtn}
                        onClick={() => navigate('/select')}
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 215, 0, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        운세 보러가기
                    </motion.button>
                </motion.div>
            </main>
        </div>
    );
};

export default IntroPage;
