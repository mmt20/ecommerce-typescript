import { actGetCategories, cleanUpCategoriesRecords } from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { records, error, loading } = useAppSelector((state) => state.categories);
  useEffect(() => {
    dispatch(actGetCategories());

    return () => {
      dispatch(cleanUpCategoriesRecords());
    };
  }, [dispatch]);
  return { records, error, loading };
};
export default useCategories;
