import React, { useState, useEffect } from 'react';
import { FaRecycle, FaBoxOpen } from 'react-icons/fa';
import { FaSpinner } from "react-icons/fa";
import axios from 'axios';
import './ContributionCount.css';
import { BASE_URL } from '../config';

const ContributionCount = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) return;

                const response = await axios.get(`${BASE_URL}/ewaste-items/aggregate`, {
                    params: { email }
                });
                setCount(response.data.count);
            } catch (error) {
                console.error('Error fetching contribution count:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCount();
    }, []);

    if (loading) {
        return (
            <div className="contribution-container_2090">
                <div className="contribution-card_2090 loading_2090">
                    <FaSpinner className="spinner_2090" />
                    <p>Loading contributions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="contribution-container_2090">
            <div className="contribution-card_2090">
                <div className="contribution-icon_2090">
                    <FaRecycle className="main-icon_2090" />
                    <FaBoxOpen className="secondary-icon_2090" />
                </div>
                <div className="contribution-content_2090">
                    <span className="count-text_2090">
                        {count.toLocaleString()}
                    </span>
                    <p className="contribution-label_2090">Items Contributed</p>
                </div>
            </div>
        </div>
    );
};

export default ContributionCount;
