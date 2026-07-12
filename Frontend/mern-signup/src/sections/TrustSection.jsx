import "./TrustSection.css";

const trustItems = [
  {
    icon: "🏠",
    title: "Homemade",
    desc: "Prepared with traditional recipes",
  },
  {
    icon: "🌿",
    title: "No Oil",
    desc: "Healthy & Delicious",
  },
  {
    icon: "❌",
    title: "No Preservatives",
    desc: "100% Natural",
  },
  {
    icon: "🥭",
    title: "Freshly Prepared",
    desc: "Made after every order",
  },
  {
    icon: "🚚",
    title: "Pan India Delivery",
    desc: "Fast & Secure Shipping",
  },
  {
    icon: "⭐",
    title: "Premium Quality",
    desc: "Best Ingredients Only",
  },
];

export default function TrustSection() {
  return (
    <section className="trust-section">
      <h2 className="trust-title">Why Choose PickleBite?</h2>

      <div className="trust-grid">
        {trustItems.map((item, index) => (
          <div className="trust-card" key={index}>
            <div className="trust-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
