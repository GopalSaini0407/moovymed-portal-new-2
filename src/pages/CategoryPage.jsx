import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // Mock example data for demo
  const categoryData = {
    Images: [
      { id: 1, title: "Test Image", imageUrl: "/static/media/Icon-Bilder.d823b11a.svg" },
      { id: 2, title: "Test", imageUrl: "/static/media/Icon-Bilder.d823b11a.svg" },
    ],
    Findings: [],
  };

  const items = categoryData[categoryName] || [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <Button
        variant="text"
        color="primary"
        size="large"
        onClick={() => navigate("/dashboard")}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>

      {/* Header */}
      <div className="flex items-center space-x-4 my-6">
        <img
          src={`/static/media/Icon-${categoryName}.svg`}
          alt={categoryName}
          className="w-12 h-12"
        />
        <div>
          <h4 className="text-2xl font-bold text-gray-800 uppercase">{categoryName}</h4>
          <p className="text-gray-500">{items.length} item(s)</p>
        </div>
      </div>

      {/* Add Content Button */}
      <div className="flex justify-center mb-8">
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0..."
              alt="Add"
              className="w-5 h-5"
            />
          }
        >
          Add content
        </Button>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition"
          >
            <div
              className="rounded-2xl overflow-hidden h-40 flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.75)",
              }}
            >
              <img src={item.imageUrl} alt={item.title} className="h-32" />
            </div>
            <h6 className="text-center mt-4 text-gray-700 font-medium">{item.title}</h6>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center col-span-full text-gray-500 mt-8">
            No items found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
