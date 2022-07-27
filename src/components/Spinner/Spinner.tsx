import React from 'react';
import styles from './spinner.module.scss';

const Spinner: React.FC = () => {
    return (
        <section className={styles.loader}>Loading...</section>
    );
};

export default Spinner;