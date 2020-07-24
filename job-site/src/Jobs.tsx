import React from "react";
import styled from "styled-components";
import ECSSLogo from "./common/images/ecsslogo.png";

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: blue;
`;

const JobsCard = styled.div`
  display: flex;
  flex: 1;
  margin: 2em 2em;
  background-color: red;
`;

const JobsList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  margin: 5px;
  background-color: gray;
  justify-content: top;
`;

const JobsTitle = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  font-size: 40px;
  background-color: pink;
`;

const ECSSImg = styled.img`
  max-height: 40px;
  margin-right: 5px;
`;

const JobsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BasicJob = styled.div`
  display: flex;
  height: 120px;
  background-color: purple;
  margin: 5px 0px;

  &:focus {
    outline: white solid 5px;
  }
`;

const FeaturedJob = styled(BasicJob)`
  background-color: gold;
`;

const InnerJobContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 5px;
`;

const Image = styled.div`
  height: 40px;
  width: 40px;
  color: white;
  text-align: center;
  line-height: 40px;
  background-color: black;
`;

const JobContents = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 5px;
  background-color: red;
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const JobHeaderField = styled.span`
  font-size: 16pt;
  font-weight: 450;
`;

const JobRole = styled.span`
  font-size: 14pt;
`;

const JobLocation = styled.span`
  font-size: 10pt;
`;

const JobSalary = styled.span`
  font-size: 12pt;
  font-style: italic;
  margin-top: 20px;
`;
const JobDescription = styled.div`
  flex: 7;
  margin: 5px;
  background-color: green;
  justify-content: center;
`;

interface Job {
  company: string;
  role: string;
  location: string;
  salary: string;
  date: string;
}

function JobContent({ company, role, location, salary, date }: Job) {
  return (
    <InnerJobContainer>
      <Image>img</Image>
      <JobContents>
        <JobHeader>
          <JobHeaderField>{company}</JobHeaderField>
          <JobHeaderField>{date}</JobHeaderField>
        </JobHeader>
        <JobRole>{role}</JobRole>
        <JobLocation>{location}</JobLocation>
        <JobSalary>{salary}</JobSalary>
      </JobContents>
    </InnerJobContainer>
  );
}

function Jobs() {
  return (
    <MainContainer>
      <JobsCard>
        <JobsList>
          <JobsTitle>
            <ECSSImg src={ECSSLogo} />
            <span>ECSS Jobs</span>
          </JobsTitle>
          <JobsContainer>
            <FeaturedJob tabIndex={1}>
              <JobContent
                company={"Featured Company Name"}
                role={"Role"}
                location={"Location, Broader Location"}
                salary={"£ Salary1 - Salary2"}
                date={"Days ago D"}
              ></JobContent>
            </FeaturedJob>
            <FeaturedJob tabIndex={2}>
              <JobContent
                company={"Featured Company Name"}
                role={"Role"}
                location={"Location, Broader Location"}
                salary={"£ Salary1 - Salary2"}
                date={"Days ago D"}
              ></JobContent>
            </FeaturedJob>
            <BasicJob tabIndex={3}>
              <JobContent
                company={"Company Name"}
                role={"Role"}
                location={"Location, Broader Location"}
                salary={"£ Salary1 - Salary2"}
                date={"Days ago D"}
              ></JobContent>
            </BasicJob>
            <BasicJob tabIndex={4}>
              <JobContent
                company={"Company Name"}
                role={"Role"}
                location={"Location, Broader Location"}
                salary={"£ Salary1 - Salary2"}
                date={"Days ago D"}
              ></JobContent>
            </BasicJob>
            <BasicJob tabIndex={5}>
              <JobContent
                company={"Company Name"}
                role={"Role"}
                location={"Location, Broader Location"}
                salary={"£ Salary1 - Salary2"}
                date={"Days ago D"}
              ></JobContent>
            </BasicJob>
            <BasicJob tabIndex={6}>
              <JobContent
                company={"Company Name"}
                role={"Role"}
                location={"Location, Broader Location"}
                salary={"£ Salary1 - Salary2"}
                date={"Days ago D"}
              ></JobContent>
            </BasicJob>
          </JobsContainer>
        </JobsList>
        <JobDescription />
      </JobsCard>
    </MainContainer>
  );
}

export default Jobs;
