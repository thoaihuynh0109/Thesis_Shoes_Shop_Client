import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import './NotFound.css';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div>
            <section className="page_404">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="col-sm-10 col-sm-offset-1  text-center">
                                <div className="title_404">
                                    <h1 className="text-center ">404</h1>
                                </div>
                                <div className="background_404"></div>
                                <div className="contant_box_404">
                                    <h3 className="h2">Look like you're lost</h3>
                                    <p>The page you are looking for not avaible!</p>
                                    <Button
                                        sx={{
                                            mt: 3,
                                            width: '180px',
                                            height: '55px',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                        }}
                                        variant="contained"
                                        onClick={() => {
                                            // back to home page
                                            navigate('/');
                                        }}
                                    >
                                        Back to Home
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PageNotFound;
