import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/common/Header';
import { tarotData } from '../data/tarotData';
import styles from './SelectionPage.module.css';
import cardBackImage from '../assets/cards/tarot_card_back.png';

const SHUFFLE_DURATION = 2000;
const MAX_SELECTION = 3;

const SelectionPage = () => {
    const navigate = useNavigate();
    const [isShuffling, setIsShuffling] = useState(true);
    const [selectedCards, setSelectedCards] = useState([]);
    const [deck, setDeck] = useState([]);

    // Initialize deck with full tarotData
    useEffect(() => {
        // Basic shuffle for random order in logic (view is separate)
        const shuffled = [...tarotData].sort(() => Math.random() - 0.5);
        setDeck(shuffled);

        // Start shuffle animation timer
        const timer = setTimeout(() => {
            setIsShuffling(false);
        }, SHUFFLE_DURATION);

        return () => clearTimeout(timer);
    }, []);

    const handleCardClick = (card) => {
        if (isShuffling) return;
        if (selectedCards.find(c => c.id === card.id)) return; // Already selected

        if (selectedCards.length < MAX_SELECTION) {
            const newSelection = [...selectedCards, card];
            setSelectedCards(newSelection);

            // If reached max selection, navigate to result after brief delay
            if (newSelection.length === MAX_SELECTION) {
                setTimeout(() => {
                    // Pass selected IDs via query string or state
                    // Here using state via location (more secure/clean for React Router)
                    navigate('/result', { state: { selectedCards: newSelection } });
                }, 800);
            }
        }
    };

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                <div className={styles.statusMessage}>
                    {isShuffling ? (
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            운명을 섞는 중...
                        </motion.h2>
                    ) : (
                        <motion.div
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
                </div>

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
                                animate={isShuffling ? {
                                    // Shuffling animation state
                                    x: [0, (Math.random() - 0.5) * 50, 0],
                                    y: [0, (Math.random() - 0.5) * 50, 0],
                                    rotate: (Math.random() - 0.5) * 360,
                                    scale: 0.8,
                                    opacity: 1
                                } : {
                                    // Spread out/Fan animation state (simplified grid for now)
                                    x: 0,
                                    y: 0,
                                    rotate: selectedCards.includes(card) ? -10 : 0,
                                    scale: 1,
                                    opacity: selectedCards.includes(card) ? 0 : 1 // Hide from deck if selected
                                }}
                                transition={{
                                    duration: isShuffling ? 0.5 : 0.5,
                                    delay: isShuffling ? index * 0.05 : index * 0.02,
                                    repeat: isShuffling ? Infinity : 0
                                }}
                                layout // Smooth layout changes
                            >
                                <img src={cardBackImage} alt="Tarot Card Back" draggable="false" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Selected Cards Display (Bottom Slot) */}
                {!isShuffling && selectedCards.length > 0 && (
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
