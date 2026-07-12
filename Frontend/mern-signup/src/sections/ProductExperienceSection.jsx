import React from "react";

import "./ProductExperienceSection.css";

const videos = [
  {
    title: "Bitter Gourd Pickle",
    subtitle: "Best with Hot Rice & Ghee",
    video: "/assets/images/Videos/bittergourd.mp4",
  },
  {
    title: "Groundnut Chutney Powder",
    subtitle: "Perfect with Idli & Dosa, chappathi",
    video: "/assets/images/Videos/groundnut.mp4",
  },
  {
    title: "Majjige Menasinakayi",
    subtitle: "Traditional Crispy Delight",
    video: "/assets/images/Videos/majjige.mp4",
  },
  {
    title: "Copra Chutney Powder",
    subtitle: "Best with Hot Rice & Ghee chapathi",
    video: "/assets/images/Videos/copra.mp4",
  },
  {
    title: "Curry leaves",
    subtitle: " Daily Nutrition Boost hair & skin",
    video: "/assets/images/Videos/curry.mp4",
  },
  {
    title: "Huchhellu Powder",
    subtitle: "Perfect with Roti & Chappathi",
    video: "/assets/images/Videos/huchhellu.mp4",
  },
  {
    title: "Mango Pickle",
    subtitle: "Traditional Delight",
    video: "/assets/images/Videos/mango.mp4",
  },
  {
    title: "Mixveg pickles",
    subtitle: "vegetable delight",
    video: "/assets/images/Videos/mixveg.mp4",
  },
  {
    title: "Lemon Pickle",
    subtitle: "Lemon Delight",
    video: "/assets/images/Videos/lemon.mp4",
  },
  // {
  //   title: "Moringa powder",
  //   subtitle: "Immunity booster",
  //   video: "/assets/images/Videos/moringa.mp4",
  // },
  {
    title: "Samber Powder",
    subtitle: "Samber delight",
    video: "/assets/images/Videos/samber.mp4",
  },

  // {
  //   title: "Rasam pickles",
  //   subtitle: "Tomato Rasam delight",
  //   video: "/assets/images/Videos/rasam.mp4",
  // },
];

const ProductExperienceSection = () => {
  return (
    <section className="experience-section">
      <div className="experience-header">
        <span className="experience-tag">✨ Traditional Taste Experience</span>

        <h2>
          Watch How Families Enjoy
          <span> PickleBite</span>
        </h2>

        <p>
          Discover authentic homemade pickles, powders, and traditional
          delicacies through real serving moments.
        </p>
      </div>

      <div className="experience-grid">
        {videos.map((item, index) => (
          <div className="experience-card" key={index}>
            <video
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="experience-video"
            >
              <source src={item.video} type="video/mp4" />
            </video>

            <div className="experience-info">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductExperienceSection;
