// import React from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Helmet } from "react-helmet";

// const Contact = () => {
//   return (
//     <>
//       {/* ================= SEO ================= */}

//       <Helmet>
//         <title>Contact Us | Picklebite</title>

//         <meta
//           name="description"
//           content="Contact Picklebite for bulk orders, enquiries and homemade pickle orders. Reach out to us for authentic homemade pickles."
//         />

//         <meta
//           name="keywords"
//           content="picklebite contact, pickle order enquiry, homemade pickles contact"
//         />
//       </Helmet>

//       <Navbar />

//       <div className="contact-page">
//         {/* TITLE */}

//         <div className="contact-header">
//           <h1>Contact & Enquiry</h1>
//           <p>
//             Have a question or bulk order enquiry? Reach out to us using the
//             details below.
//           </p>
//         </div>

//         {/* CONTACT INFO */}

//         <div className="contact-info">
//           <h3>Get in Touch</h3>

//           <p>
//             For{" "}
//             <b>
//               bulk orders, events, customized pickle boxes, or wholesale
//               enquiries
//             </b>
//             , feel free to contact us anytime.
//           </p>

//           <div className="contact-item">
//             📧 <b>Email:</b> picklebiteco@gmail.com
//           </div>

//           <div className="contact-item">
//             📞 <b>Phone:</b> +91 7975390038
//           </div>

//           <div className="contact-item">
//             📍 <b>Location:</b> Bengaluru, Karnataka, India
//           </div>

//           <div className="contact-item">
//             🕒 <b>Business Hours:</b> 9:00 AM – 8:00 PM
//           </div>
//         </div>
//       </div>

//       <Footer />

//       {/* ================= STYLES ================= */}

//       <style>{`

// .contact-page{
// padding:60px 20px;
// max-width:900px;
// margin:auto;
// }

// .contact-header{
// text-align:center;
// margin-bottom:40px;
// }

// .contact-header h1{
// font-size:36px;
// font-weight:800;
// background:linear-gradient(135deg, #4B0082, #6A0DAD);
// -webkit-background-clip:text;
// -webkit-text-fill-color:transparent;
// }

// .contact-header p{
// color:linear-gradient(135deg, #4B0082, #6A0DAD);
// margin-top:10px;
// }

// .contact-info{
// background: linear-gradient(135deg, #FAF7FF, #E6D6FF);
// padding:30px;
// border-radius:12px;
// box-shadow:0 4px 15px rgba(0,0,0,0.08);
// }

// .contact-info h3{
// margin-bottom:15px;
// color:#4B0082;
// }

// .contact-item{
// margin-top:12px;
// font-size:16px;
// }

// /* MOBILE */

// @media(max-width:768px){

// .contact-header h1{
// font-size:28px;
// }

// }

// `}</style>
//     </>
//   );
// };

// export default Contact;


import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>Contact Us | Picklebite</title>

        <meta
          name="description"
          content="Contact Picklebite for bulk orders, enquiries and homemade pickle orders. Reach out to us for authentic homemade pickles."
        />

        <meta
          name="keywords"
          content="picklebite contact, pickle order enquiry, homemade pickles contact"
        />
      </Helmet>

      {/* ================= PAGE WRAPPER ================= */}
      <div className="page-container">
        <Navbar />

        {/* CONTENT */}
        <div className="content-wrap">
          <div className="contact-page">
            {/* TITLE */}
            <div className="contact-header">
              <h1>Contact & Enquiry</h1>
              <p>
                Have a question or bulk order enquiry? Reach out to us using the
                details below.
              </p>
            </div>

            {/* CONTACT INFO */}
            <div className="contact-info">
              <h3>Get in Touch</h3>

              <p>
                For{" "}
                <b>
                  bulk orders, events, customized pickle boxes, or wholesale
                  enquiries
                </b>
                , feel free to contact us anytime.
              </p>

              <div className="contact-item">
                📧 <b>Email:</b> picklebiteco@gmail.com
              </div>

              <div className="contact-item">
                📞 <b>Phone:</b> +91 7975390038
              </div>

              <div className="contact-item">
                📍 <b>Location:</b> Bengaluru, Karnataka, India
              </div>

              <div className="contact-item">
                🕒 <b>Business Hours:</b> 9:00 AM – 8:00 PM
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* ================= STYLES ================= */}
      <style>{`

/* PAGE LAYOUT FIX (IMPORTANT) */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrap {
  flex: 1;
}

/* CONTACT PAGE */
.contact-page{
  padding:60px 20px;
  max-width:900px;
  margin:auto;
}

/* HEADER */
.contact-header{
  text-align:center;
  margin-bottom:40px;
}

.contact-header h1{
  font-size:36px;
  font-weight:800;
  background:linear-gradient(135deg, #4B0082, #6A0DAD);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.contact-header p{
  color:#555; /* FIXED */
  margin-top:10px;
}

/* INFO BOX */
.contact-info{
  background: linear-gradient(135deg, #FAF7FF, #E6D6FF);
  padding:30px;
  border-radius:12px;
  box-shadow:0 4px 15px rgba(0,0,0,0.08);
}

.contact-info h3{
  margin-bottom:15px;
  color:#4B0082;
}

.contact-item{
  margin-top:12px;
  font-size:16px;
}

/* MOBILE RESPONSIVE */
@media(max-width:768px){

  .contact-header h1{
    font-size:28px;
  }

  .contact-page{
    padding:40px 15px;
  }

  .contact-info{
    padding:20px;
  }

}

      `}</style>
    </>
  );
};

export default Contact;
