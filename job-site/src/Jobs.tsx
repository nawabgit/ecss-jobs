import React from "react";
import styled from "styled-components";

import ReactMarkdown from "react-markdown";

import ClockTimeThreeIconOutline from "mdi-react/ClockTimeThreeOutlineIcon";
import CashIcon from "mdi-react/CashIcon";
import MapMarkerIcon from "mdi-react/MapMarkerIcon";
import ShareOutlineIcon from "mdi-react/ShareOutlineIcon";
import EmailOutlineIcon from "mdi-react/EmailOutlineIcon";

import ECSSLogo from "./common/images/ecsslogo.png";
import arm from "./common/images/arm.png";
import tpp from "./common/images/tpp.png";
import factset from "./common/images/factset.jpg";
import graphcore from "./common/images/graphcore.svg";
import jpmorgan from "./common/images/jpmorgan.jpg";

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
  margin-left: 20px;
  margin-bottom: 20px;
`;

const FilterText = styled.span`
  font-size: 12pt;
  text-align: center;
  padding-top: 3px;
`;

const FilterSelect = styled.select`
  padding: 3px;
  margin-left: 10px;
`;

const JobsContainer = styled.div`
  display: flex;
  max-height: 100%;
  padding: 4px 10px;
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
    outline: black solid 3px;
  }
`;

const SponsorStrip = styled.div`
  width: 30px;
`;

const GoldSponsorStrip = styled(SponsorStrip)`
  background-color: gold;
`;

const SilverSponsorStrip = styled(SponsorStrip)`
  background-color: silver;
`;

const BronzeSponsorStrip = styled(SponsorStrip)`
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

const JobSalary = styled.span`
  font-size: 12pt;
  font-style: italic;
  margin-top: 20px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex: 6;
  margin: 1em;
  font-size: 11pt;
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

const DetailsContactButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  width: 100px;
  height: 50px;
  padding: 0;
  border: none;
  outline: none;
  color: white;
  background-color: red;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);

  .mdi-icon {
    margin-right: 5px;
    font-size: 14pt;
  }
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

interface Job {
  company: string;
  role: string;
  location: string;
  salary: string;
  duration: string;
  date: string;
}

interface JobListing extends Job {
  img: string;
}

interface JobDescription extends Job {
  description: string;
}

function JobContent({
  company,
  img,
  role,
  location,
  salary,
  duration,
  date,
}: JobListing) {
  return (
    <InnerJobContainer>
      <Image src={img} />
      <JobContents>
        <JobHeader>
          <JobHeaderField>{company}</JobHeaderField>
          <JobDate>{date}</JobDate>
        </JobHeader>
        <JobRole>{role}</JobRole>
        <JobIcons>
          <IconContainer>
            <CashIcon />
            <IconText>{salary}</IconText>
          </IconContainer>
          <IconContainer>
            <MapMarkerIcon />
            <IconText>{location}</IconText>
          </IconContainer>
          <IconContainer>
            <ClockTimeThreeIconOutline />
            <IconText>{duration}</IconText>
          </IconContainer>
        </JobIcons>
      </JobContents>
    </InnerJobContainer>
  );
}

function JobDetailsContent({
  company,
  role,
  location,
  salary,
  duration,
  date,
  description,
}: JobDescription) {
  return (
    <DetailsContainer>
      <DetailsHeader>
        <DetailsMeta>
          <JobHeaderField>{company}</JobHeaderField>
          <JobRole>{role}</JobRole>
          <JobLocation>{date}</JobLocation>
          <DetailsIcons>
            <IconContainer>
              <CashIcon />
              <IconText>{salary}</IconText>
            </IconContainer>
            <IconContainer>
              <MapMarkerIcon />
              <IconText>{location}</IconText>
            </IconContainer>
            <IconContainer>
              <ClockTimeThreeIconOutline />
              <IconText>{duration}</IconText>
            </IconContainer>
          </DetailsIcons>
        </DetailsMeta>
        <DetailsContact>
          <DetailsContactButton>
            <ShareOutlineIcon />
            <span>Apply</span>
          </DetailsContactButton>
          <DetailsContactButton>
            <EmailOutlineIcon />
            <span>Email</span>
          </DetailsContactButton>
        </DetailsContact>
      </DetailsHeader>
      <DetailsBorder />
      <DetailsBody>
        <ReactMarkdown source={description} />
      </DetailsBody>
    </DetailsContainer>
  );
}

function Jobs() {
  return (
    <MainContainer>
      <JobsCard>
        <JobsList>
          <JobsTitle>
            <ECSSImg src={ECSSLogo} />
            <span>ECSS Job Board</span>
          </JobsTitle>
          <FilterContainer>
            <FilterText>Filters:</FilterText>
            <FilterSelect name="types" id="type">
              <option value="alljobs">All Job Types</option>
              <option value="internship">Internship</option>
              <option value="placement">Placement</option>
              <option value="parttime">Part-Time</option>
              <option value="fulltime">Full-Time</option>
            </FilterSelect>
            <FilterSelect name="location" id="location">
              <option value="alllocations">All Locations</option>
              <option value="remote">Remote</option>
              <option value="london">London</option>
              <option value="manchester">Manchester</option>
              <option value="leeds">Leeds</option>
              <option value="bristol">Bristol</option>
              <option value="other">Other</option>
            </FilterSelect>
            <FilterSelect name="time" id="time">
              <option value="alltimes">Posted Any Time</option>
              <option value="day">Last Day</option>
              <option value="3day">Last 3 Days</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </FilterSelect>
          </FilterContainer>
          <JobsContainer>
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
              <SponsorStrip />
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
              <SponsorStrip />
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
              <SponsorStrip />
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
              <SponsorStrip />
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
              <SponsorStrip />
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
              <SponsorStrip />
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
              <SponsorStrip />
            </BasicJob>
          </JobsContainer>
        </JobsList>
        <Details>
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
        </Details>
      </JobsCard>
    </MainContainer>
  );
}

export default Jobs;
