import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GuideTabs from '../components/feature/guide/GuideTabs';
import GuideSections from '../components/feature/guide/GuideSections';
import '../styles/TarotGuide.css';

const TarotGuide = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('history');

    return (
        <motion.div
            className="guide-page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="guide-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    <ArrowLeft size={24} color="#FFD700" />
                </button>
                <h1 className="guide-title">The Book of Mystery</h1>
            </div>

            <div className="guide-content-wrapper">
                <GuideTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="guide-scroll-area">
                    <AnimatePresence mode="wait">
                        <GuideSections activeTab={activeTab} />
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default TarotGuide;
