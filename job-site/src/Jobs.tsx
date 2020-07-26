import React from "react";
import styled from "styled-components";
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

const GoldJob = styled(BasicJob)`
  background-color: gold;
`;

const SilverJob = styled(BasicJob)`
  background-color: silver;
`;

const BronzeJob = styled(BasicJob)`
  background-color: #b08d57;
`;

const InnerJobContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 5px;
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
  font-size: 14pt;
`;

const JobRole = styled.span`
  font-size: 16pt;
  font-weight: 500;
`;

const JobLocation = styled.span`
  margin-top: 5px;
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
  date,
}: JobListing) {
  return (
    <InnerJobContainer>
      <Image src={img} />
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
            <GoldJob tabIndex={1}>
              <JobContent
                company={"Arm"}
                img={arm}
                role={"Graduate Engineer"}
                location={"Manchester, England"}
                salary={"£34,000 - £36,000 p.a."}
                date={"7 D"}
              ></JobContent>
            </GoldJob>
            <GoldJob tabIndex={2}>
              <JobContent
                company={"TPP"}
                img={tpp}
                role={"Deployment Specialist"}
                location={"Leeds, England"}
                salary={"£26,000 - £28,000 p.a."}
                date={"15 D"}
              ></JobContent>
            </GoldJob>
            <SilverJob tabIndex={3}>
              <JobContent
                company={"FactSet"}
                img={factset}
                role={"Cloud Automation Engineer"}
                location={"London, England"}
                salary={"£30,000 - £40,000 p.a."}
                date={"2 D"}
              ></JobContent>
            </SilverJob>
            <SilverJob tabIndex={4}>
              <JobContent
                company={"Graphcore"}
                img={graphcore}
                role={"Full Stack Applications Developer"}
                location={"Bristol, England"}
                salary={"£45,000 - £50,000 p.a."}
                date={"5 D"}
              ></JobContent>
            </SilverJob>
            <BronzeJob tabIndex={5}>
              <JobContent
                company={"J.P. Morgan"}
                img={jpmorgan}
                role={"Software Engineer Internship"}
                location={"London, England"}
                salary={"£30,000 - 48,0000 p.a."}
                date={"17 D"}
              ></JobContent>
            </BronzeJob>
            <BasicJob tabIndex={5}>
              <JobContent
                company={"Company Name"}
                img={arm}
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
            company={"Arm"}
            role={"Graduate Engineer - Full Time"}
            location={"Manchester, England"}
            salary={"£34,000 - £36,000 p.a."}
            date={"Days ago D"}
            description={`Job Description




Introduction:

If you have a smartphone, digital camera, digital TV, gaming console or a smart meter at home, you’ve already used an Arm Powered product. Over 125 Arm Powered products are shipped every second and over 35 billion Arm technology-based chips have been shipped to date, making us the world’s leading semiconductor Intellectual Property (IP) supplier.

The Arm Office in Sheffield is located in the city centre, close to the universities and with excellent links to the rest of the country. Sheffield itself sits in the centre of the UK and borders the Peak District National Park, with opportunities for many outdoor activities such as hiking, mountain biking and climbing. Sheffield was ranked “the happiest city in Britain” in 2013.

We have numerous teams in the Sheffield office engaged in all the various activities required to bring Arm based systems to markets as diverse as Mobile, Automotive, Machine Learning and Server Infrastructure. These range from creating the necessary software tools required to verify systems, to architecting, designing and verifying system components, to synthesising and implementing them in silicon.

Job Requirements




Education & Qualifications

You will preferably be a graduate from a University or Engineering School, in Electronic Engineering, Software Engineering or Computer Science. Other science graduates with relevant experience will be considered.

The systems we are developing are challenging in both the area of hardware design and software, requiring an enthusiasm for science and technology as a whole. You will find that you are encouraged to find solutions wherever such a challenge presents itself so this will test your ingenuity and ability to work in an autonomous manner as well as part of a cohesive team.

Essential Skills & Experience

The essential skills for a candidate should include:
Excellent written and spoken English communication, capable of writing coherent reports, influencing and building consensus
Willingness to be flexible and accept new challenges
Strong analytical and problem-solving skills
Ability to express ideas and communicate effectively
Good inter-personal skills
Desirable Skills & Experience

The following skills would be nice to have:
Experience of Verilog, SystemVerilog or VHDL
HDL synthesis design knowledge
Perl, Python or other scripting language
Familiarity of Unix/Linux working environment
High-level programming experience in an Object Oriented language such as C/C++
Knowledge of microprocessor, ASIC systems
Assembly language programming, ideally in Arm assembler`}
          />
        </JobDetails>
      </JobsCard>
    </MainContainer>
  );
}

export default Jobs;
