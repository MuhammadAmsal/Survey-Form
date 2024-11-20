import React, { useState } from "react";
import "./surveyForm.css";
import unitedNation from "../../images/unitedNation.png";
import goals from "../../images/goals.jpg";

const SurveyForm = () => {
  const surveyPages = [
    [
      {
        id: 1,
        question: "Full Name: (As per CNIC/Passport/B-Form)",
        type: "text",
        placeholder: "Name",
        required: true,
      },
      {
        id: 2,
        question: "Gender:",
        type: "dropdown",
        options: ["Male", "Female"],
        placeholder: " Gender",
        required: true,
      },
      {
        id: 3,
        question: "Mobile:",
        type: "number",
        placeholder: "Mobile",
        required: true,
      },
      {
        id: 4,
        question: "Email:",
        type: "email",
        placeholder: "Email",
        required: true,
      },
      {
        id: 5,
        question: "City Name:",
        type: "dropdown",
        options: [
          "Abottabad",
          "Bahawalpur",
          "Chiniot",
          "Dera Ghazi Khan",
          "Faisalabad",
          "Gujranwala",
          "Gujrat",
          "Hyderabad",
          "Islamabad",
          "Jhang",
          "Karachi",
          "Kasur",
          "Khuzdar",
          "Larkana",
          "Lahore",
          "Mardan",
          "Multan",
          "Muzaffargarh",
          "Nawabshah",
          "Peshawar",
          "Quetta",
          "Rahim Yar Khan",
          "Rawalpindi",
          "Sahiwal",
          "Sargodha",
          "Sheikhupura",
          "Sialkot",
          "Sukkur",
          "Vehari",
        ],
        action: "required",
        required: true,
      },
      {
        id: 6,
        question: "Name of Current School/College/University:",
        type: "text",
        placeholder: "School/College/University",
        required: true,
      },
      {
        id: 7,
        question: "What is your education level?",
        type: "dropdown",
        options: [
          "SSC-Matriculation (9th Class)",
          "SSC-Matriculation (10th Class)",
          "HSSC-Intermediate (11th Class)",
          "HSSC-Intermediate (12th Class)",
          "O levels",
          "A levels",
          "University-Undergraduate",
          "University-Graduate",
          "University-Postgraduate",
        ],
      },
      {
        id: 8,
        question: "Core subjects in  SSC - Matriculation?",
        type: "dropdown",
        options: ["Science Group", "Arts/Humanities Group", "Computer Science"],
        required: true,
      },
    ],
    [
      {
        id: 9,
        question:
          "Have you heard of the United Nations Sustainable Development Goals (SDGs)?",
        type: "single",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: 10,
        question:
          "Have you heard of the United Nations Sustainable Development Goals (SDGs)?",
        type: "single",
        options: [
          "Not familiar",
          "Slightly familiar",
          "Moderately familiar",
          "Very familiar",
          "Extremely familiar",
        ],
        required: true,
      },
      {
        id: 11,
        question: "Which SDGs do you know about? (Select all that apply)",
        type: "multiple",
        options: [
          "SDG 1: No Poverty",
          "SDG 2: Zero Hunger",
          "SDG 3: Good Health and Well-Being",
          "SDG 4: Quality Education",
          "SDG 5: Gender Equality",
          "SDG 6: Clean Water and Sanitation",
          "SDG 7: Affordable and Clean Energy",
          "SDG 8: Decent Work and Economic Growth",
          "SDG 9: Industry, Innovation and Infrastructure",
          "SDG 10: Reduced Inequalities",
          "SDG 11: Sustainable Cities and Communities",
          "SDG 12: Responsible Consumption and Production",
          "SDG 13: Climate Action",
          "SDG 14: Life Below Water",
          "SDG 15: Life on Land",
          "SDG 16: Peace, Justice, and Strong Institutions",
          "SDG 17: Partnerships for the Goal",
        ],
        required: true,
      },
      {
        id: 12,
        question:
          "Do you think learning about the SDGs is important for students?",
        type: "single",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: 13,
        question:
          "Have you ever participated in any SDG-related projects or activities (If Yes please share details)?",
        type: "text",
        placeholder: "Your answer",
        required: true,
      },
      {
        id: 14,
        question:
          "Would you be interested in participating in future SDG awareness workshops or activities?",
        type: "single",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: 15,
        question:
          "Do you have any suggestions or ideas for promoting SDG awareness in your educational institution?",
        type: "text",
        placeholder: "Your answer",
        required: true,
      },
    ],
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState({});
  const [showOtherInput, setShowOtherInput] = useState({});
  const [overview1,setOverview1]=useState(true)
  const [overview2,setOverview2]=useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false);


  const handleChange = (id, value, isChecked) => {
    setResponses((prevResponses) => {
      if (
        surveyPages[currentPage].find((q) => q.id === id)?.type === "multiple"
      ) {
        // Multiple selection: update array

        const updatedAnswers = isChecked
          ? [...(prevResponses[id] || []), value]
          : prevResponses[id]?.filter((answer) => answer !== value) || [];
        return { ...prevResponses, [id]: updatedAnswers };
      } else {
        // Single selection or dropdown: update value directly
        return { ...prevResponses, [id]: value };
      }
    });
  };

  const validatePage = () => {
    const currentQuestions = surveyPages[currentPage];
    for (let question of currentQuestions) {
      const response = responses[question.id];
      console.log(Array.isArray(response) && response.length === 0);
      if (
        question.required &&
        (response === undefined ||
          (typeof response === "string" && response.trim() === "") ||
          (Array.isArray(response) && response.length === 0))
      ) {
        alert(`Please answer the question: "${question.question}"`);
        return false;
      }
    }
    return true;
  };

  const handleDropdownChange = (id, value) => {
    if (value === "other") {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [id]: "other", // Store "other" as the selected value
      }));
      setShowOtherInput((prevState) => ({ ...prevState, [id]: true })); // Show the input field
    } else {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [id]: value, // Store the selected value
      }));
      setShowOtherInput((prevState) => ({ ...prevState, [id]: false })); // Hide the input field
    }
  };

  const goToNextPage = (e) => {
    e.preventDefault();
    if (validatePage()) {
      setCurrentPage(currentPage + 1);
      setOverview1(false)
      setOverview2(true)
    }
   
  };

  const goToPreviousPage = (e) => {
    e.preventDefault();
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setOverview1(true)
      setOverview2(false)
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    setFormSubmitted(true);
    setResponses({});
    setShowOtherInput({});
  };
  const resetForm = () => {
    setFormSubmitted(false);
    setResponses({});
    setCurrentPage(0);
    setShowOtherInput({});
    setOverview1(true)
    setOverview2(false)
  };
  
    
  return (
    <div className="survey-container">
      <img src={unitedNation} alt="united nation" className="logo" />
   
      {formSubmitted ? (
      <div className="thank-you-message">
        <h1>Thank You for Submitting the Form!</h1>
        <button onClick={resetForm} className="reset-button">
    Fill Out Another Form
  </button>
      </div>
    ) : (
      <>
      <h1 className="survey-title">UN-Sustainability Survey</h1>
      <p className="overview" style={{display:overview1? "block":"none"}} >
        This survey aims to gather insights from students at various educational
        levels (Matric, Intermediate, and University) in Pakistan regarding
        their awareness and understanding of the United Nations Sustainable
        Development Goals (SDGs). The information collected will help assess
        current knowledge, identify areas of interest, and facilitate the
        development of targeted SDG awareness programs. Your participation will
        contribute to enhancing educational initiatives focused on sustainable
        development and global awareness within the country.
        <br />
        <br />
        Please fill out this short survey, in which we will ask you about your
        knowledge, views, and attitudes that pertain to sustainability. The
        whole survey should take about 5 to 10 mins.
        <br />
        <br />
        <span style={{ fontWeight: "bold" }}>Special Note:</span>
        <br />
        Participants who complete this survey will be entered into a draw, where
        lucky winners will receive laptops as a token of appreciation for their
        contribution. Data collected from this survey will be kept confidential.
      </p>
      <p className="overview" style={{display:overview2? "block":"none"}} >
        The 2030 Agenda for Sustainable Development, adopted by all United
        Nations members in 2015, created 17 world Sustainable Development Goals
        (SDGs). The aim of these global goals is "peace and prosperity for
        people and the planet"[1][2] – while tackling climate change and working
        to preserve oceans and forests. The SDGs highlight the connections
        between the environmental, social and economic aspects of sustainable
        development. Sustainability is at the center of the SDGs, as the term
        sustainable development implies.<br/><br/>
        UN  Sustainable Development Goals
      </p>
       {overview2 &&(<img src={goals} className="logo" />)}
       
      <form onSubmit={handleSubmit} className="survey-form">
        {surveyPages[currentPage].map((q, idx) => (
          <div key={idx} className="question-container">
            <label className="question-text">
              <p>
                {q.question}
                {q.required && <span className="steric">*</span>}
              </p>
            </label>
            {q.type === "single" ? (
              <div className="options-container">
                {q.options.map((option, idx) => (
                  <div key={idx} className="option">
                    <label>
                      <input
                        type="radio"
                        name={q.id}
                        value={option}
                        onChange={() => handleChange(q.id, option)}
                        checked={responses[q.id] === option}
                        required
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ) : q.type === "multiple" ? (
              <div className="options-container">
                {q.options.map((option, idx) => (
                  <div key={idx} className="option">
                    <label>
                      <input
                        type="checkbox"
                        name={q.id}
                        value={option}
                        onChange={(e) =>
                          handleChange(q.id, option, e.target.checked)
                        }
                        checked={responses[q.id]?.includes(option) || false}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ) : q.type === "number" ? (
              <input
                className="text-input"
                placeholder={q.placeholder}
                type="number"
                onChange={(e) => handleChange(q.id, e.target.value)}
                name="question-text"
                min="11"
                value={responses[q.id] || ""}
                required
              />
            ) : q.type === "email" ? (
              <input
                type="email"
                placeholder={q.placeholder}
                className="text-input"
                onChange={(e) => handleChange(q.id, e.target.value)}
                name="question-text"
                value={responses[q.id] || ""}
                required
              />
            ) : q.type === "text" ? (
              <input
                type="text"
                placeholder={q.placeholder}
                className="text-input"
                onChange={(e) => handleChange(q.id, e.target.value)}
                name="question-text"
                value={responses[q.id] || ""}
                required
              />
            ) : showOtherInput[q.id] ? (
              <input
                type="text"
                value={responses[q.id + "_other"] || ""}
                onChange={(e) =>
                  setResponses((prevResponses) => ({
                    ...prevResponses,
                    [q.id + "_other"]: e.target.value,
                  }))
                }
                className="text-input"
              />
            ) : (
              <select
                value={responses[q.id] || ""}
                onChange={(e) => handleDropdownChange(q.id, e.target.value)}
                className="dropdown"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {q.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
            )}
          </div>
        ))}

        <div className="button-container">
          {currentPage > 0 && (
            <button
              type="button"
              onClick={goToPreviousPage}
              className="button back-button"
            >
              Back
            </button>
          )}
          {currentPage < surveyPages.length - 1 ? (
            <button
              type="button"
              onClick={goToNextPage}
              className="button next-button"
            >
              Next
            </button>
          ) : (
            <button type="submit" className="button submit-button">
              Submit
            </button>
          )}
        </div>
      </form>
      </>
      )}
    </div>
  );
};

export default SurveyForm;
