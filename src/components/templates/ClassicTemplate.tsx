import React from "react";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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
  responsibilityText: { marginLeft: 10, fontSize: 9, marginTop: 1 },
  projectSection: { marginTop: 10 },
});

const ClassicTemplate: React.FC<{ data: any }> = ({ data }) => {
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

      {summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.itemSummary}>{summary}</Text>
        </View>
      )}

      {jobDescription && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.itemSummary}>{jobDescription}</Text>
        </View>
      )}

      {workItems.length > 0 && (
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
              {job.responsibilities && job.responsibilities.length > 0 && (
                <View>
                  {job.responsibilities.map((resp: string, i: number) => (
                    <Text key={i} style={styles.responsibilityText}>
                      • {resp}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {educations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
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
              {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                <Text>Relevant Courses: {edu.relevantCourses.join(", ")}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
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
      )}

      {(skills.technical?.length > 0 ||
        skills.soft?.length > 0 ||
        skills.languages?.length > 0) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {skills.technical?.length > 0 && <Text>Technical: {skills.technical.join(", ")}</Text>}
          {skills.soft?.length > 0 && <Text>Soft Skills: {skills.soft.join(", ")}</Text>}
          {skills.languages?.length > 0 && <Text>Languages: {skills.languages.join(", ")}</Text>}
        </View>
      )}

      {skills.projects?.length > 0 && (
        <View style={styles.projectSection}>
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
      )}
    </Page>
  );
};

export default ClassicTemplate;
