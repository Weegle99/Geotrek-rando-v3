import { BaseFilters, FilterValues, SelectedFilters, TrekFilters } from 'modules/filters/interface';

enum ActionKind {
  SetFilterValues = 'SET_FILTER_VALUES',
}

type Action = {
  type: ActionKind;
  payload: {
    filter: BaseFilters | TrekFilters;
    values: FilterValues;
  };
};

export const setFilterValuesAction = (
  filter: BaseFilters | TrekFilters,
  values: FilterValues,
): Action => ({
  type: ActionKind.SetFilterValues,
  payload: {
    filter,
    values,
  },
});

export const filterReducer = (state: SelectedFilters, action: Action): SelectedFilters => {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.SetFilterValues:
      return {
        ...state,
        [payload.filter]: payload.values ?? [],
      };
    default:
      return state;
  }
};
