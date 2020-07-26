import React from "react";
import styled from "styled-components";
import ECSSLogo from "./common/images/ecsslogo.png";

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
  padding: 2em 10em;
  background-color: #e0e0e0;
  box-sizing: border-box;
`;

const JobsCard = styled.div`
  display: flex;
  flex: 1;
  max-height: 100%;
  background-color: #f5f5f5;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;

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
  margin-bottom: 20px;
  font-size: 40px;
`;

const ECSSImg = styled.img`
  max-height: 50px;
  margin-right: 5px;
`;

const JobsContainer = styled.div`
  display: flex;
  max-height: 100%;
  padding: 6px 10px;
  overflow-y: auto;
  flex-direction: column;
`;

const BasicJob = styled.div`
  display: flex;
  background-color: gray;
  padding: 8px;
  margin: 0px 0px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.2s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.5);
  }

  &:focus {
    outline: black solid 5px;
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
  margin-left: 10px;
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const JobHeaderField = styled.span`
  font-size: 16pt;
  font-weight: 500;
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
const JobDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 6;
  margin: 1em;
  background-color: #fafafa;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;

const JobDetailsContainer = styled.div`
  display: flex;
  max-height: 100%;
  flex-direction: column;
  flex: 1;
`;

const JobDetailsHeader = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
`;

const JobDetailsMeta = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 15px;
  padding-left: 20px;
`;

const JobDetailsContact = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  flex: 1;
  padding: 15px 10px 0px 0px;
`;

const JobContactButton = styled.button`
  margin: 0px 5px;
  width: 100px;
  height: 30px;
  padding: 0;
  border: none;
  outline: none;
  color: white;
  background-color: red;

  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;

const DetailsBorder = styled.div`
  height: 3px;
  width: 85%;
  align-self: center;
  border-bottom: solid #e0e0e0 2px;
`;

const JobDetailsBody = styled.div`
  display: flex;
  flex: 5;
  max-height: 100%;
  overflow-y: auto;
  padding: 20px 40px;
`;

interface Job {
  company: string;
  role: string;
  location: string;
  salary: string;
  date: string;
}

interface JobDescription extends Job {
  description: string;
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

function JobDescriptionContent({
  company,
  role,
  location,
  salary,
  date,
  description,
}: JobDescription) {
  return (
    <JobDetailsContainer>
      <JobDetailsHeader>
        <JobDetailsMeta>
          <JobHeaderField>{company}</JobHeaderField>
          <JobRole>{role}</JobRole>
          <JobLocation>{location}</JobLocation>
          <JobSalary>{salary}</JobSalary>
        </JobDetailsMeta>
        <JobDetailsContact>
          <JobContactButton>Apply</JobContactButton>
          <JobContactButton>Email</JobContactButton>
        </JobDetailsContact>
      </JobDetailsHeader>
      <DetailsBorder />
      <JobDetailsBody>
        <span>{description}</span>
      </JobDetailsBody>
    </JobDetailsContainer>
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
            <BasicJob tabIndex={5}>
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
        <JobDetails>
          <JobDescriptionContent
            company={"Featured Company Name"}
            role={"Role"}
            location={"Location, Broader Location"}
            salary={"£ Salary1 - Salary2"}
            date={"Days ago D"}
            description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas integer eget. Sit amet porttitor eget dolor morbi. Magna ac placerat vestibulum lectus mauris. Vitae tortor condimentum lacinia quis vel eros donec. Sed viverra tellus in hac habitasse platea dictumst. Tincidunt tortor aliquam nulla facilisi. Blandit volutpat maecenas volutpat blandit. Diam volutpat commodo sed egestas egestas. Sit amet volutpat consequat mauris nunc congue nisi. Erat imperdiet sed euismod nisi. Blandit massa enim nec dui nunc mattis enim. Malesuada bibendum arcu vitae elementum curabitur vitae.

Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Vivamus arcu felis bibendum ut tristique et. Fusce id velit ut tortor pretium viverra. Arcu odio ut sem nulla pharetra diam. Ultricies integer quis auctor elit sed vulputate mi sit amet. Ac turpis egestas integer eget aliquet nibh praesent tristique. Nulla pharetra diam sit amet. Amet porttitor eget dolor morbi non arcu risus quis. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Elit sed vulputate mi sit. Sem nulla pharetra diam sit amet nisl suscipit adipiscing. Euismod nisi porta lorem mollis aliquam ut. Aliquet sagittis id consectetur purus ut. Cras pulvinar mattis nunc sed. Consectetur libero id faucibus nisl tincidunt eget nullam non. Nunc aliquet bibendum enim facilisis. Purus in massa tempor nec feugiat nisl pretium fusce id.

Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Molestie a iaculis at erat. Volutpat diam ut venenatis tellus in metus vulputate eu. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut. Et molestie ac feugiat sed. Vitae elementum curabitur vitae nunc sed velit. Tristique senectus et netus et. Volutpat odio facilisis mauris sit amet massa. Sagittis eu volutpat odio facilisis. Potenti nullam ac tortor vitae purus faucibus ornare. Tellus molestie nunc non blandit massa. Viverra accumsan in nisl nisi scelerisque eu. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Tempor commodo ullamcorper a lacus vestibulum sed arcu non odio. Molestie nunc non blandit massa enim nec dui. Morbi non arcu risus quis varius quam quisque id diam. Diam quis enim lobortis scelerisque. Mattis molestie a iaculis at erat. Malesuada proin libero nunc consequat interdum varius sit. A diam maecenas sed enim.`}
          />
        </JobDetails>
      </JobsCard>
    </MainContainer>
  );
}

export default Jobs;
