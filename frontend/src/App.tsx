import useDispatch from "common/hooks/useDispatch";
import JobDetails from "JobDetails";
import JobList from "JobList";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { doGetListings } from "state";
import styled from "styled-components";

export const Desktop = styled.div`
  display: flex;
  flex: 1;

  @media only screen and (max-width: 768px) {
    display: none;
    flex: 0;
  }
`;

export const Mobile = styled.div`
  display: none;
  flex: 0;

  @media only screen and (max-width: 768px) {
    display: flex;
    flex: 1;
  }
`;

const MainContainer = styled.div`
  display: flex;
  max-height: 100vh;
  padding: 2em 6em;
  background-color: #e0e0e0;
  box-sizing: border-box;

  @media only screen and (max-width: 768px) {
    padding: 0em 0em;
  }
`;

const JobsCard = styled.div`
  display: flex;
  flex: 1;
  max-height: 100%;
  background-color: #f5f5f5;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(doGetListings());
  }, [dispatch]);

  return (
    <MainContainer>
      <Switch>
        <Route exact path="/">
          <Desktop>
            <JobsCard>
              <JobList />
              <JobDetails />
            </JobsCard>
          </Desktop>
          <Mobile>
            <JobsCard>
              <JobList />
            </JobsCard>
          </Mobile>
        </Route>
        <Route path="/:slug">
          <Desktop>
            <JobsCard>
              <JobList />
              <JobDetails />
            </JobsCard>
          </Desktop>
          <Mobile>
            <JobsCard>
              <JobDetails />
            </JobsCard>
          </Mobile>
        </Route>
      </Switch>
    </MainContainer>
  );
}

export default App;
