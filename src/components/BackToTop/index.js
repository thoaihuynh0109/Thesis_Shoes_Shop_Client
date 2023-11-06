import React, { useState, useEffect } from 'react';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import classNames from 'classnames/bind';
import styles from './BackToTop.module.scss';
import { Avatar, styled } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const cx = classNames.bind(styles);

const ScrollToTopTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
        fontSize: 15,
    },
}));

const ScrollButtonToTop = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => {
            window.removeEventListener('scroll', toggleVisible);
        };
    }, []);

    return (
        <div
            className={styles.backToTopButton}
            onClick={scrollToTop}
            style={{ display: visible ? 'inline' : 'none' }}
        >
          {/* background: #c2e0ff */}
          {/* color: #004c99; */}
            <ScrollToTopTooltip title="Scroll to top">
                <Avatar>
                    <KeyboardArrowUpIcon className={cx('backToTopButton')} />
                </Avatar>
            </ScrollToTopTooltip>
        </div>
    );
};

export default ScrollButtonToTop;
