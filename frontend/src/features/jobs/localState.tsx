import { api } from "index";
import { typeLabels, locationLabels, timeLabels } from "features/jobs/Jobs";

import exhaustivnessCheck from "common/utils/exhaustivenessCheck";
import { Recipe } from "common/hooks/useProducer";
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

type ListingActions =
  | ListingStarted
  | ListingFinished
  | FilterStarted
  | FilterFinished;

const weights: { [key: string]: number } = {
  gold: 3,
  silver: 2,
  bronze: 1,
};

/**
 * Retrieves job listings from API
 */
export const doGetListings = () => async (
  dispatch: React.Dispatch<ListingActions>
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
) => async (dispatch: React.Dispatch<ListingActions>) => {
  dispatch({ type: "filter/started" });

  const rv: filterMap = {
    type: [],
    location: [],
    posted: [Infinity],
  };

  for (var item of filters) {
    var option = item.label;
    console.log(option);
    console.log(typeLabels);
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

export const listingRecipe: Recipe<ListingState, ListingActions> = (
  draft,
  action
) => {
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
      exhaustivnessCheck(action);
  }
};
