import React, { useState } from 'react';
import { Box } from '@mui/material';
import './Loading.scss';

function Loading() {
    const [key, setKey] = useState(0);

    return (
        <Box className="overlay-container" sx={{ minHeight: '100vh' }}>
            <div className="overlay-background"></div>
            <div className="overlay-content">
                <div className="sharingan">
                    <div className="inner-ring">
                        <div className="tomoe"></div>
                        <div className="tomoe"></div>
                        <div className="tomoe"></div>
                        <div className="circle"></div>
                    </div>
                </div>

                <div className="mangekyou">
                    <div className="point"></div>
                    <div className="point"></div>
                    <div className="point"></div>
                    <div className="circle"></div>
                </div>
                <div className="containerload">
                    <div className="boxload"></div>
                </div>
            </div>
        </Box>
    );
}

export default Loading;
