import React, { useState, useRef, useEffect } from 'react';

import { toolTipStyle } from './ToolTip.css'
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';

interface ToolTipProps {
    children: React.ReactNode
    title: string
    width?: string
    opacity?: number
    rounded?: boolean
    delay?: number; // Optional delay in milliseconds
}

const ToolTip = ({
    children,
    title,
    width = 'auto',
    opacity = 0.90,
    delay = 900 
}: ToolTipProps) => {
    const { colors, defaultRadius } = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const isDarkTheme = colorScheme === 'dark';

    const [showTooltip, setShowTooltip] = useState(false);
    const [shouldDisplay, setShouldDisplay] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (showTooltip) {
            timeoutRef.current = setTimeout(() => {
                setShouldDisplay(true);
            }, delay);
        } else {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setShouldDisplay(false);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [showTooltip, delay]);

    const renderToolTipText = () => {
        // Split the title at each '\n' and map to JSX
        return title.split('\\n').map((line, index, array) => {
            // Split the line at each '<u>' and '</u>' and map to JSX
            const parts = line.split(/<u>|<\/u>/).map((part, partIndex) => {
                // Every odd index part is between <u> and </u>
                if (partIndex % 2 === 1) {
                    return <u key={partIndex} style={{textUnderlineOffset: '3px'}}>{part}</u>;
                }
                return part;
            });

            return (
                <React.Fragment key={index}>
                    {parts}
                    {index < array.length - 1 && <br />}
                </React.Fragment>
            );
        });
    };

    return (
        <div
            ref={childRef}
            onMouseEnter={() => {
                setShowTooltip(true);
            }}
            onMouseLeave={() => setShowTooltip(false)}
            style={{ 
                position: 'relative',
                display: 'inline-block',
            }}
        >
        {children}
        {shouldDisplay && (
            <div
                ref={tooltipRef}
                className={toolTipStyle}
                style={{
                    width,
                    maxWidth: '300px',
                    marginTop: '9px',
                    backgroundColor: isDarkTheme ? 'white' : 'black',
                    color: isDarkTheme ? 'black' : 'white',
                    borderRadius: defaultRadius,
                    opacity,
                }}
            >
                {renderToolTipText()}
            </div>
        )}
        </div>
    );
}

export default ToolTip
