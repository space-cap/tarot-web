import React from 'react';
import { motion } from 'framer-motion';

const tabs = [
    { id: 'history', label: 'History' },
    { id: 'structure', label: 'Structure' },
    { id: 'how-to-read', label: 'How to Read' }
];

const GuideTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="guide-tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="active-tab-indicator"
                            className="tab-indicator"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default GuideTabs;
