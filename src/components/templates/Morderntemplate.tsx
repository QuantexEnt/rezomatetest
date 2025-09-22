import React from "react";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica", fontSize: 11 },
  header: { marginBottom: 20, borderBottomWidth: 2, borderBottomColor: "#0f4c81", paddingBottom: 10 },
  name: { fontSize: 26, fontWeight: "bold", color: "#0f4c81" },
  contact: { fontSize: 10, color: "#333", marginTop: 4 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0f4c81",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 8,
  },
  section: { marginBottom: 16 },
  itemHeader: { fontSize: 12, fontWeight: "bold", color: "#0a3d62" },
  itemDates: { fontSize: 9, color: "#666", marginBottom: 4 },
  itemSummary: { fontSize: 10, marginBottom: 6, color: "#222" },
  skillList: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
  skillItem: {
    backgroundColor: "#bbe1fa",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 10,
    color: "#0f4c81",
  },
  responsibilityText: { fontSize: 9, marginLeft: 10, marginBottom: 2 },
});

const ModernTemplate: React.FC<{ data: any }> = ({ data }) => {
  const workItems = data.workExperience || [];
  const educations = data.education || [];
  const certifications = data.certifications || [];
  const skills = data.skills || {};
  const summary = data.personalInfo?.professionalSummary || "";
  const jobDescription = data.personalInfo?.jobDescription || "";

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {data.personalInfo?.fullName && <Text style={styles.name}>{data.personalInfo.fullName}</Text>}
        {(data.personalInfo?.email || data.personalInfo?.phone || data.personalInfo?.location) && (
          <Text style={styles.contact}>
            {data.personalInfo.email && `Email: ${data.personalInfo.email} `}
            {data.personalInfo.phone && ` | Phone: ${data.personalInfo.phone} `}
            {data.personalInfo.location && ` | Location: ${data.personalInfo.location}`}
          </Text>
        )}
        {data.personalInfo?.linkedin && <Text style={styles.contact}>LinkedIn: {data.personalInfo.linkedin}</Text>}
        {data.personalInfo?.portfolio && <Text style={styles.contact}>Portfolio: {data.personalInfo.portfolio}</Text>}
      </View>

      {summary ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.itemSummary}>{summary}</Text>
        </View>
      ) : null}

      {jobDescription ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.itemSummary}>{jobDescription}</Text>
        </View>
      ) : null}

      {workItems.length ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {workItems.map((job: any, idx: number) => (
            <View key={idx} style={styles.section}>
              {(job.jobTitle || job.company) && (
                <Text style={styles.itemHeader}>
                  {job.jobTitle || "No Job Title"} {job.company ? `- ${job.company}` : ""}
                </Text>
              )}
              {(job.startDate || job.endDate) && (
                <Text style={styles.itemDates}>
                  {job.startDate} {job.endDate ? `– ${job.endDate}` : ""}
                </Text>
              )}
              {job.summary && <Text style={styles.itemSummary}>{job.summary}</Text>}
              {job.responsibilities?.length ? (
                <View>
                  {job.responsibilities.map((resp: string, i: number) => (
                    <Text key={i} style={styles.responsibilityText}>• {resp}</Text>
                  ))}
                </View>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      {educations.length ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education & Certifications</Text>
          {educations.map((edu: any, idx: number) => (
            <View key={idx} style={styles.section}>
              {(edu.degree || edu.school || edu.institution) && (
                <Text style={styles.itemHeader}>
                  {edu.degree || "No Degree"} {edu.school || edu.institution ? `- ${edu.school || edu.institution}` : ""}
                </Text>
              )}
              {(edu.startDate || edu.endDate || edu.graduationDate) && (
                <Text style={styles.itemDates}>
                  {edu.startDate || edu.graduationDate} {edu.endDate ? `– ${edu.endDate}` : ""}
                </Text>
              )}
              {edu.summary && <Text style={styles.itemSummary}>{edu.summary}</Text>}
              {edu.gpa && <Text>GPA: {edu.gpa}</Text>}
              {edu.honors && <Text>Honors: {edu.honors}</Text>}
              {edu.relevantCourses?.length ? (
                <Text>Relevant Courses: {edu.relevantCourses.join(", ")}</Text>
              ) : null}
            </View>
          ))}
          {certifications.length ? (
            <View style={styles.section}>
              <Text style={styles.itemHeader}>Certifications</Text>
              {certifications.map((cert: any, idx: number) => (
                <View key={idx} style={styles.section}>
                  {cert.name && <Text>{cert.name}</Text>}
                  <Text>
                    {cert.issuer ? `Issued by ${cert.issuer}` : "No Issuer"}{" "}
                    {cert.date ? `on ${cert.date}` : ""}
                    {cert.expirationDate ? ` (Expires ${cert.expirationDate})` : ""}
                  </Text>
                  {cert.credentialId && <Text>Credential ID: {cert.credentialId}</Text>}
                </View>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}

      {(skills.technical?.length || skills.soft?.length || skills.languages?.length) ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {skills.technical?.length ? <Text>Technical: {skills.technical.join(", ")}</Text> : null}
          {skills.soft?.length ? <Text>Soft Skills: {skills.soft.join(", ")}</Text> : null}
          {skills.languages?.length ? <Text>Languages: {skills.languages.join(", ")}</Text> : null}
        </View>
      ) : null}

      {skills.projects?.length ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {skills.projects.map((proj: any, idx: number) => (
            <View key={idx} style={styles.section}>
              {proj.name && <Text style={styles.itemHeader}>{proj.name}</Text>}
              {proj.link && <Text>Link: {proj.link}</Text>}
              {proj.description && <Text>{proj.description}</Text>}
              {proj.technologies && <Text>Technologies: {proj.technologies}</Text>}
            </View>
          ))}
        </View>
      ) : null}
    </Page>
  );
};

export default ModernTemplate;
