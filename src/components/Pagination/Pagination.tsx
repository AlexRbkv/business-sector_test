import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentPageSelector, setCurrentPage } from '../../redux/filterSlice/filterSlice';
import { useAppDispatch } from '../../redux/store';
import styles from './pagination.module.scss'

type HandlePageClickType = {
    selected: number,
}

interface IPaginationProps {
	total: number,
}

const Pagination: React.FC<IPaginationProps> = ({ total }) => {
	const dispatch = useAppDispatch();
	let navigate = useNavigate();
	const currentPage = useSelector(currentPageSelector);

	const handlePageClick = (event: HandlePageClickType) => {
		dispatch(setCurrentPage(event.selected + 1)); // Устанавливаем в state текущую страницу
		navigate(`../${event.selected + 1}`, { replace: true }); // Устанавливаем номер текущей страницы в url
	}

	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel="Далее"
			onPageChange={handlePageClick}
			pageRangeDisplayed={10}
			pageCount={total / 10}
			previousLabel="Назад"
			forcePage={currentPage - 1}
		/>
	);
};

export default Pagination;
