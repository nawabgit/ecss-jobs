import { api } from "index";

import exhaustivnessCheck from "common/utils/exhaustivenessCheck";
import { Recipe } from "common/hooks/useProducer";

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

interface ListingStarted {
  type: "listing/started";
}

interface ListingFinished {
  type: "listing/finished";
  listings?: Listing[];
  error?: string;
}

type ListingActions = ListingStarted | ListingFinished;

/**
 * Retrieves job listings from API
 */
export const doGetListings = () => async (
  dispatch: React.Dispatch<ListingActions>
) => {
  dispatch({ type: "listing/started" });

  try {
    const response = await api.get<Listing[]>("/jobs/listings/");
    dispatch({ type: "listing/finished", listings: response.data });
  } catch (e) {
    dispatch({
      type: "listing/finished",
      error: "Failed to retrieve job listings",
    });
  }
};

interface ListingState {
  pending: boolean;
  listings: Listing[] | null | undefined;
  error: string | null | undefined;
}

export const defaultListingState: ListingState = {
  pending: false,
  listings: null,
  error: null,
};

export const listingRecipe: Recipe<ListingState, ListingActions> = (
  draft,
  action
) => {
  switch (action.type) {
    case "listing/started":
      draft.pending = true;
      return;

    case "listing/finished":
      draft.pending = false;
      draft.listings = action.listings;
      draft.error = action.error;
      return;

    default:
      exhaustivnessCheck(action);
  }
};
