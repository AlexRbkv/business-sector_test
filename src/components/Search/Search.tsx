import React, { useCallback, useState } from 'react';
import styles from './search.module.scss'
import searchIcon from '../../assets/images/search.svg';
import { setSearchValue } from '../../redux/filterSlice/filterSlice';
import { useAppDispatch } from '../../redux/store';
import debounce from 'lodash.debounce';

const Search: React.FC = () => {
	const dispatch = useAppDispatch();
	const [inputValue, setInputValue] = useState('');

	const testDebounce = useCallback(debounce((value: string) => dispatch(setSearchValue(value)), 1000), []); // Задержка в 1000 мс после ввода последнего символа в строку поиска

    const onChangeInput = (value: string) => {
			setInputValue(value);
			testDebounce(value);
    }
	
	return (
		<div className={styles.root}>
			<input
				className={styles.input}
				placeholder="Поиск"
				value={inputValue}
        onChange={(e) => onChangeInput(e.target.value)}
			/>
			<img src={searchIcon} alt="search" />
		</div>
	);
};

export default Search;
