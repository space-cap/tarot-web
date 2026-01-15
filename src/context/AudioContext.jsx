import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import bgmFile from '../assets/sounds/bgm.ogg';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3); // Default volume 30%
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio(bgmFile);
        audioRef.current.loop = true;
        audioRef.current.volume = volume;

        // Try to auto-play (might be blocked by browser policy until interaction)
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = async () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Audio play failed:", error);
            }
        }
    };

    return (
        <AudioContext.Provider value={{ isPlaying, togglePlay, volume, setVolume }}>
            {children}
        </AudioContext.Provider>
    );
};
