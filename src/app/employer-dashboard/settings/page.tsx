import EmployerSettingsForm from "@/features/employers/components/employer-settings-form";
import { getCurrentEmployerDetails } from "@/features/server/employers.queries";
import { redirect } from "next/navigation";

const EmployerSettings = async () => {
  const employer = await getCurrentEmployerDetails();
  if (!employer) return redirect("/login");

  console.log("currentEmployer: ", employer);
  return (
    <div>
      <EmployerSettingsForm
        initialData={{
          name: employer.employerDetails.name,
          description: employer.employerDetails.description,
          organizationType: employer.employerDetails.organizationType,
          teamSize: employer.employerDetails.teamSize,
          location: employer.employerDetails.location,
          websiteUrl: employer.employerDetails.websiteUrl,
          yearOfEstablishment:
            employer.employerDetails.yearOfEstablishment?.toString(),
        }}
      />
    </div>
  );
};

export default EmployerSettings;
