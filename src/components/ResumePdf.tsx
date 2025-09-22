import React from "react";
import { Document } from "@react-pdf/renderer";

import DefaultTemplate from "./templates/DefaultTemplate";
import ModernTemplate from "./templates/Morderntemplate";
import SleekTemplate from "./templates/Sleektemplate";

import { CanonicalResume } from "../lib/normalizeresume";

interface ResumePDFProps {
  data: CanonicalResume;
  templateId?: string;
}

const ResumePDF: React.FC<ResumePDFProps> = ({
  data,
  templateId = "default",
}) => {
  // Select template component based on templateId
  let TemplateComponent;

  switch (templateId) {
    case "modern":
      TemplateComponent = ModernTemplate;
      break;
    case "sleek":
      TemplateComponent = SleekTemplate;
      break;
    case "default":
    default:
      TemplateComponent = DefaultTemplate;
      break;
  }

  return (
    <Document>
      <TemplateComponent data={data} />
    </Document>
  );
};

export default ResumePDF;
