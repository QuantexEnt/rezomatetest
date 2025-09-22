import React from "react";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Arial", fontSize: 11, backgroundColor: "#f4f4f4" },
  container: { backgroundColor: "#fff", padding: 20, borderRadius: 8 },
  header: { marginBottom: 20, borderBottomWidth: 3, borderBottomColor: "#222" },
  name: { fontSize: 28, fontWeight: "900", color: "#222" },
  contact: { fontSize: 10, color: "#555", marginTop: 6 },
  section: { marginTop: 15 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#222", marginBottom: 6 },
  itemHeader: { fontSize: 12, fontWeight: "700" },
  itemDates: { fontSize: 9, fontWeight: "600", color: "#666" },
  itemSummary: { fontSize: 10, marginBottom: 8, color: "#333" },
  skillBadge: {
    backgroundColor: "#222",
    color: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 9,
    borderRadius: 4,
  },
  responsibilityText: { marginLeft: 12, fontSize: 9, marginBottom: 3, color: "#333" },
});

const SleekTemplate: React.FC<{ data: any }> = ({ data }) => {
  const work = data.workExperience || [];
  const education = data.education || [];
  const certifications = data.certifications || [];
  const skills = data.skills || { technical: [], soft: [], languages: [], projects: [] };
  const summary = data.personalInfo?.professionalSummary || "";
  const jobDescription = data.personalInfo?.jobDescription || "";

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
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

        {work.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {work.map((job: any, idx: number) => (
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
                {job.responsibilities?.length > 0 && (
                  <View>
                    {job.responsibilities.map((resp: string, i: number) => (
                      <Text key={i} style={styles.responsibilityText}>• {resp}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu: any, i: number) => (
              <View key={i} style={styles.section}>
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
                {edu.relevantCourses?.length > 0 && (
                  <Text>Relevant Courses: {edu.relevantCourses.join(", ")}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert: any, i: number) => (
              <View key={i} style={styles.section}>
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

        {(skills.technical?.length > 0 || skills.soft?.length > 0 || skills.languages?.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {skills.technical?.length > 0 && <Text style={styles.skillBadge}>Technical: {skills.technical.join(", ")}</Text>}
            {skills.soft?.length > 0 && <Text style={styles.skillBadge}>Soft: {skills.soft.join(", ")}</Text>}
            {skills.languages?.length > 0 && <Text style={styles.skillBadge}>Languages: {skills.languages.join(", ")}</Text>}
          </View>
        )}

        {skills.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {skills.projects.map((project: any, i: number) => (
              <View key={i} style={styles.section}>
                {project.name && <Text style={styles.itemHeader}>{project.name}</Text>}
                {project.link && <Text>Link: {project.link}</Text>}
                {project.description && <Text>{project.description}</Text>}
                {project.technologies && <Text>Technologies: {project.technologies}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  );
};

export default SleekTemplate;
