import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/common/Header';
import { tarotData } from '../data/tarotData';
import styles from './SelectionPage.module.css';
import cardBackImage from '../assets/cards/tarot_card_back.png';

const SHUFFLE_DURATION = 2000;
const MAX_SELECTION = 3;

const RECOMMENDED_QUESTIONS = [
    "2026년 총운 🌟",
    "연애/사랑 💖",
    "금전/재물 💰",
    "직장/진로 💼",
    "인간관계 🤝",
    "건강운 💪"
];

const SelectionPage = () => {
    const navigate = useNavigate();
    // Steps: 'input' -> 'shuffling' -> 'selecting'
    const [step, setStep] = useState('input');
    const [question, setQuestion] = useState('');
    const [selectedCards, setSelectedCards] = useState([]);
    const [deck, setDeck] = useState([]);

    // Initialize deck with full tarotData
    useEffect(() => {
        const shuffled = [...tarotData].sort(() => Math.random() - 0.5);
        setDeck(shuffled);
    }, []);

    const handleStartSelection = () => {
        if (!question.trim()) return;
        setStep('shuffling');

        // Start shuffle animation timer
        setTimeout(() => {
            setStep('selecting');
        }, SHUFFLE_DURATION);
    };

    const handleCardClick = (card) => {
        if (step !== 'selecting') return;
        if (selectedCards.find(c => c.id === card.id)) return; // Already selected

        if (selectedCards.length < MAX_SELECTION) {
            const newSelection = [...selectedCards, card];
            setSelectedCards(newSelection);

            // If reached max selection, navigate to result after brief delay
            if (newSelection.length === MAX_SELECTION) {
                setTimeout(() => {
                    navigate('/result', {
                        state: {
                            selectedCards: newSelection,
                            question: question
                        }
                    });
                }, 800);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && question.trim()) {
            handleStartSelection();
        }
    };

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                <div className={styles.statusMessage}>
                    <AnimatePresence mode='wait'>
                        {step === 'input' && (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={styles.inputContainer}
                            >
                                <h2>어떤 고민이 있으신가요?</h2>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    placeholder="직접 입력하거나 아래 키워드를 선택하세요"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    autoFocus
                                />

                                {/* Recommended Questions Chips */}
                                <div className={styles.chipContainer}>
                                    {RECOMMENDED_QUESTIONS.map((q) => (
                                        <button
                                            key={q}
                                            className={styles.chip}
                                            onClick={() => setQuestion(q)}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className={styles.submitBtn}
                                    onClick={handleStartSelection}
                                    disabled={!question.trim()}
                                >
                                    카드 섞기
                                </button>
                            </motion.div>
                        )}

                        {step === 'shuffling' && (
                            <motion.h2
                                key="shuffling"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                운명을 섞는 중...
                            </motion.h2>
                        )}

                        {step === 'selecting' && (
                            <motion.div
                                key="selecting"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2>신중하게 {MAX_SELECTION - selectedCards.length}장을 선택하세요</h2>
                                <div className={styles.progressBar}>
                                    {Array.from({ length: MAX_SELECTION }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`${styles.progressDot} ${i < selectedCards.length ? styles.active : ''}`}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Deck is hidden during input phase */}
                {step !== 'input' && (
                    <div className={styles.deckContainer}>
                        <AnimatePresence>
                            {deck.map((card, index) => (
                                <motion.div
                                    key={card.id}
                                    className={`${styles.card} ${selectedCards.includes(card) ? styles.selected : ''}`}
                                    onClick={() => handleCardClick(card)}
                                    initial={{
                                        x: 0,
                                        y: 0,
                                        rotate: 0,
                                        scale: 0.5,
                                        opacity: 0
                                    }}
                                    animate={step === 'shuffling' ? {
                                        // Shuffling animation state
                                        x: [0, (Math.random() - 0.5) * 50, 0],
                                        y: [0, (Math.random() - 0.5) * 50, 0],
                                        rotate: (Math.random() - 0.5) * 360,
                                        scale: 0.8,
                                        opacity: 1
                                    } : {
                                        // Spread out/Fan animation state
                                        x: 0,
                                        y: 0,
                                        rotate: selectedCards.includes(card) ? -10 : 0,
                                        scale: 1,
                                        opacity: selectedCards.includes(card) ? 0 : 1
                                    }}
                                    transition={{
                                        duration: step === 'shuffling' ? 0.5 : 0.5,
                                        delay: step === 'shuffling' ? index * 0.05 : index * 0.02,
                                        repeat: step === 'shuffling' ? Infinity : 0
                                    }}
                                    layout
                                >
                                    <img src={cardBackImage} alt="Tarot Card Back" draggable="false" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Selected Cards Display (Bottom Slot) */}
                {step === 'selecting' && selectedCards.length > 0 && (
                    <div className={styles.slotContainer}>
                        {selectedCards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                className={styles.slotCard}
                                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <img src={cardBackImage} alt="Selected Card" />
                                <span className={styles.slotIndex}>{index + 1}</span>
                            </motion.div>
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
};

export default SelectionPage;
