import PageMeta from "../../components/common/PageMeta";
import CvWizard from "../../components/cv/CvWizard";

export default function Create() {
  return (
    <>
      <PageMeta
        title="Create Professional CV | Creative CV Builder"
        description="Build your professional CV step by step with our easy-to-use builder. Choose templates, add your information, and download as PDF."
      />
      <CvWizard />
    </>
  );
}
