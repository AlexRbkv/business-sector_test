import { useEffect } from 'react';
import styles from './table.module.scss';
import arrow from '../../assets/images/arrow.svg';
import Pagination from '../Pagination/Pagination';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { fetchPosts, loadingSelector, postsSelector, totalPostsSelector } from '../../redux/postSlice/postSlice';
import { filterSelector, searchValueSelector, setCurrentPage, setSortProperty } from '../../redux/filterSlice/filterSlice';
import { headersList, sortProperties } from '../../utils/constans';
import Spinner from '../Spinner/Spinner';
import { useParams } from 'react-router-dom';

const Table: React.FC = () => {
	const dispatch = useAppDispatch();
	const postsList = useSelector(postsSelector);
	const { sortProperty, currentPage } = useSelector(filterSelector);
	const searchValue = useSelector(searchValueSelector);
	const loading = useSelector(loadingSelector);
	const total = useSelector(totalPostsSelector);
	const { pageNumber } = useParams(); // Достаём из url номер текущей страницы

	useEffect(() => {
    if (pageNumber) { // Если в url есть параметр номера страницы
      dispatch(setCurrentPage(Number(pageNumber))); // Устанавилваем номер текущей страницы в state
		}
  }, []);

	useEffect(() => {
		// Поулчаем список постов по параметрам фильтрации и поиска
		dispatch(fetchPosts(
			{
				currentPage,
				sortProperty,
				searchValue,
			}
		));
	}, [sortProperty, currentPage, searchValue]);

	const onSortChange = (sortBy: string) => {
		// Ищим тип сортировки по имени sortBy с противоположной последовательностью либо применяем первый тип сортировки
		const sort = sortProperties.find((item) => (item.sortBy === sortBy) && (item.order ===! sortProperty.order))  || sortProperties[0];
		dispatch(setSortProperty(sort)); // Устанавилваем в state тип сортировки
	}

	// Генерируем класс для активной/неактивной стрелки в загаловке
	const setSortActiveClass = (sortBy: string) => {
		const nameOfClass = sortProperty.sortBy === sortBy ? sortProperty.order ? 'active' : '' : ''; 
		return nameOfClass;
	}


	return (
		<>
			<table className={styles.table}>
				<tbody className={styles.tableBody}>
					<tr>
						{
							headersList.map((item) => (
							<th
								key={item.name} 
								onClick={() => onSortChange(item.name)}
								className={styles.tableHeaderCell}
							>
								<p className={styles.tableHeaderCellTitle}>{item.title}</p>
								<img src={arrow} className={setSortActiveClass(item.name)} alt="sort" />
							</th>))
						}
					</tr>
					{
						loading
						?
						<tr>
							<td>
								<Spinner />
							</td>
						</tr>				
						:
						postsList.map((post) => (
							<tr key={post.id}>
								<td className={styles.tableCell}><p className={styles.tableCellContent}>{post.id}</p></td>
								<td className={styles.tableCell}><p className={styles.tableCellContent}>{post.title}</p></td>
								<td className={styles.tableCell}><p className={styles.tableCellContent}>{post.body}</p></td>
							</tr>
						))
					}
				</tbody>
			</table>
			<Pagination total={total} />
		</>
	);
};

export default Table;