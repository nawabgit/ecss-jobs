import { Reducer } from "redux";
import produce from "immer";
import exhaustivenessCheck from "common/utils/exhaustivenessCheck";
import { ThunkAction } from "store";
import { differenceInDays } from "date-fns";

// Retrieve all the listings for the job board

export interface Listing {
  company: {
    name: string;
    image: string;
    sponsor_level?: string;
    website?: string;
  };
  role: string;
  date: string;
  full_salary: string;
  salary_preview: string;
  location: string;
  greater_location: string | null;
  job_type: string;
  apply_url: string;
  mailto: string;
  description: string;
  slug: string;
}

export interface Option {
  value: any;
  label: string;
}

interface ListingStarted {
  type: "listing/started";
}

interface ListingFinished {
  type: "listing/finished";
  listings?: Listing[];
  error?: string;
}

interface FilterStarted {
  type: "filter/started";
}

interface FilterFinished {
  type: "filter/finished";
  listings?: Listing[];
}

export type ListingActions =
  | ListingStarted
  | ListingFinished
  | FilterStarted
  | FilterFinished;

const weights: { [key: string]: number } = {
  gold: 3,
  silver: 2,
  bronze: 1,
};

interface ListingState {
  pendingListings: boolean;
  pendingSorted: boolean;
  listings: Listing[] | null | undefined;
  sortedListings: Listing[] | null | undefined;
  error: string | null | undefined;
}

export const defaultListingState: ListingState = {
  pendingListings: false,
  pendingSorted: false,
  listings: null,
  sortedListings: null,
  error: null,
};

// Reducers

export const listingReducer: Reducer<ListingState, ListingActions> = (
  state = defaultListingState,
  action
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "listing/started":
        draft.pendingListings = true;
        return;

      case "listing/finished":
        draft.pendingListings = false;
        draft.listings = action.listings;
        draft.error = action.error;
        return;

      case "filter/started":
        draft.pendingSorted = true;
        return;

      case "filter/finished":
        draft.pendingSorted = false;
        draft.sortedListings = action.listings;
        return;

      default:
        exhaustivenessCheck(action);
    }
  });

// Thunk Actions

/**
 * Retrieves job listings from API
 */
export const doGetListings = (): ThunkAction<Promise<void>> => async (
  dispatch,
  getState,
  { api }
) => {
  dispatch({ type: "listing/started" });

  try {
    const response = await api.get<Listing[]>("/jobs/listings/");

    // Sort by sponsor level
    // API is already sorted by date
    const listings = response.data;
    listings.sort((a, b) =>
      a.company.sponsor_level && b.company.sponsor_level
        ? weights[b.company.sponsor_level] > weights[a.company.sponsor_level]
          ? 1
          : -1
        : b.company.sponsor_level
        ? 1
        : -1
    );
    dispatch({ type: "listing/finished", listings: listings });
  } catch (e) {
    dispatch({
      type: "listing/finished",
      error: "Failed to retrieve job listings",
    });
  }
};

export const typeFilters = [
  { value: "Competition", label: "Competition" },
  { value: "Grant", label: "Grant" },
  { value: "Scholarship", label: "Scholarship" },
  { value: "Internship", label: "Internship" },
  { value: "Placement", label: "Placement" },
  { value: "Graduate", label: "Graduate" },
  { value: "Part-Time", label: "Part-Time" },
  { value: "Full-Time", label: "Full-Time" },
];
export const typeLabels = typeFilters.map((o) => o.label);

export const locationFilters = [
  { value: "Bristol", label: "Bristol" },
  { value: "Leeds", label: "Leeds" },
  { value: "London", label: "London" },
  { value: "Manchester", label: "Manchester" },
  { value: "Remote", label: "Remote" },
  { value: "Other", label: "Other" },
];
export const locationLabels = locationFilters.map((o) => o.label);

export const timeFilters = [
  { value: 0, label: "Today" },
  { value: 3, label: "Last 3 Days" },
  { value: 7, label: "Last Week" },
  { value: 30, label: "Last Month" },
];
export const timeLabels = timeFilters.map((o) => o.label);

interface filterMap {
  type: string[];
  location: string[];
  posted: number[];
}

/**
 * Filter job listings
 */
export const doFilterListings = (
  listings: Listing[],
  filters: Option[]
): ThunkAction<Promise<void>> => async (dispatch, getState, { api }) => {
  dispatch({ type: "filter/started" });

  const rv: filterMap = {
    type: [],
    location: [],
    posted: [Infinity],
  };

  for (var item of filters) {
    var option = item.label;
    if (typeLabels.includes(option)) {
      rv.type.push(option);
    } else if (locationLabels.includes(option)) {
      rv.location.push(option);
    } else if (timeLabels.includes(option)) {
      rv.posted.push(item.value);
    }
  }

  let sortedListings = listings;
  if (rv.type.length) {
    sortedListings = sortedListings.filter((listing) =>
      rv.type.includes(listing.job_type)
    );
  }
  if (rv.location.length) {
    sortedListings = sortedListings.filter((listing) =>
      rv.location.includes(listing.location)
    );
  }
  if (rv.posted.length) {
    sortedListings = sortedListings.filter(
      (listing) =>
        differenceInDays(Date.now(), new Date(listing.date)) <=
        Math.min(...rv.posted)
    );
  }

  dispatch({ type: "filter/finished", listings: sortedListings });
};
