import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import styles from './Header.module.css';

const Header = () => {
    const navigate = useNavigate();
    const { isPlaying, togglePlay } = useAudio();

    return (
        <header className={styles.header}>
            <div className={styles.logo} onClick={() => navigate('/')}>
                Tarot 2026
            </div>
            <button
                className={styles.soundBtn}
                onClick={togglePlay}
                aria-label={isPlaying ? "Mute Sound" : "Play Sound"}
            >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
        </header>
    );
};

export default Header;
