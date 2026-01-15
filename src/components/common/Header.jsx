import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2 } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <div className={styles.logo} onClick={() => navigate('/')}>
                Tarot 2026
            </div>
            <button className={styles.soundBtn} aria-label="Toggle Sound">
                <Volume2 size={24} />
            </button>
        </header>
    );
};

export default Header;
