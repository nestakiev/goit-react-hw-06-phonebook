import { FilterLabel, FilterInput } from "./Filter.styled";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, getFilter } from "redux/contactsSlice";

export const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);
    return <FilterLabel htmlFor="filter">Find contacts by name
    <FilterInput type='text' name="filter" onChange={e => dispatch(setFilter(e.target.value))} value={filter}/>
    </FilterLabel>
};

