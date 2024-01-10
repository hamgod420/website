import { useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useCallback, useRef, useEffect } from 'react';

export function useScrollToHash() {
    const scrollTimeout = useRef();
    const { asPath, push } = useRouter();
    const reduceMotion = useReducedMotion();

    const scrollToHash = useCallback(
        (hash, onDone) => {
            const id = hash.replace(/^#/, '');
            if (!id) return; // Exit if no id is provided

            const route = asPath.split('#')[0];
            const newPath = `${route}#${id}`;
            const targetElement = document.getElementById(id);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
            } else {
                console.warn(`Element with id ${id} not found.`);
                return;
            }

            const handleScroll = () => {
                clearTimeout(scrollTimeout.current);

                scrollTimeout.current = setTimeout(() => {
                    window.removeEventListener('scroll', handleScroll);
                    if (window.location.pathname === route) {
                        onDone?.();
                        push(newPath, undefined, { scroll: false });
                    }
                }, 50);
            };

            window.addEventListener('scroll', handleScroll);

            // Cleanup function
            return () => {
                window.removeEventListener('scroll', handleScroll);
                clearTimeout(scrollTimeout.current);
            };
        },
        [push, reduceMotion, asPath]
    );

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            clearTimeout(scrollTimeout.current);
        };
    }, []);

    return scrollToHash;
}
