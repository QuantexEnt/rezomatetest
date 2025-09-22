import React from "react";
import { Document, Page, Text } from "@react-pdf/renderer";

const StaticTestPDF: React.FC = () => (
  <Document>
    <Page style={{ padding: 40 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>John Doe</Text>
      <Text>Email: john.doe@example.com</Text>
      <Text>Phone: 123-456-7890</Text>
      <Text>Location: City, Country</Text>
      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Work Experience</Text>
      <Text>UX Designer - Example Corp (2020-2022)</Text>
      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Skills</Text>
      <Text>React, TypeScript, UI/UX Design</Text>
      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Education</Text>
      <Text>BSc Computer Science - Example University</Text>
    </Page>
  </Document>
);

export default StaticTestPDF;
