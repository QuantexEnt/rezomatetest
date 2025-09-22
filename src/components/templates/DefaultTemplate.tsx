import React from "react";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CanonicalResume } from "../../lib/normalizeresume";

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Times-Roman", fontSize: 11 },
  header: { marginBottom: 15, textAlign: "center" },
  name: { fontSize: 22, fontWeight: "bold" },
  contact: { fontSize: 9, color: "#444" },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  section: { marginBottom: 12 },
  itemHeader: { fontSize: 11, fontWeight: "bold" },
  itemDates: { fontSize: 9, color: "#555" },
  itemSummary: { marginTop: 2, fontSize: 10 },
  skillList: { flexDirection: "row", flexWrap: "wrap" },
  skillItem: { marginRight: 6, fontSize: 10 },
  debugText: { fontSize: 6, marginBottom: 10, color: "gray" },
});

const DefaultTemplate: React.FC<{ data: CanonicalResume }> = ({ data }) => {
  // Log data for debugging in browser console (won't appear in PDF)
  console.log("PDF DATA in DefaultTemplate:", data);

  const workItems = data.work || [];
  const educations = data.education || [];
  const skills = data.skills || [];
  const summary = data.summary || data.professionalSummary || "";

  return (
    <Page size="A4" style={styles.page}>
      {/* Debug: Print entire data in tiny font */}
      <Text style={styles.debugText}>{JSON.stringify(data, null, 1)}</Text>

      <View style={styles.header}>
        <Text style={styles.name}>{data.name || "No Name Provided"}</Text>
        <Text style={styles.contact}>
          {data.email || "No Email"} {data.phone ? ` | ${data.phone}` : ""}{" "}
          {data.location ? ` | ${data.location}` : ""}
        </Text>
      </View>

      {summary.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.itemSummary}>{summary}</Text>
        </View>
      )}

      {workItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {workItems.map((job, i) => (
            <View key={i} style={styles.section}>
              <Text style={styles.itemHeader}>
                {job.jobTitle || job.title || "No Job Title"}{" "}
                {job.company ? `- ${job.company}` : ""}
              </Text>
              {(job.startDate || job.endDate) && (
                <Text style={styles.itemDates}>
                  {job.startDate} {job.endDate ? `– ${job.endDate}` : ""}
                </Text>
              )}
              {job.summary && <Text style={styles.itemSummary}>{job.summary}</Text>}
            </View>
          ))}
        </View>
      )}

      {educations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {educations.map((edu, i) => (
            <View key={i} style={styles.section}>
              <Text style={styles.itemHeader}>
                {edu.degree || "No Degree"}{" "}
                {edu.institution ? `- ${edu.institution}` : ""}
              </Text>
              {(edu.startDate || edu.endDate) && (
                <Text style={styles.itemDates}>
                  {edu.startDate} {edu.endDate ? `– ${edu.endDate}` : ""}
                </Text>
              )}
              {edu.summary && <Text style={styles.itemSummary}>{edu.summary}</Text>}
            </View>
          ))}
        </View>
      )}

      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillList}>
            {skills.map((skill, i) => (
              <Text key={i} style={styles.skillItem}>
                • {skill}
              </Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  );
};

export default DefaultTemplate;
