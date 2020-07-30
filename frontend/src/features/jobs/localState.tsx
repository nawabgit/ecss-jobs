import { api } from "index";

import exhaustivnessCheck from "common/utils/exhaustivenessCheck";
import { Recipe } from "common/hooks/useProducer";

// Retrieve all the listings for the job board

interface Listing {
  company: string;
  image: string;
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
