import {
  Option,
  typeFilters,
  locationFilters,
  timeFilters,
  doFilterListings,
} from "state";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";

import ECSSLogo from "common/images/ecsslogo.png";
import useSelector from "common/hooks/useSelector";
import { RootState } from "store";
import Skeleton from "react-loading-skeleton";
import JobCard from "components/JobCard";
import { useDispatch } from "react-redux";

const JobsList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  margin: 1em;
  justify-content: top;
`;

const JobsTitle = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 40px;

  @media only screen and (max-width: 768px) {
    margin-left: 5px;
    margin-bottom: 20px;

    font-size: 28px;
    font-weight: 500;
  }
`;

const ECSSImg = styled.img`
  max-height: 50px;
  margin-right: 10px;
`;

const FilterContainer = styled.div`
  display: flex;
  text-align: center;
  margin: 10px 10px 30px 10px;

  @media only screen and (max-width: 768px) {
    margin: 5px 5px 15px 5px;
  }
`;

const FilteredSelect = styled(Select)`
  flex: 1;
  text-align: left;
`;

const Flex = styled.div`
  flex: 1;
`;

const JobsContainer = styled.div`
  display: flex;
  height: 100%;
  max-height: 100%;
  padding: 2px 10px;
  overflow-y: auto;
  flex-direction: column;
`;

const BasicJob = styled.div`
  display: flex;
  margin: 0px 0px 20px;
  transition: 0.1s;
  border-bottom: solid #d3d3d3 1px;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  &:focus {
    transition: 0s;
    outline: #2684ff solid 2px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: inherit;
    cursor: inherit;
  }

  &:-webkit-any-link {
  }
`;

const selectOptions = [
  {
    label: "Type",
    options: typeFilters,
  },
  {
    label: "Location",
    options: locationFilters,
  },
  {
    label: "Posted",
    options: timeFilters,
  },
];

function JobList() {
  // Redux Hooks
  const dispatch = useDispatch();
  const { listings, pendingSorted, sortedListings } = useSelector(
    (state: RootState) => state.listings
  );

  // Filter job listings if selected filters change
  const [selectingFilters, setSelectingFilters] = useState<Option[]>([]);
  React.useEffect(() => {
    if (!pendingSorted && !!listings) {
      dispatch(doFilterListings(listings, selectingFilters));
    }
  }, [listings, selectingFilters, dispatch]);

  return (
    <JobsList>
      <JobsTitle>
        <ECSSImg src={ECSSLogo} />
        <span>ECSS Job Board</span>
      </JobsTitle>
      <FilterContainer>
        <FilteredSelect
          placeholder="Select filters..."
          isMulti
          isClearable
          onChange={(values: Option[]) =>
            setSelectingFilters(values ? values : [])
          }
          options={selectOptions}
        />
      </FilterContainer>
      <JobsContainer>
        {pendingSorted ? (
          <Flex>
            <Skeleton style={{ flex: 1, height: "100%" }} />
          </Flex>
        ) : (
          <div>
            {!!sortedListings &&
              sortedListings.map((listing) => (
                <StyledLink to={`/${listing.slug}`}>
                  <JobCard {...listing} />
                </StyledLink>
              ))}
          </div>
        )}
      </JobsContainer>
    </JobsList>
  );
}

export default JobList;
