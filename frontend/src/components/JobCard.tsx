import { differenceInDays } from "date-fns/esm/fp";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ClockTimeThreeIconOutline from "mdi-react/ClockTimeThreeOutlineIcon";
import CashIcon from "mdi-react/CashIcon";
import MapMarkerIcon from "mdi-react/MapMarkerIcon";
import { Listing } from "state";

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

const StyledLink = styled(Link)`
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

const Strip = styled.div`
  width: 30px;
`;

const GoldSponsorStrip = styled(Strip)`
  background-color: gold;
`;

const SilverSponsorStrip = styled(Strip)`
  background-color: silver;
`;

const BronzeSponsorStrip = styled(Strip)`
  background-color: #b08d57;
`;

const InnerJobContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 15px;
`;

const Image = styled.img`
  min-height: 40px;
  min-width: 40px;
  max-height: 40px;
  max-width: 40px;
  border: gray solid 1px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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
  font-size: 12pt;
`;

const JobDate = styled.span`
  font-size: 10pt;
`;

const JobRole = styled.span`
  font-size: 16pt;
  font-weight: 450;
  margin-top: 2px;
`;

const JobIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 50px 5px 0px;
  @media only screen and (max-width: 768px) {
    margin: 20px 10px 5px 0px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

const IconText = styled.span`
  min-width: 80px;
  margin-left: 5px;
  font-size: 10pt;
`;

interface Strip {
  sponsor_level: string | undefined;
}

function SponsorStrip({ sponsor_level }: Strip) {
  switch (sponsor_level) {
    case "bronze":
      return <BronzeSponsorStrip />;
    case "silver":
      return <SilverSponsorStrip />;
    case "gold":
      return <GoldSponsorStrip />;
    default:
      return <Strip />;
  }
}

function JobCard({
  company,
  date,
  role,
  salary_preview,
  location,
  job_type,
}: Listing) {
  const daysAgo = differenceInDays(Date.now(), new Date(date));

  return (
    <BasicJob tabIndex={1}>
      <InnerJobContainer>
        <Image src={company.image} />
        <JobContents>
          <JobHeader>
            <JobHeaderField>{company.name}</JobHeaderField>
            <JobDate>{daysAgo ? Math.abs(daysAgo) + " d" : "Today"}</JobDate>
          </JobHeader>
          <JobRole>{role}</JobRole>
          <JobIcons>
            <IconContainer>
              <CashIcon />
              <IconText>{salary_preview}</IconText>
            </IconContainer>
            <IconContainer>
              <MapMarkerIcon />
              <IconText>{location}</IconText>
            </IconContainer>
            <IconContainer>
              <ClockTimeThreeIconOutline />
              <IconText>{job_type}</IconText>
            </IconContainer>
          </JobIcons>
        </JobContents>
      </InnerJobContainer>
      <SponsorStrip sponsor_level={company.sponsor_level} />
    </BasicJob>
  );
}

export default JobCard;
