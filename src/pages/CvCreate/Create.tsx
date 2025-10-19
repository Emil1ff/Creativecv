import PageMeta from "../../components/common/PageMeta";
import CvWizard from "../../components/cv/CvWizard";

export default function Create() {

  return (
    <>
      <PageMeta
        title="CV Creator - Step by Step CV Builder | Creative CV"
        description="Create your professional CV step by step with our comprehensive CV builder. Choose templates, add experience, skills, and education."
      />
      <CvWizard />
    </>
  );
}
