import useFetch from '../hooks/useFetch';
import MealCard from './MealCard';

export default function Menu() {
  const { resData, isLoading, error } = useFetch('meals');

  return (
    <div id="meals">
      {!isLoading && error && (
        <div id="fetch-error">
          <p>Something went wrong</p>
        </div>
      )}
      {!isLoading &&
        resData?.length &&
        resData.map((item) => <MealCard key={item.id} item={item} />)}
    </div>
  );
}
