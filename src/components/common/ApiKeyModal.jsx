import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Key, X, Check } from 'lucide-react';
import '../../styles/TarotGuide.css'; // We will add styles here

const ApiKeyModal = ({ isOpen, onClose, onSave }) => {
    const [inputKey, setInputKey] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Check if key exists
            const savedKey = localStorage.getItem('openai_api_key');
            if (savedKey) setInputKey(savedKey);
        }
    }, [isOpen]);

    const handleSave = () => {
        if (!inputKey.startsWith('sk-') || inputKey.length < 20) {
            setError('유효하지 않은 API 키 형식입니다. (sk-...)');
            return;
        }
        localStorage.setItem('openai_api_key', inputKey);
        onSave(inputKey);
        onClose();
    };

    const handleClear = () => {
        localStorage.removeItem('openai_api_key');
        setInputKey('');
        setError('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="api-modal-overlay">
                    <motion.div
                        className="api-modal-content"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>

                        <div className="modal-header">
                            <Lock className="modal-icon" size={32} />
                            <h2>비밀의 열쇠 (Secret Key)</h2>
                        </div>

                        <p className="modal-desc">
                            역사의 정령을 소환하기 위해서는<br />
                            <strong>OpenAI API Key</strong>가 필요합니다.<br />
                            <span className="sub-desc">* 키는 오직 브라우저 내부에만 저장됩니다.</span>
                        </p>

                        <div className="input-group">
                            <Key size={18} className="input-icon" />
                            <input
                                type="password"
                                placeholder="sk-..."
                                value={inputKey}
                                onChange={(e) => {
                                    setInputKey(e.target.value);
                                    setError('');
                                }}
                                className="api-input"
                            />
                        </div>

                        {error && <p className="error-msg">{error}</p>}

                        <div className="modal-actions">
                            <button className="action-btn clear" onClick={handleClear}>
                                초기화
                            </button>
                            <button className="action-btn save" onClick={handleSave}>
                                <Check size={18} /> 저장 및 소환
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ApiKeyModal;
