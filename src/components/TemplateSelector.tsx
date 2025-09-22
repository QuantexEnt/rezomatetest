import React from "react";

interface TemplateSelectorProps {
  data: any; // Full resume data (for previewing)
  setData: (newData: any) => void; // Function to update main resume data state
}

const templates = [
  {
    id: "default",
    name: "Classic",
    description: "A traditional clean template with simple fonts.",
    previewImage: "/templates/default-preview.png", // Replace with your preview image
  },
  {
    id: "modern",
    name: "Modern",
    description: "A contemporary layout with color accents.",
    previewImage: "/templates/modern-preview.png",
  },
  {
    id: "sleek",
    name: "Sleek",
    description: "A bold and compact design with dark themes.",
    previewImage: "/templates/sleek-preview.png",
  },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ data, setData }) => {
  const selectedTemplate = data.template || "default";

  const selectTemplate = (id: string) => {
    setData({ template: id });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select a Resume Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map(({ id, name, description, previewImage }) => (
          <div
            key={id}
            className={`cursor-pointer border rounded-lg p-4 shadow hover:shadow-lg transition ${
              selectedTemplate === id ? "border-blue-600 bg-blue-50" : "border-gray-300"
            }`}
            onClick={() => selectTemplate(id)}
          >
            {/* You can display preview images or minimal preview here */}
            <img
              src={previewImage}
              alt={`${name} Template Preview`}
              className="w-full h-40 object-cover rounded mb-3"
              onError={(e) => {
                // fallback if image not available
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
            {selectedTemplate === id && (
              <p className="mt-2 text-blue-700 font-semibold">Selected</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
