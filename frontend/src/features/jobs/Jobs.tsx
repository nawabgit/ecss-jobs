import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import Ripples from "react-ripples";
import Skeleton from "react-loading-skeleton";
import FadeIn from "react-fade-in";

import ReactMarkdown from "react-markdown";
import { differenceInDays } from "date-fns";

import ClockTimeThreeIconOutline from "mdi-react/ClockTimeThreeOutlineIcon";
import CashIcon from "mdi-react/CashIcon";
import MapMarkerIcon from "mdi-react/MapMarkerIcon";
import ShareOutlineIcon from "mdi-react/ShareOutlineIcon";
import EmailOutlineIcon from "mdi-react/EmailOutlineIcon";

import ECSSLogo from "common/images/ecsslogo.png";
import arm from "common/images/arm.png";
import tpp from "common/images/tpp.png";
import factset from "common/images/factset.jpg";
import graphcore from "common/images/graphcore.svg";
import jpmorgan from "common/images/jpmorgan.jpg";
import { useProducerWithThunks } from "common/hooks/useProducer";

import {
  Listing,
  doGetListings,
  listingRecipe,
  defaultListingState,
  Option,
  doFilterListings,
} from "features/jobs/localState";

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
  padding: 2em 6em;
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
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 40px;
`;

const ECSSImg = styled.img`
  max-height: 50px;
  margin-right: 10px;
`;

const FilterContainer = styled.div`
  display: flex;
  text-align: center;
  margin: 10px 10px 30px 10px;
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

const JobLocation = styled.span`
  margin-top: 5px;
  font-size: 10pt;
  color: #2e2e2e;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex: 6;
  margin: 1em;
  font-size: 11pt;
  border-left: solid #e0e0e0 2px;
`;

const JobIcons = styled.div`
  display: flex;
  margin: 20px 50px 5px 0px;
`;

const DetailsIcons = styled.div`
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
  margin-left: 5px;
  font-size: 10pt;
`;

const DetailsContainer = styled.div`
  display: flex;
  max-height: 100%;
  flex-direction: column;
  flex: 1;
`;

const DetailsHeader = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
`;

const DetailsMeta = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 15px;
  padding-left: 20px;
`;

const DetailsContact = styled.div`
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

const DetailsBorder = styled.div`
  height: 3px;
  width: 85%;
  align-self: center;
  border-bottom: solid #e0e0e0 2px;
`;

const DetailsBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 5;
  max-height: 100%;
  overflow-y: auto;
  padding: 20px 40px;
  margin-top: 20px;
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
            <JobDate>{daysAgo ? daysAgo + " d" : "Today"}</JobDate>
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
    <DetailsContainer>
      <DetailsHeader>
        <DetailsMeta>
          <JobHeaderField>{company.name}</JobHeaderField>
          <JobRole>{role}</JobRole>
          <JobLocation>
            Posted on {new Date(date).toLocaleDateString()}
          </JobLocation>
          <DetailsIcons>
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
          </DetailsIcons>
        </DetailsMeta>
        <DetailsContact>
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
        </DetailsContact>
      </DetailsHeader>
      <DetailsBorder />
      <DetailsBody>
        <ReactMarkdown source={description} />
      </DetailsBody>
    </DetailsContainer>
  );
}

const typeFilters = [
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

const locationFilters = [
  { value: "Bristol", label: "Bristol" },
  { value: "Leeds", label: "Leeds" },
  { value: "London", label: "London" },
  { value: "Manchester", label: "Manchester" },
  { value: "Remote", label: "Remote" },
  { value: "Other", label: "Other" },
];
export const locationLabels = locationFilters.map((o) => o.label);

const timeFilters = [
  { value: 0, label: "Today" },
  { value: 3, label: "Last 3 Days" },
  { value: 7, label: "Last Week" },
  { value: 30, label: "Last Month" },
];
export const timeLabels = timeFilters.map((o) => o.label);

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

function Jobs() {
  const [selected, setSelected] = useState(0);
  const [selectingFilters, setSelectingFilters] = useState<Option[]>([]);

  const [state, dispatch] = useProducerWithThunks(
    listingRecipe,
    defaultListingState
  );

  React.useEffect(() => dispatch(doGetListings()), [dispatch]);
  const { pendingSorted, listings } = state;
  React.useEffect(() => {
    if (!pendingSorted && !!listings) {
      dispatch(doFilterListings(listings, selectingFilters));
    }
  }, [listings, selectingFilters, dispatch]);
  return (
    <MainContainer>
      <JobsCard>
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
            {state.pendingSorted ? (
              <Flex>
                <Skeleton style={{ flex: 1, height: "100%" }} />
              </Flex>
            ) : (
              <div>
                {!!state.sortedListings &&
                  state.sortedListings.map((listing, index) => (
                    <div onClick={() => setSelected(index)}>
                      <JobCard {...listing} />
                    </div>
                  ))}
              </div>
            )}
            {/**
            <BasicJob tabIndex={1}>
              <JobContent
                company={"Arm"}
                img={arm}
                role={"Graduate Engineer"}
                location={"Manchester"}
                salary={"£35K - £45K"}
                duration={"Full Time"}
                date={"7d"}
              ></JobContent>
              <GoldSponsorStrip />
            </BasicJob>
            <BasicJob tabIndex={2}>
              <JobContent
                company={"TPP"}
                img={tpp}
                role={"Deployment Specialist"}
                location={"Leeds"}
                duration={"Placement"}
                salary={"£26K - £28K"}
                date={"15d"}
              ></JobContent>
              <GoldSponsorStrip />
            </BasicJob>
            <BasicJob tabIndex={3}>
              <JobContent
                company={"FactSet"}
                img={factset}
                role={"Cloud Automation Engineer"}
                location={"London"}
                salary={"£30K - £40K"}
                duration={"Placement"}
                date={"2d"}
              ></JobContent>
              <SilverSponsorStrip />
            </BasicJob>
            <BasicJob tabIndex={4}>
              <JobContent
                company={"Graphcore"}
                img={graphcore}
                role={"Full Stack Applications Developer"}
                location={"Bristol"}
                salary={"£40K - £50K"}
                duration={"Internship"}
                date={"5d"}
              ></JobContent>
              <SilverSponsorStrip />
            </BasicJob>
            <BasicJob tabIndex={5}>
              <JobContent
                company={"J.P. Morgan"}
                img={jpmorgan}
                role={"Software Engineer"}
                location={"Remote"}
                salary={"£36K - £48K"}
                duration={"Internship"}
                date={"17d"}
              ></JobContent>
              <BronzeSponsorStrip />
            </BasicJob>
            <BasicJob tabIndex={5}>
              <JobContent
                company={"Company Name"}
                img={arm}
                role={"Role"}
                location={"Location"}
                salary={"£Salary1 - Salary2"}
                duration={"Duration"}
                date={"Days ago d"}
              ></JobContent>
              <Strip />
            </BasicJob>
            <BasicJob tabIndex={5}>
              <JobContent
                company={"Company Name"}
                img={arm}
                role={"Role"}
                location={"Location"}
                salary={"£Salary1 - Salary2"}
                duration={"Duration"}
                date={"Days ago d"}
              ></JobContent>
              <Strip />
            </BasicJob>
            <BasicJob tabIndex={5}>
              <JobContent
                company={"Company Name"}
                img={arm}
                role={"Role"}
                location={"Location"}
                salary={"£Salary1 - Salary2"}
                duration={"Duration"}
                date={"Days ago d"}
              ></JobContent>
              <Strip />
            </BasicJob>
            <BasicJob tabIndex={5}>
              <JobContent
                company={"Company Name"}
                img={arm}
                role={"Role"}
                location={"Location"}
                salary={"£Salary1 - Salary2"}
                duration={"Duration"}
                date={"Days ago d"}
              ></JobContent>
              <Strip />
            </BasicJob>
            <BasicJob tabIndex={5}>
              <JobContent
                company={"Company Name"}
                img={arm}
                role={"Role"}
                location={"Location"}
                salary={"£Salary1 - Salary2"}
                duration={"Duration"}
                date={"Days ago d"}
              ></JobContent>
              <Strip />
            </BasicJob>
            <BasicJob tabIndex={5}>
              <JobContent
                company={"Company Name"}
                img={arm}
                role={"Role"}
                location={"Location"}
                salary={"£Salary1 - Salary2"}
                duration={"Duration"}
                date={"Days ago d"}
              ></JobContent>
              <Strip />
            </BasicJob>
            <BasicJob tabIndex={5}>
              <JobContent
                company={"Company Name"}
                img={arm}
                role={"Role"}
                location={"Location"}
                salary={"£Salary1 - Salary2"}
                duration={"Duration"}
                date={"Days ago d"}
              ></JobContent>
              <Strip />
            </BasicJob>
            */}
          </JobsContainer>
        </JobsList>
        <Details>
          {!!state.listings && (
            <JobDetailsContent {...state.listings[selected]} />
          )}
          {/**
          <JobDetailsContent
            company={"Arm"}
            role={"Graduate Engineer"}
            location={"Manchester, England"}
            salary={"£35,000 - £45,000 p.a."}
            date={"Posted 25/07/2020"}
            duration={"Full Time"}
            description={`#### Introduction:
If you have a smartphone, digital camera, digital TV, gaming console or a smart meter at home, you’ve already used an Arm Powered product. Over 125 Arm Powered products are shipped every second and over 35 billion Arm technology-based chips have been shipped to date, making us the world’s leading semiconductor Intellectual Property (IP) supplier.

The Arm Office in Sheffield is located in the city centre, close to the universities and with excellent links to the rest of the country. Sheffield itself sits in the centre of the UK and borders the Peak District National Park, with opportunities for many outdoor activities such as hiking, mountain biking and climbing. Sheffield was ranked “the happiest city in Britain” in 2013.

We have numerous teams in the Sheffield office engaged in all the various activities required to bring Arm based systems to markets as diverse as Mobile, Automotive, Machine Learning and Server Infrastructure. These range from creating the necessary software tools required to verify systems, to architecting, designing and verifying system components, to synthesising and implementing them in silicon.

### Job Requirements


#### Education & Qualifications

You will preferably be a graduate from a University or Engineering School, in Electronic Engineering, Software Engineering or Computer Science. Other science graduates with relevant experience will be considered.

The systems we are developing are challenging in both the area of hardware design and software, requiring an enthusiasm for science and technology as a whole. You will find that you are encouraged to find solutions wherever such a challenge presents itself so this will test your ingenuity and ability to work in an autonomous manner as well as part of a cohesive team.

#### Essential Skills & Experience

The essential skills for a candidate should include:
* Excellent written and spoken English communication, capable of writing coherent reports, influencing and building consensus
* Willingness to be flexible and accept new challenges
* Strong analytical and problem-solving skills
* Ability to express ideas and communicate effectively
* Good inter-personal skills
* Desirable Skills & Experience

The following skills would be nice to have:
* Experience of Verilog, SystemVerilog or VHDL
* HDL synthesis design knowledge
* Perl, Python or other scripting language
* Familiarity of Unix/Linux working environment
* High-level programming experience in an Object Oriented language such as C/C++
* Knowledge of microprocessor, ASIC systems
* Assembly language programming, ideally in Arm assembler`}
          />
          */}
        </Details>
      </JobsCard>
    </MainContainer>
  );
}

export default Jobs;
