import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import useSelector from "common/hooks/useSelector";
import { RootState } from "store";
import { Listing } from "state";

import ClockTimeThreeIconOutline from "mdi-react/ClockTimeThreeOutlineIcon";
import CashIcon from "mdi-react/CashIcon";
import MapMarkerIcon from "mdi-react/MapMarkerIcon";
import ShareOutlineIcon from "mdi-react/ShareOutlineIcon";
import EmailOutlineIcon from "mdi-react/EmailOutlineIcon";
import KeyboardBackspaceIcon from "mdi-react/KeyboardBackspaceIcon";
import ReactMarkdown from "react-markdown";

import ECSSLogo from "common/images/ecsslogo.png";
import Ripples from "react-ripples";

import { StyledLink } from "components/JobList";

const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex: 6;
  margin: 1em;
  font-size: 11pt;
  border-left: solid #e0e0e0 2px;

  @media only screen and (max-width: 768px) {
    border-left: none;
    margin: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  max-height: 100%;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 15px;
  padding-left: 20px;
`;

const Contact = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  flex: 1;
  padding: 15px 10px 0px 0px;
`;

const ContactButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  margin: 0px 10px;
  padding: 0px;
  border: none;
  outline: none;
  color: white;
  text-decoration: none;
  background-color: #d3001a;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);

  .mdi-icon {
    margin-right: 5px;
    font-size: 14pt;
  }
  .react-ripples {
    flex: 1;
    height: 100%;
  }
`;

const Ripple = styled(Ripples)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.span`
  user-select: none;
`;

const Border = styled.div`
  height: 3px;
  width: 85%;
  align-self: center;
  border-bottom: solid #e0e0e0 2px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 5;
  max-height: 100%;
  overflow-y: auto;
  padding: 20px 40px;
  margin-top: 20px;
`;

const HeaderField = styled.span`
  font-size: 12pt;
`;

const Role = styled.span`
  font-size: 16pt;
  font-weight: 450;
  margin-top: 2px;
`;

const Location = styled.span`
  margin-top: 5px;
  font-size: 10pt;
  color: #2e2e2e;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  * {
    margin: 1px 0px;
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

const ECSSImg = styled.img`
  max-height: 50px;
  margin-right: 10px;
`;

function JobDetails() {
  const { slug } = useParams<Params>();
  const { listings } = useSelector((state: RootState) => state.listings);
  const findListing = (slug: string) => {
    if (listings) {
      return listings.find((listing) => listing.slug === slug);
    } else {
      return undefined;
    }
  };

  const foundListing = findListing(slug);

  return (
    <Details>
      {!!listings && foundListing ? (
        <JobDetailsContent {...foundListing} />
      ) : (
        <FailureScreen />
      )}
    </Details>
  );
}

const MobileBackButton = styled(StyledLink)`
  display: none;

  @media only screen and (max-width: 768px) {
    display: flex;
    width: 30px;
    margin-left: 40px;
    margin-top: 20px;
  }
`;

function JobDetailsContent({
  company,
  role,
  location,
  full_salary,
  job_type,
  date,
  description,
  apply_url,
  mailto,
}: Listing) {
  return (
    <Container>
      <MobileBackButton to="/">
        <Ripple>
          <KeyboardBackspaceIcon />
        </Ripple>
      </MobileBackButton>
      <Header>
        <Meta>
          <HeaderField>{company.name}</HeaderField>
          <Role>{role}</Role>
          <Location>Posted on {new Date(date).toLocaleDateString()}</Location>
          <Icons>
            <IconContainer>
              <CashIcon />
              <IconText>{full_salary}</IconText>
            </IconContainer>
            <IconContainer>
              <MapMarkerIcon />
              <IconText>{location}</IconText>
            </IconContainer>
            <IconContainer>
              <ClockTimeThreeIconOutline />
              <IconText>{job_type}</IconText>
            </IconContainer>
          </Icons>
        </Meta>
        <Contact>
          <ContactButton href={apply_url} target="_blank">
            <Ripple>
              <ShareOutlineIcon />
              <ButtonText>Apply</ButtonText>
            </Ripple>
          </ContactButton>
          <ContactButton href={mailto}>
            <Ripple>
              <EmailOutlineIcon />
              <ButtonText>Email</ButtonText>
            </Ripple>
          </ContactButton>
        </Contact>
      </Header>
      <Border />
      <Body>
        <ReactMarkdown source={description} />
      </Body>
    </Container>
  );
}

function FailureScreen() {
  return (
    <>
      <MobileBackButton to="/">
        <Ripple>
          <KeyboardBackspaceIcon />
        </Ripple>
      </MobileBackButton>
      <div
        style={{
          display: "flex",
          alignSelf: "center",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ECSSImg
          src={ECSSLogo}
          style={{ maxHeight: "40%", marginBottom: 50 }}
        />
      </div>
    </>
  );
}

export default JobDetails;
