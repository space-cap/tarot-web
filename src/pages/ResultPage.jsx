import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, RotateCcw, Sparkles } from 'lucide-react';
import Header from '../components/common/Header';
import styles from './ResultPage.module.css';
import '../styles/TarotGuide.css';
import '../styles/Oracle.css';
import cardBackImage from '../assets/cards/tarot_card_back.png';
import { aiService } from '../services/aiService';
import ApiKeyModal from '../components/common/ApiKeyModal';

const SPREAD_LABELS = [
    { title: "현재의 상황", sub: "Present Situation" },
    { title: "조언과 지혜", sub: "Advice & Wisdom" },
    { title: "미래의 결과", sub: "Future Outcome" }
];

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedCards, question } = location.state || {};

    // AI State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [aiResult, setAiResult] = useState(null);

    const handleAskOracle = () => {
        const apiKey = localStorage.getItem('openai_api_key');
        if (!apiKey) {
            setIsModalOpen(true);
            return;
        }
        fetchOracleReading(apiKey);
    };

    const fetchOracleReading = async (apiKey) => {
        setIsLoading(true);
        try {
            const result = await aiService.generateTarotReading(
                selectedCards,
                question || "General Fortune",
                apiKey
            );
            setAiResult(result);
        } catch (error) {
            if (error.message === "INVALID_KEY") {
                alert("API Key is invalid.");
                setIsModalOpen(true);
            } else {
                console.error(error);
                alert("The Oracle is silent right now. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeySave = (newKey) => {
        fetchOracleReading(newKey);
    };

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
                                    {/* Back */}
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
                                <div className={styles.spreadLabel}>
                                    <span className={styles.spreadIdx}>{index + 1}</span>
                                    <span className={styles.spreadTitle}>{SPREAD_LABELS[index]?.title}</span>
                                    <span className={styles.spreadSub}>{SPREAD_LABELS[index]?.sub}</span>
                                </div>

                                <h3 className={styles.cardName}>{card.name_ko} <span className={styles.cardNameEn}>({card.name_en})</span></h3>
                                <div className={styles.keywords}>
                                    {card.keywords.map(kw => <span key={kw}>#{kw}</span>)}
                                </div>
                                <p className={styles.desc}>{card.desc}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* AI Oracle Section */}
                {!aiResult && (
                    <motion.div
                        className="oracle-btn-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <button
                            className="oracle-trigger-btn"
                            onClick={handleAskOracle}
                            disabled={isLoading}
                        >
                            <Sparkles size={24} />
                            {isLoading ? "운명을 읽는 중..." : "AI 점술가에게 더 깊은 해석 듣기"}
                        </button>
                    </motion.div>
                )}

                <AnimatePresence>
                    {aiResult && (
                        <motion.div
                            className="oracle-result-container"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="oracle-header">
                                <h3 className="oracle-title"><Sparkles /> The Mystic Oracle</h3>
                                <p className="oracle-mantra">"{aiResult.mantra}"</p>
                            </div>

                            <div className="oracle-content-grid">
                                <div className="reading-section">
                                    <h4 className="reading-label">🔮 Grand Master's Insight</h4>
                                    <div className="oracle-full-reading">
                                        {aiResult.full_reading.split('\\n').map((paragraph, idx) => (
                                            <p key={idx} dangerouslySetInnerHTML={{
                                                __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                            }} />
                                        ))}
                                    </div>
                                </div>

                                <div className="scores-section">
                                    <h4 style={{ color: '#FFD700', marginBottom: '1.5rem', textAlign: 'center' }}>운세 스코어 (Lucky Scores)</h4>
                                    {[
                                        { key: 'money', label: '금전운' },
                                        { key: 'love', label: '애정운' },
                                        { key: 'health', label: '건강운' },
                                        { key: 'work', label: '사업/학업' }
                                    ].map(score => (
                                        <div key={score.key} className="score-item">
                                            <div className="score-label">
                                                <span>{score.label}</span>
                                                <span>{aiResult.scores[score.key]}%</span>
                                            </div>
                                            <div className="score-bar-bg">
                                                <motion.div
                                                    className="score-bar-fill"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${aiResult.scores[score.key]}%` }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

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

                {/* API Key Modal */}
                <ApiKeyModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleKeySave}
                />
            </main>
        </div>
    );
};

export default ResultPage;
