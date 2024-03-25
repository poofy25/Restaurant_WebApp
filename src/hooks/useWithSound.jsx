'use client'
import { useRef , useEffect } from "react";
export const useWithSound = (audioSource) => {
    const soundRef = useRef();
  
    useEffect(() => {
      soundRef.current = new Audio(audioSource);
    }, []);

    const playSound = () => {
        soundRef.current.currentTime = 0;
        soundRef.current.play();
    }
  
    return { playSound } ;
}