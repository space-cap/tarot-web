import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, RotateCcw } from 'lucide-react';
import Header from '../components/common/Header';
import styles from './ResultPage.module.css';
import cardBackImage from '../assets/cards/tarot_card_back.png';

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedCards, question } = location.state || {}; // Get question from state

    useEffect(() => {
        if (!selectedCards || selectedCards.length === 0) {
            navigate('/');
        }
    }, [selectedCards, navigate]);

    if (!selectedCards) return null;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: '타로2026 - 나의 신년 운세',
                    text: `Q: ${question || '2026년 운세'}\n결과: ${selectedCards.map(c => c.name_ko).join(', ')}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            alert('공유하기 기능이 지원되지 않는 환경입니다.');
        }
    };

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                {/* User Question Display */}
                <motion.div
                    className={styles.questionBox}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className={styles.qLabel}>Q.</span>
                    <h2 className={styles.qText}>{question || "당신의 2026년 운세"}</h2>
                </motion.div>

                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    운명의 해답
                </motion.h1>

                <div className={styles.cardsContainer}>
                    {selectedCards.map((card, index) => (
                        <div key={card.id} className={styles.resultItem}>
                            <motion.div
                                className={styles.cardWrapper}
                                initial={{ rotateY: 180, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: index * 0.3 }}
                            >
                                <div className={styles.cardInner}>
                                    {/* Front */}
                                    <div className={styles.cardFront}>
                                        <img src={card.image} alt={card.name_ko} />
                                    </div>
                                    {/* Back (Visual only, logically flipping from back to front) */}
                                    <div className={styles.cardBack}>
                                        <img src={cardBackImage} alt="Back" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className={styles.interpretation}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: (index * 0.3) + 0.5 }}
                            >
                                <h3 className={styles.cardName}>{index + 1}. {card.name_ko} <span className={styles.cardNameEn}>({card.name_en})</span></h3>
                                <div className={styles.keywords}>
                                    {card.keywords.map(kw => <span key={kw}>#{kw}</span>)}
                                </div>
                                <p className={styles.desc}>{card.desc}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>

                <motion.div
                    className={styles.actions}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <button className={styles.actionBtn} onClick={() => navigate('/')}>
                        <RotateCcw size={18} /> 다시하기
                    </button>
                    <button className={`${styles.actionBtn} ${styles.shareBtn}`} onClick={handleShare}>
                        <Share2 size={18} /> 공유하기
                    </button>
                </motion.div>
            </main>
        </div>
    );
};

export default ResultPage;
