  "use client";

  import { useState, useEffect } from "react";
  import Image from "next/image";
  import {
    FaUser,
    FaPhone,
    FaBuilding,
    FaChartBar,
    FaTools,
    FaArrowRight,
    FaShieldAlt,
    FaMobileAlt,
    FaHeadset,
    FaCheckCircle,
    FaQrcode,
    FaEnvelope,
    FaCopy,
    FaExternalLinkAlt,
    FaShareAlt,
    FaCalendarAlt,
    FaGlobe,
    FaPlaneDeparture,
    FaPlaneArrival,
    FaUsers,
    FaChild,
    FaUserTie,
    FaCreditCard,
    FaMoneyBillWave,
    FaInfoCircle,
    FaPassport,
    FaBirthdayCake,
    FaFlag,
    FaHome,
    FaStepForward,
    FaStepBackward,
    FaCheck,
  } from "react-icons/fa";

  export const PRIMARY_RED = "#c21f27";
  export const PRIMARY_BLUE = "#304f83";

  const COUNTRIES = [
    "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica",
    "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas",
    "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan",
    "Bolivia", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory",
    "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
    "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands",
    "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Cote D'Ivoire",
    "Croatia (Local Name: Hrvatska)", "Cuba", "Cyprus North", "Cyprus South", "Czech Republic", "Denmark", "Djibouti",
    "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
    "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana",
    "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar",
    "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau",
    "Guyana", "Guyane", "Haiti", "Heard And Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong",
    "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic Of)", "Ireland", "Isle Of Man", "Israel", "Italy",
    "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Republic Of", "Kosovo", "Kuwait",
    "Kyrgyzstan", "Lao People'S Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya",
    "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic Of", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte",
    "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montenegro", "Montserrat",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman",
    "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
    "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda",
    "Saint Kitts And Nevis", "Saint Lucia", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe",
    "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
    "South Africa", "South Georgia And The South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre And Miquelon",
    "Sudan", "Suriname", "Svalbard And Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Serbia", "South Sudan",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey",
    "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam",
    "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis And Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia",
    "Zambia", "Zimbabwe"
  ];

  interface Plan {
    name: string;
    applies: string;
    medical: string;
    baggage: string;
    liability: string;
    death: string;
    cancellation: string;
    price: string;
  }

  interface FormDataType {
    planType: string;
    firstName: string;
    otherNames: string;
    email: string;
    phone: string;
    adults: number;
    kids: number;
    seniors: number;
    fromCountry: string;
    toCountry: string;
    departureDate: string;
    returnDate: string;
    reason: string;
    selectedPlan: Plan | null;
    dob: string;
    idNumber: string;
    passport: string;
    nationality: string;
    residence: string;
    travelers: any[];
    paymentMethod: string;
    mpesaNumber: string;
  }

  export default function TravelInsuranceForm() {
    const [step, setStep] = useState(1);
    const [currentUrl, setCurrentUrl] = useState("");
    const [formData, setFormData] = useState<FormDataType>({
      planType: "Single Trip",
      firstName: "Philip",
      otherNames: "",
      email: "",
      phone: "",
      adults: 1,
      kids: 0,
      seniors: 0,
      fromCountry: "Kenya",
      toCountry: "",
      departureDate: "",
      returnDate: "",
      reason: "Holiday",
      selectedPlan: null,
      dob: "1995-01-31",
      idNumber: "37800000",
      passport: "A2424324234I",
      nationality: "Kenyan",
      residence: "Yes",
      travelers: [],
      paymentMethod: "Mpesa",
      mpesaNumber: "",
    });
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [paymentSimulated, setPaymentSimulated] = useState(false);

    // Fix: Safely get URL only on client
    useEffect(() => {
      setCurrentUrl(window.location.href);
    }, []);

    const totalSteps = 8;

    const updateFormData = <K extends keyof FormDataType>(field: K, value: FormDataType[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
      if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
      if (step > 1) setStep(step - 1);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setPaymentSimulated(true);
      }, 2000);
    };

    const copyToClipboard = () => {
      if (!currentUrl) return;
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const shareLink = () => {
      if (navigator.share && currentUrl) {
        navigator.share({
          title: "Travel Insurance",
          text: "Get your travel insurance quote",
          url: currentUrl,
        }).catch(() => {});
      }
    };

    const renderProgress = () => (
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 mx-1 rounded-full transition-colors ${
                i + 1 <= step ? "bg-red-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-gray-600 mt-3">Step {step} of {totalSteps}</p>
      </div>
    );

    const renderStep = () => {
      switch (step) {
        case 1:
          return (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <FaShieldAlt className="text-red-600" />
                What kind of Travel Insurance plan would you like?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {["Single Trip", "Annual Multi Trip"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateFormData("planType", type)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      formData.planType === type
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    // aria-pressed={formData.planType === type}
                  >
                    <h3 className="font-bold text-lg">{type}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {type === "Single Trip"
                        ? "Covers a single trip to countries where the cover applies"
                        : "Covers all trips to countries where the cover applies for a year"}
                    </p>
                    {formData.planType === type && <FaCheckCircle className="text-red-500 mt-3" />}
                  </button>
                ))}
              </div>
            </section>
          );


                case 3:
                  return (
                    <section className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <FaUsers className="text-red-600" />
                        How many people are traveling?
                      </h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2 text-center">
                          <label className="text-sm font-semibold text-gray-700">Adults (18-75 yrs)</label>
                          <input
                            type="number"
                            min="1"
                            value={formData.adults}
                            onChange={(e) => updateFormData("adults", parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                          />
                        </div>
                        <div className="space-y-2 text-center">
                          <label className="text-sm font-semibold text-gray-700">Kids (0-17 yrs)</label>
                          <input
                            type="number"
                            min="0"
                            value={formData.kids}
                            onChange={(e) => updateFormData("kids", parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                          />
                        </div>
                        <div className="space-y-2 text-center">
                          <label className="text-sm font-semibold text-gray-700">Seniors (76-85 yrs)</label>
                          <input
                            type="number"
                            min="0"
                            value={formData.seniors}
                            onChange={(e) => updateFormData("seniors", parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                          />
                        </div>
                      </div>
                    </section>
                  );
                case 4:
                  return (
                    <section className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <FaGlobe className="text-blue-600" />
                        Tell us about your trip, Mr {formData.firstName}
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">From</label>
                          <div className="relative">
                            <FaPlaneDeparture className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              value={formData.fromCountry}
                              disabled
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-100"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">To (Country of Destination)</label>
                          <div className="relative">
                            <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                              value={formData.toCountry}
                              onChange={(e) => updateFormData("toCountry", e.target.value)}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                            >
                              <option value="">Select Country</option>
                              {COUNTRIES.map((country) => (
                                <option key={country} value={country}>{country}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Departure Date</label>
                          <div className="relative">
                            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="date"
                              value={formData.departureDate}
                              onChange={(e) => updateFormData("departureDate", e.target.value)}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Return Date</label>
                          <div className="relative">
                            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="date"
                              value={formData.returnDate}
                              onChange={(e) => updateFormData("returnDate", e.target.value)}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-gray-700">Reason for Travel</label>
                          <select
                            value={formData.reason}
                            onChange={(e) => updateFormData("reason", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                          >
                            <option value="Holiday">Holiday</option>
                            <option value="Study">Study</option>
                            <option value="Business">Business</option>
                          </select>
                        </div>
                      </div>
                    </section>
                  );
                case 5:
                  const plans: Plan[] = [
                    {
                      name: "Holiday",
                      applies: "Worldwide",
                      medical: "USD 200,000 (Emergency Only)",
                      baggage: "USD 1,000 (Single item 25%)",
                      liability: "USD 100,000 (Excess $200)",
                      death: "USD 10,000",
                      cancellation: "USD 1,500 (Excess $150)",
                      price: "KSH 7,432",
                    },
                    {
                      name: "Senior",
                      applies: "Elder citizens",
                      medical: "USD 100,000 (Emergency Only)",
                      baggage: "USD 1,000 (Single item 25%)",
                      liability: "USD 75,000 (Excess $200)",
                      death: "USD 5,000",
                      cancellation: "USD 1,000 (Excess $150)",
                      price: "KSH 14,741",
                    },
                  ];
                  return (
                    <section className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <FaShieldAlt className="text-red-600" />
                        Here are plans that best suit you
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        {plans.map((plan) => (
                          <div
                            key={plan.name}
                            onClick={() => updateFormData("selectedPlan", plan)}
                            className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${
                              formData.selectedPlan?.name === plan.name ? "border-red-500 bg-red-50" : "border-gray-200"
                            }`}
                          >
                            <h3 className="font-bold text-lg">{plan.name}</h3>
                            <p className="text-sm text-gray-600">Applies to {plan.applies}</p>
                            <ul className="mt-4 space-y-2 text-sm">
                              <li>Medical Expenses: {plan.medical}</li>
                              <li>Baggage: {plan.baggage}</li>
                              <li>Personal Liability: {plan.liability}</li>
                              <li>Accidental Death: {plan.death}</li>
                              <li>Journey Cancellation: {plan.cancellation}</li>
                            </ul>
                            <p className="mt-4 font-bold text-red-600">{plan.price}</p>
                            {formData.selectedPlan?.name === plan.name && <FaCheckCircle className="text-red-500 mt-2" />}
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                case 6:
                  return (
                    <section className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <FaInfoCircle className="text-blue-600" />
                        Tell us more about yourself, Mr {formData.firstName}
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
                          <div className="relative">
                            <FaBirthdayCake className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              value={formData.dob}
                              onChange={(e) => updateFormData("dob", e.target.value)}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">ID Number</label>
                          <div className="relative">
                            <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              value={formData.idNumber}
                              onChange={(e) => updateFormData("idNumber", e.target.value)}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Passport Number</label>
                          <div className="relative">
                            <FaPassport className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              value={formData.passport}
                              onChange={(e) => updateFormData("passport", e.target.value)}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Nationality</label>
                          <div className="relative">
                            <FaFlag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              value={formData.nationality}
                              onChange={(e) => updateFormData("nationality", e.target.value)}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-gray-700">Is this your country of residence?</label>
                          <div className="flex gap-4">
                            {["Yes", "No"].map((res) => (
                              <div
                                key={res}
                                onClick={() => updateFormData("residence", res)}
                                className={`cursor-pointer px-6 py-3 rounded-xl border-2 ${formData.residence === res ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                              >
                                {res}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  );
                case 7:
                  return (
                    <section className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <FaCheck className="text-red-600" />
                        Confirm the details below
                      </h2>
                      <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                        <div>
                          <h3 className="font-bold">Traveler Details</h3>
                          <p>Full Name: Mr {formData.firstName} {formData.otherNames}</p>
                          <p>Phone Number: {formData.phone}</p>
                          <p>Email: {formData.email}</p>
                          <p>Date of Birth: {formData.dob}</p>
                        </div>
                        <div>
                          <h3 className="font-bold">Trip Details</h3>
                          <p>From: {formData.fromCountry}</p>
                          <p>To: {formData.toCountry}</p>
                          <p>Departure: {formData.departureDate}</p>
                          <p>Return: {formData.returnDate}</p>
                          <p>Reason: {formData.reason}</p>
                        </div>
                        <div>
                          <h3 className="font-bold">Plan Selected</h3>
                          <p>{formData.selectedPlan?.name} - {formData.selectedPlan?.price}</p>
                        </div>
                        <div>
                          <h3 className="font-bold">Identification</h3>
                          <p>ID: {formData.idNumber}</p>
                          <p>Passport: {formData.passport}</p>
                          <p>Nationality: {formData.nationality}</p>
                          <p>Residence: {formData.residence}</p>
                        </div>
                      </div>
                      <button className="w-full py-3 bg-blue-600 text-white rounded-xl">Add a Traveler</button>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms" className="text-sm">I have understood and agreed to the Terms & Conditions</label>
                      </div>
                    </section>
                  );
        case 2:
          return (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <FaUser className="text-blue-600" />
                Let’s get to know you
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                    First Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 outline-none transition"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="otherNames" className="text-sm font-semibold text-gray-700">
                    Other Names (Optional)
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="otherNames"
                      type="text"
                      value={formData.otherNames}
                      onChange={(e) => updateFormData("otherNames", e.target.value)}
                      placeholder="Middle name or surname"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 outline-none"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="254700000000"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 outline-none"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
              </div>
            </section>
          );

        // ... (cases 3–7 remain mostly the same, but with proper labels & placeholders)

        case 8:
          return (
            <section className="space-y-6">
              {paymentSimulated ? (
                <div className="text-center space-y-6 py-12">
                  <FaCheckCircle className="text-6xl text-green-600 mx-auto" />
                  <h2 className="text-3xl font-bold">Payment Processing Complete!</h2>
                  <p className="text-lg">Total: <strong>KES 4,938</strong></p>
                  <p>We have sent an M-Pesa prompt to <strong>0708 682 551</strong></p>
                  <p className="text-sm text-gray-600">
                    Complete the payment on your phone to receive your policy instantly.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <FaCreditCard className="text-blue-600" />
                    Payment Method
                  </h2>

                  <div className="flex gap-4 mb-6">
                    {["Mpesa", "Card"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => updateFormData("paymentMethod", method)}
                        className={`flex items-center gap-3 px-8 py-4 rounded-xl border-2 transition ${
                          formData.paymentMethod === method
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        // aria-pressed={formData.paymentMethod === method}
                      >
                        {method === "Mpesa" ? <FaMoneyBillWave /> : <FaCreditCard />}
                        {method}
                      </button>
                    ))}
                  </div>

                  <div className="text-2xl font-bold text-center my-6">
                    Total: KES 4,938
                  </div>

                  {formData.paymentMethod === "Mpesa" && (
                    <div className="space-y-3">
                      <label htmlFor="mpesaNumber" className="text-sm font-semibold">
                        M-Pesa Phone Number
                      </label>
                      <input
                        id="mpesaNumber"
                        type="tel"
                        value={formData.mpesaNumber}
                        onChange={(e) => updateFormData("mpesaNumber", e.target.value)}
                        placeholder="2547XXXXXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 outline-none"
                        required
                        aria-required="true"
                      />
                    </div>
                  )}
                </>
              )}
            </section>
          );

        default:
          return null;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        {/* Background Blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 md:w-[600px] md:h-[600px] bg-red-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 md:w-[600px] md:h-[600px] bg-blue-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative  px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            

            <div className="  bg-white p-4 md:p-8 rounded-3xl shadow-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex start-0">
                        <img
                            src="/bizsure_logo.png"
                            alt="QR code to share this travel insurance form"
                            className="h-16 md:h-28 mx-auto rounded-lg"
                        />
                    </div> 
                    <div>
                        <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold">
                            Get Your <span style={{ color: PRIMARY_RED }}>Travel Insurance</span> Today
                        </h1>
                        <p className="text-base md:text-xl text-gray-600 mt-4">Safe travels start here. Customize your plan in minutes.</p>
                    </div>
                    <div>
                      {/* i added tis empty stuff so as to add some space btn 2nd and marin  */}
                    </div>
                </div> 
            </div> 
          </div>
 
 


          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Main Form */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="h-2" style={{ background: `linear-gradient(to right, ${PRIMARY_RED}, ${PRIMARY_BLUE})` }}></div>
                <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
                  {renderProgress()}
                  {renderStep()}

                  <div className="flex justify-between items-center mt-12">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 rounded-xl border border-gray-300 flex items-center gap-2 hover:bg-gray-50 transition"
                      >
                        <FaStepBackward /> Back
                      </button>
                    )}
                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="ml-auto px-8 py-3 rounded-xl text-white flex items-center gap-2"
                        style={{ backgroundColor: PRIMARY_RED }}
                      >
                        Next <FaStepForward />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading || !formData.mpesaNumber}
                        className="ml-10 w-full py-3 md:py-5 rounded-xl md:rounded-2xl text-white font-bold text-base md:text-xl flex justify-center items-center gap-3 disabled:opacity-60"
                        style={{ backgroundColor: PRIMARY_BLUE }}
                      >
                        {loading ? "Processing Payment..." : "Pay Now"} <FaArrowRight />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
              {/* Why Choose Us */}
              <div className="bg-white rounded-3xl shadow-lg p-8 border">
                {/* <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <FaShieldAlt style={{ color: PRIMARY_RED }} />
                  Why Choose Us
                </h3>
                <ul className="space-y-4">
                  {[
                    { icon: "Worldwide", text: "Worldwide Coverage" },
                    { icon: "Medical Emergency", text: "Up to USD 200,000" },
                    { icon: "Personal Liability", text: "Peace of mind" },
                    { icon: "Baggage Protection", text: "Cover your belongings" },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-semibold">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul> */}
                {/* <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8"> */}
                              <h3 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                                <FaShieldAlt style={{ color: PRIMARY_RED }} />
                                Why Choose Us
                              </h3>
                              <ul className="space-y-4">
                                {[
                                  { icon: "✈️", text: "Worldwide Coverage", sub: "Protect anywhere" },
                                  { icon: "⚕️", text: "Medical Emergency", sub: "Up to USD 200,000" },
                                  { icon: "🛡️", text: "Personal Liability", sub: "Peace of mind" },
                                  { icon: "💼", text: "Baggage Protection", sub: "Cover your belongings" },
                                ].map((item, i) => (
                                  <li key={i} className="flex gap-4 items-start">
                                    <span className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-lg">{item.icon}</span>
                                    <div>
                                      <p className="font-bold text-gray-800 text-sm">{item.text}</p>
                                      <p className="text-xs text-gray-500">{item.sub}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
              {/* </div> */}

              {/* QR + Share */}
              <div className="bg-gradient-to-br from-zinc-900 to-slate-800 rounded-2xl p-6 text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <FaQrcode className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Scan to Share</h3>
                    <p className="text-sm opacity-80">Share this insurance form instantly</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl mb-6 text-center">
                  <img
                    src="/qr_code.png"
                    alt="QR code to share this travel insurance form"
                    className="w-48 h-48 mx-auto rounded-lg"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/10 p-3 rounded-lg">
                    <span className="text-sm truncate max-w-[50vw] md:max-w-[80vw] flex-1 mr-2">
                      {currentUrl || "Loading link..."}
                    </span>
                    {currentUrl && (
                      <a
                        href={currentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition"
                      >
                        <FaExternalLinkAlt /> Open
                      </a>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={copyToClipboard}
                      disabled={!currentUrl}
                      className="py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center gap-2 disabled:opacity-50 transition"
                    >
                      <FaCopy /> {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={shareLink}
                      disabled={!currentUrl}
                      className="py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center gap-2 disabled:opacity-50 transition"
                    >
                      <FaShareAlt /> Share
                    </button>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-red-50 rounded-2xl p-6 border border-red-200 flex items-center gap-4">
                <FaHeadset className="text-4xl text-red-600" />
                <div>
                  <p className="font-bold">Need Help?</p>
                  <p className="text-sm">Call: +254 718 917 211</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

// "use client";

// import { useState } from "react";
// import Image from "next/image"; // Optimized image handling
// import {
//   FaUser,
//   FaPhone,
//   FaBuilding,
//   FaChartBar,
//   FaTools,
//   FaArrowRight,
//   FaShieldAlt,
//   FaMobileAlt,
//   FaHeadset,
//   FaCheckCircle,
//   FaQrcode,
//   FaEnvelope,
//   FaCopy,
//   FaExternalLinkAlt,
//   FaShareAlt,
//   FaCalendarAlt,
//   FaGlobe,
//   FaPlaneDeparture,
//   FaPlaneArrival,
//   FaUsers,
//   FaChild,
//   FaUserTie,
//   FaCreditCard,
//   FaMoneyBillWave,
//   FaInfoCircle,
//   FaPassport,
//   FaBirthdayCake,
//   FaFlag,
//   FaHome,
//   FaStepForward,
//   FaStepBackward,
//   FaCheck,
// } from "react-icons/fa";

// // Color palette from user
// const PRIMARY_RED = "#c21f27";
// const PRIMARY_BLUE = "#304f83";

// // Country list from user message
// const COUNTRIES = [
//   "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica",
//   "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas",
//   "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan",
//   "Bolivia", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory",
//   "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
//   "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands",
//   "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Cote D'Ivoire",
//   "Croatia (Local Name: Hrvatska)", "Cuba", "Cyprus North", "Cyprus South", "Czech Republic", "Denmark", "Djibouti",
//   "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
//   "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana",
//   "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar",
//   "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau",
//   "Guyana", "Guyane", "Haiti", "Heard And Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong",
//   "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic Of)", "Ireland", "Isle Of Man", "Israel", "Italy",
//   "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Republic Of", "Kosovo", "Kuwait",
//   "Kyrgyzstan", "Lao People'S Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya",
//   "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic Of", "Madagascar",
//   "Malawi", "Malaysia", "Maldives", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte",
//   "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montenegro", "Montserrat",
//   "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia",
//   "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman",
//   "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
//   "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda",
//   "Saint Kitts And Nevis", "Saint Lucia", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe",
//   "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
//   "South Africa", "South Georgia And The South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre And Miquelon",
//   "Sudan", "Suriname", "Svalbard And Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Serbia", "South Sudan",
//   "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey",
//   "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
//   "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam",
//   "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis And Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia",
//   "Zambia", "Zimbabwe"
// ];

// interface Plan {
//   name: string;
//   applies: string;
//   medical: string;
//   baggage: string;
//   liability: string;
//   death: string;
//   cancellation: string;
//   price: string;
// }

// interface FormDataType {
//   planType: string;
//   firstName: string;
//   otherNames: string;
//   email: string;
//   phone: string;
//   adults: number;
//   kids: number;
//   seniors: number;
//   fromCountry: string;
//   toCountry: string;
//   departureDate: string;
//   returnDate: string;
//   reason: string;
//   selectedPlan: Plan | null;
//   dob: string;
//   idNumber: string;
//   passport: string;
//   nationality: string;
//   residence: string;
//   travelers: any[];
//   paymentMethod: string;
//   mpesaNumber: string;
// }

// export default function TravelInsuranceForm() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState<FormDataType>({
//     planType: "Single Trip",
//     firstName: "Philip",
//     otherNames: "",
//     email: "",
//     phone: "",
//     adults: 1,
//     kids: 0,
//     seniors: 0,
//     fromCountry: "Kenya",
//     toCountry: "",
//     departureDate: "",
//     returnDate: "",
//     reason: "Holiday",
//     selectedPlan: null,
//     dob: "31/01/1995",
//     idNumber: "37800000",
//     passport: "A2424324234I",
//     nationality: "Kenyan",
//     residence: "Yes",
//     travelers: [],
//     paymentMethod: "Mpesa",
//     mpesaNumber: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [paymentSimulated, setPaymentSimulated] = useState(false);

//   const totalSteps = 8;

//   const updateFormData = <K extends keyof FormDataType>(field: K, value: FormDataType[K]) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const nextStep = () => {
//     if (step < totalSteps) setStep(step + 1);
//   };

//   const prevStep = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     // Simulate submission/payment
//     setTimeout(() => {
//       setLoading(false);
//       setPaymentSimulated(true);
//     }, 2000);
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const shareLink = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: "Travel Insurance",
//         text: "Get your travel insurance quote",
//         url: window.location.href,
//       });
//     }
//   };

//   const renderProgress = () => (
//     <div className="mb-8">
//       <div className="flex justify-between items-center">
//         {Array.from({ length: totalSteps }).map((_, i) => (
//           <div key={i} className={`w-full h-1 ${i + 1 <= step ? "bg-red-600" : "bg-gray-200"}`} />
//         ))}
//       </div>
//       <p className="text-center text-sm text-gray-600 mt-2">Step {step} of {totalSteps}</p>
//     </div>
//   );

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <section className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//               <FaShieldAlt className="text-red-600" />
//               What kind of Travel Insurance plan would you like?
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               {["Single Trip", "Annual Multi Trip"].map((type) => (
//                 <div
//                   key={type}
//                   onClick={() => updateFormData("planType", type)}
//                   className={`cursor-pointer p-6 rounded-xl border-2 transition-all flex flex-col gap-2 text-center ${
//                     formData.planType === type ? "border-red-500 bg-red-50" : "border-gray-200"
//                   }`}
//                 >
//                   <h3 className="font-bold">{type}</h3>
//                   <p className="text-sm text-gray-600">
//                     {type === "Single Trip" ? "Covers a single trip to countries where the cover applies" : "Covers all trips to countries where the cover applies for a year"}
//                   </p>
//                   {formData.planType === type && <FaCheckCircle className="text-red-500 mx-auto" />}
//                 </div>
//               ))}
//             </div>
//           </section>
//         );
//       case 2:
//         return (
//           <section className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//               <FaUser className="text-blue-600" />
//               Let’s get to know you
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">First Name</label>
//                 <div className="relative">
//                   <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     value={formData.firstName}
//                     onChange={(e) => updateFormData("firstName", e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Other Names</label>
//                 <div className="relative">
//                   <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     value={formData.otherNames}
//                     onChange={(e) => updateFormData("otherNames", e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Email</label>
//                 <div className="relative">
//                   <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => updateFormData("email", e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Phone Number</label>
//                 <div className="relative">
//                   <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) => updateFormData("phone", e.target.value)}
//                     placeholder="254..."
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                   />
//                 </div>
//               </div>
//             </div>
//           </section>
//         );
//       case 3:
//         return (
//           <section className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//               <FaUsers className="text-red-600" />
//               How many people are traveling?
//             </h2>
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="space-y-2 text-center">
//                 <label className="text-sm font-semibold text-gray-700">Adults (18-75 yrs)</label>
//                 <input
//                   type="number"
//                   min="1"
//                   value={formData.adults}
//                   onChange={(e) => updateFormData("adults", parseInt(e.target.value) || 0)}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                 />
//               </div>
//               <div className="space-y-2 text-center">
//                 <label className="text-sm font-semibold text-gray-700">Kids (0-17 yrs)</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={formData.kids}
//                   onChange={(e) => updateFormData("kids", parseInt(e.target.value) || 0)}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                 />
//               </div>
//               <div className="space-y-2 text-center">
//                 <label className="text-sm font-semibold text-gray-700">Seniors (76-85 yrs)</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={formData.seniors}
//                   onChange={(e) => updateFormData("seniors", parseInt(e.target.value) || 0)}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                 />
//               </div>
//             </div>
//           </section>
//         );
//       case 4:
//         return (
//           <section className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//               <FaGlobe className="text-blue-600" />
//               Tell us about your trip, Mr {formData.firstName}
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">From</label>
//                 <div className="relative">
//                   <FaPlaneDeparture className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     value={formData.fromCountry}
//                     disabled
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-100"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">To (Country of Destination)</label>
//                 <div className="relative">
//                   <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <select
//                     value={formData.toCountry}
//                     onChange={(e) => updateFormData("toCountry", e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                   >
//                     <option value="">Select Country</option>
//                     {COUNTRIES.map((country) => (
//                       <option key={country} value={country}>{country}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Departure Date</label>
//                 <div className="relative">
//                   <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="date"
//                     value={formData.departureDate}
//                     onChange={(e) => updateFormData("departureDate", e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Return Date</label>
//                 <div className="relative">
//                   <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="date"
//                     value={formData.returnDate}
//                     onChange={(e) => updateFormData("returnDate", e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2 md:col-span-2">
//                 <label className="text-sm font-semibold text-gray-700">Reason for Travel</label>
//                 <select
//                   value={formData.reason}
//                   onChange={(e) => updateFormData("reason", e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                 >
//                   <option value="Holiday">Holiday</option>
//                   <option value="Study">Study</option>
//                   <option value="Business">Business</option>
//                 </select>
//               </div>
//             </div>
//           </section>
//         );
//       case 5:
//         const plans: Plan[] = [
//           {
//             name: "Holiday",
//             applies: "Worldwide",
//             medical: "USD 200,000 (Emergency Only)",
//             baggage: "USD 1,000 (Single item 25%)",
//             liability: "USD 100,000 (Excess $200)",
//             death: "USD 10,000",
//             cancellation: "USD 1,500 (Excess $150)",
//             price: "KSH 7,432",
//           },
//           {
//             name: "Senior",
//             applies: "Elder citizens",
//             medical: "USD 100,000 (Emergency Only)",
//             baggage: "USD 1,000 (Single item 25%)",
//             liability: "USD 75,000 (Excess $200)",
//             death: "USD 5,000",
//             cancellation: "USD 1,000 (Excess $150)",
//             price: "KSH 14,741",
//           },
//         ];
//         return (
//           <section className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//               <FaShieldAlt className="text-red-600" />
//               Here are plans that best suit you
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               {plans.map((plan) => (
//                 <div
//                   key={plan.name}
//                   onClick={() => updateFormData("selectedPlan", plan)}
//                   className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${
//                     formData.selectedPlan?.name === plan.name ? "border-red-500 bg-red-50" : "border-gray-200"
//                   }`}
//                 >
//                   <h3 className="font-bold text-lg">{plan.name}</h3>
//                   <p className="text-sm text-gray-600">Applies to {plan.applies}</p>
//                   <ul className="mt-4 space-y-2 text-sm">
//                     <li>Medical Expenses: {plan.medical}</li>
//                     <li>Baggage: {plan.baggage}</li>
//                     <li>Personal Liability: {plan.liability}</li>
//                     <li>Accidental Death: {plan.death}</li>
//                     <li>Journey Cancellation: {plan.cancellation}</li>
//                   </ul>
//                   <p className="mt-4 font-bold text-red-600">{plan.price}</p>
//                   {formData.selectedPlan?.name === plan.name && <FaCheckCircle className="text-red-500 mt-2" />}
//                 </div>
//               ))}
//             </div>
//           </section>
//         );
//       case 6:
//         return (
//           <section className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//               <FaInfoCircle className="text-blue-600" />
//               Tell us more about yourself, Mr {formData.firstName}
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
//                 <div className="relative">
//                   <FaBirthdayCake className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     value={formData.dob}
//                     onChange={(e) => updateFormData("dob", e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">ID Number</label>
//                 <div className="relative">
//                   <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     value={formData.idNumber}
//                     onChange={(e) => updateFormData("idNumber", e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Passport Number</label>
//                 <div className="relative">
//                   <FaPassport className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     value={formData.passport}
//                     onChange={(e) => updateFormData("passport", e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Nationality</label>
//                 <div className="relative">
//                   <FaFlag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     value={formData.nationality}
//                     onChange={(e) => updateFormData("nationality", e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2 md:col-span-2">
//                 <label className="text-sm font-semibold text-gray-700">Is this your country of residence?</label>
//                 <div className="flex gap-4">
//                   {["Yes", "No"].map((res) => (
//                     <div
//                       key={res}
//                       onClick={() => updateFormData("residence", res)}
//                       className={`cursor-pointer px-6 py-3 rounded-xl border-2 ${formData.residence === res ? "border-red-500 bg-red-50" : "border-gray-200"}`}
//                     >
//                       {res}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </section>
//         );
//       case 7:
//         return (
//           <section className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//               <FaCheck className="text-red-600" />
//               Confirm the details below
//             </h2>
//             <div className="bg-gray-50 p-6 rounded-xl space-y-4">
//               <div>
//                 <h3 className="font-bold">Traveler Details</h3>
//                 <p>Full Name: Mr {formData.firstName} {formData.otherNames}</p>
//                 <p>Phone Number: {formData.phone}</p>
//                 <p>Email: {formData.email}</p>
//                 <p>Date of Birth: {formData.dob}</p>
//               </div>
//               <div>
//                 <h3 className="font-bold">Trip Details</h3>
//                 <p>From: {formData.fromCountry}</p>
//                 <p>To: {formData.toCountry}</p>
//                 <p>Departure: {formData.departureDate}</p>
//                 <p>Return: {formData.returnDate}</p>
//                 <p>Reason: {formData.reason}</p>
//               </div>
//               <div>
//                 <h3 className="font-bold">Plan Selected</h3>
//                 <p>{formData.selectedPlan?.name} - {formData.selectedPlan?.price}</p>
//               </div>
//               <div>
//                 <h3 className="font-bold">Identification</h3>
//                 <p>ID: {formData.idNumber}</p>
//                 <p>Passport: {formData.passport}</p>
//                 <p>Nationality: {formData.nationality}</p>
//                 <p>Residence: {formData.residence}</p>
//               </div>
//             </div>
//             <button className="w-full py-3 bg-blue-600 text-white rounded-xl">Add a Traveler</button>
//             <div className="flex items-center gap-2">
//               <input type="checkbox" id="terms" />
//               <label htmlFor="terms" className="text-sm">I have understood and agreed to the Terms & Conditions</label>
//             </div>
//           </section>
//         );
//       case 8:
//         return (
//           <section className="space-y-6">
//             {paymentSimulated ? (
//               <div className="text-center space-y-4">
//                 <h2 className="text-2xl font-bold text-gray-800">Get your insurance cover in less than 5 minutes</h2>
//                 <p>Total KES 4,938</p>
//                 <p>MPesa payment initiated to your Number: 0708682551 has failed,</p>
//                 <p>You will receive SMS with an explanation Guiding you on how to make payment via Lipa na Mpesa option</p>
//                 <p>Thank you for choosing Old Mutual Travel Insurance</p>
//               </div>
//             ) : (
//               <>
//                 <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//                   <FaCreditCard className="text-blue-600" />
//                   Payment
//                 </h2>
//                 <div className="flex gap-4 mb-6">
//                   {["Mpesa", "Card"].map((method) => (
//                     <div
//                       key={method}
//                       onClick={() => updateFormData("paymentMethod", method)}
//                       className={`cursor-pointer px-6 py-3 rounded-xl border-2 ${formData.paymentMethod === method ? "border-red-500 bg-red-50" : "border-gray-200"}`}
//                     >
//                       {method === "Mpesa" ? <FaMoneyBillWave /> : <FaCreditCard />} {method}
//                     </div>
//                   ))}
//                 </div>
//                 <p className="font-bold">Total KES 4,938</p>
//                 {formData.paymentMethod === "Mpesa" && (
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">Enter a Valid Safaricom Number</label>
//                     <input
//                       value={formData.mpesaNumber}
//                       onChange={(e) => updateFormData("mpesaNumber", e.target.value)}
//                       placeholder="e.g. 254 700 000 000"
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
//                     />
//                     <p className="text-sm text-gray-600">If the Mpesa PIN screen doesn't show automatically on your phone, Click here</p>
//                   </div>
//                 )}
//                 {/* Add card fields if Card selected */}
//               </>
//             )}
//           </section>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
//       {/* Background Decorative Elements */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
//         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
//       </div>

//       <div className="relative mx-auto px-4 py-12 sm:px-6 lg:px-8">
//         <div className="text-center mb-16 space-y-4">
//           <div className="text-center mb-12 bg-white p-8 rounded-3xl shadow-2xl">
//             <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
//               Get Your <span style={{ color: PRIMARY_RED }}>Travel Insurance</span> Today
//             </h1>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
//               Safe travels start here. Customize your plan in minutes.
//             </p>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-12 gap-12 items-start">
//           {/* Main Form */}
//           <div className="lg:col-span-8">
//             <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//               <div className="h-2" style={{ background: `linear-gradient(to right, ${PRIMARY_RED}, ${PRIMARY_BLUE})` }}></div>
//               <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
//                 {renderProgress()}
//                 {renderStep()}
//                 <div className="flex justify-between mt-8">
//                   {step > 1 && (
//                     <button type="button" onClick={prevStep} className="px-6 py-3 rounded-xl border border-gray-200 flex items-center gap-2">
//                       <FaStepBackward /> Back
//                     </button>
//                   )}
//                   {step < totalSteps ? (
//                     <button type="button" onClick={nextStep} className="px-6 py-3 rounded-xl text-white flex items-center gap-2" style={{ backgroundColor: PRIMARY_RED }}>
//                       Next <FaStepForward />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="w-full px-6 py-5 rounded-2xl text-white font-bold text-xl flex justify-center items-center gap-3"
//                       style={{ backgroundColor: PRIMARY_BLUE }}
//                     >
//                       {loading ? "Processing..." : "Pay Now"} <FaArrowRight />
//                     </button>
//                   )}
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
//             {/* Benefits */}
//             <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
//               <h3 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
//                 <FaShieldAlt style={{ color: PRIMARY_RED }} />
//                 Why Choose Us
//               </h3>
//               <ul className="space-y-4">
//                 {[
//                   { icon: "✈️", text: "Worldwide Coverage", sub: "Protect anywhere" },
//                   { icon: "⚕️", text: "Medical Emergency", sub: "Up to USD 200,000" },
//                   { icon: "🛡️", text: "Personal Liability", sub: "Peace of mind" },
//                   { icon: "💼", text: "Baggage Protection", sub: "Cover your belongings" },
//                 ].map((item, i) => (
//                   <li key={i} className="flex gap-4 items-start">
//                     <span className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-lg">{item.icon}</span>
//                     <div>
//                       <p className="font-bold text-gray-800 text-sm">{item.text}</p>
//                       <p className="text-xs text-gray-500">{item.sub}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* QR Code */}
//             <div className="bg-gradient-to-br from-zinc-900 via-slate-800 to-zinc-900 rounded-2xl p-6 text-white shadow-2xl border border-zinc-800">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
//                   <FaQrcode className="text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold">Scan to Share</h3>
//                   <p className="text-sm opacity-80">Share this travel insurance form</p>
//                 </div>
//               </div>

//               <div className="bg-white p-4 rounded-xl mb-4 flex justify-center">
//                 <div className="relative">
//                   <img
//                     src="/qr_code.png" // Replace with actual QR if needed
//                     alt="QR Code for Travel Insurance"
//                     className="w-48 h-48 rounded-lg shadow-md"
//                   />
//                   <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: PRIMARY_RED, boxShadow: `0 0 8px ${PRIMARY_RED}` }}></div>
//                   <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: PRIMARY_BLUE, boxShadow: `0 0 8px ${PRIMARY_BLUE}` }}></div>
//                   <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: PRIMARY_BLUE, boxShadow: `0 0 8px ${PRIMARY_BLUE}` }}></div>
//                   <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: PRIMARY_RED, boxShadow: `0 0 8px ${PRIMARY_RED}` }}></div>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg">
//                   <span className="text-sm truncate flex-1 mr-2">{window.location.href}</span>
//                   <a
//                     href={window.location.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition backdrop-blur-sm"
//                   >
//                     <FaExternalLinkAlt className="text-xs" />
//                     Visit
//                   </a>
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={copyToClipboard}
//                     className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-2 rounded-lg transition backdrop-blur-sm border border-white/10"
//                   >
//                     <FaCopy className="text-sm" />
//                     {copied ? "Copied!" : "Copy Link"}
//                   </button>
//                   <button
//                     onClick={shareLink}
//                     className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-2 rounded-lg transition backdrop-blur-sm border border-white/10"
//                   >
//                     <FaShareAlt className="text-sm" />
//                     Share
//                   </button>
//                 </div>

//                 <div className="text-xs opacity-70 text-center pt-2">
//                   Scan with your phone camera or QR scanner app
//                 </div>
//               </div>
//             </div>

//             {/* Support */}
//             <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex items-center gap-4" style={{ backgroundColor: "#ffebee" }}>
//               <FaHeadset className="text-3xl" style={{ color: PRIMARY_RED }} />
//               <div>
//                 <p className="font-bold text-gray-800 text-sm">Need Help?</p>
//                 <p className="text-xs text-gray-600">Call us at +254 718 917 211</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // export default function Page() {
// //   return <h1>Hello Next.js</h1>;
// // }

// // // "use client";

// // // import { useState } from "react";
// // // import Image from "next/image"; // Optimized image handling
// // // import {
// // //   FaUser,
// // //   FaPhone,
// // //   FaBuilding,
// // //   FaChartBar,
// // //   FaTools,
// // //   FaArrowRight,
// // //   FaShieldAlt,
// // //   FaMobileAlt,
// // //   FaHeadset,
// // //   FaCheckCircle,
// // //   FaQrcode,
// // //   FaEnvelope,
// // //   FaCopy,
// // //   FaExternalLinkAlt,
// // //   FaShareAlt,
// // //   FaCalendarAlt,
// // //   FaGlobe,
// // //   FaPlaneDeparture,
// // //   FaPlaneArrival,
// // //   FaUsers,
// // //   FaChild,
// // //   FaUserTie,
// // //   FaCreditCard,
// // //   FaMoneyBillWave,
// // //   FaInfoCircle,
// // //   FaPassport,
// // //   FaBirthdayCake,
// // //   FaFlag,
// // //   FaHome,
// // //   FaStepForward,
// // //   FaStepBackward,
// // //   FaCheck,
// // // } from "react-icons/fa";

// // // // Color palette from user
// // // const PRIMARY_RED = "#c21f27";
// // // const PRIMARY_BLUE = "#304f83";

// // // // Country list from user message
// // // const COUNTRIES = [
// // //   "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica",
// // //   "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas",
// // //   "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan",
// // //   "Bolivia", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory",
// // //   "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
// // //   "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands",
// // //   "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Cote D'Ivoire",
// // //   "Croatia (Local Name: Hrvatska)", "Cuba", "Cyprus North", "Cyprus South", "Czech Republic", "Denmark", "Djibouti",
// // //   "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
// // //   "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana",
// // //   "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar",
// // //   "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau",
// // //   "Guyana", "Guyane", "Haiti", "Heard And Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong",
// // //   "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic Of)", "Ireland", "Isle Of Man", "Israel", "Italy",
// // //   "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Republic Of", "Kosovo", "Kuwait",
// // //   "Kyrgyzstan", "Lao People'S Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya",
// // //   "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic Of", "Madagascar",
// // //   "Malawi", "Malaysia", "Maldives", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte",
// // //   "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montenegro", "Montserrat",
// // //   "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia",
// // //   "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman",
// // //   "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
// // //   "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda",
// // //   "Saint Kitts And Nevis", "Saint Lucia", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe",
// // //   "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
// // //   "South Africa", "South Georgia And The South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre And Miquelon",
// // //   "Sudan", "Suriname", "Svalbard And Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Serbia", "South Sudan",
// // //   "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey",
// // //   "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
// // //   "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam",
// // //   "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis And Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia",
// // //   "Zambia", "Zimbabwe"
// // // ];

// // // export default function TravelInsuranceForm() {
// // //   const [step, setStep] = useState(1);
// // //   const [formData, setFormData] = useState({
// // //     planType: "Single Trip",
// // //     firstName: "Philip",
// // //     otherNames: "",
// // //     email: "",
// // //     phone: "",
// // //     adults: 1,
// // //     kids: 0,
// // //     seniors: 0,
// // //     fromCountry: "Kenya",
// // //     toCountry: "",
// // //     departureDate: "",
// // //     returnDate: "",
// // //     reason: "Holiday",
// // //     selectedPlan: null,
// // //     dob: "31/01/1995",
// // //     idNumber: "37800000",
// // //     passport: "A2424324234I",
// // //     nationality: "Kenyan",
// // //     residence: "Yes",
// // //     travelers: [],
// // //     paymentMethod: "Mpesa",
// // //     mpesaNumber: "",
// // //   });
// // //   const [loading, setLoading] = useState(false);
// // //   const [copied, setCopied] = useState(false);
// // //   const [paymentSimulated, setPaymentSimulated] = useState(false);

// // //   const totalSteps = 8;

// // //   const updateFormData = (field, value) => {
// // //     setFormData((prev) => ({ ...prev, [field]: value }));
// // //   };

// // //   const nextStep = () => {
// // //     if (step < totalSteps) setStep(step + 1);
// // //   };

// // //   const prevStep = () => {
// // //     if (step > 1) setStep(step - 1);
// // //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     // Simulate submission/payment
// // //     setTimeout(() => {
// // //       setLoading(false);
// // //       setPaymentSimulated(true);
// // //     }, 2000);
// // //   };

// // //   const copyToClipboard = () => {
// // //     navigator.clipboard.writeText(window.location.href);
// // //     setCopied(true);
// // //     setTimeout(() => setCopied(false), 2000);
// // //   };

// // //   const shareLink = () => {
// // //     if (navigator.share) {
// // //       navigator.share({
// // //         title: "Travel Insurance",
// // //         text: "Get your travel insurance quote",
// // //         url: window.location.href,
// // //       });
// // //     }
// // //   };

// // //   const renderProgress = () => (
// // //     <div className="mb-8">
// // //       <div className="flex justify-between items-center">
// // //         {Array.from({ length: totalSteps }).map((_, i) => (
// // //           <div key={i} className={`w-full h-1 ${i + 1 <= step ? "bg-red-600" : "bg-gray-200"}`} />
// // //         ))}
// // //       </div>
// // //       <p className="text-center text-sm text-gray-600 mt-2">Step {step} of {totalSteps}</p>
// // //     </div>
// // //   );

// // //   const renderStep = () => {
// // //     switch (step) {
// // //       case 1:
// // //         return (
// // //           <section className="space-y-6">
// // //             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
// // //               <FaShieldAlt className="text-red-600" />
// // //               What kind of Travel Insurance plan would you like?
// // //             </h2>
// // //             <div className="grid md:grid-cols-2 gap-6">
// // //               {["Single Trip", "Annual Multi Trip"].map((type) => (
// // //                 <div
// // //                   key={type}
// // //                   onClick={() => updateFormData("planType", type)}
// // //                   className={`cursor-pointer p-6 rounded-xl border-2 transition-all flex flex-col gap-2 text-center ${
// // //                     formData.planType === type ? "border-red-500 bg-red-50" : "border-gray-200"
// // //                   }`}
// // //                 >
// // //                   <h3 className="font-bold">{type}</h3>
// // //                   <p className="text-sm text-gray-600">
// // //                     {type === "Single Trip" ? "Covers a single trip to countries where the cover applies" : "Covers all trips to countries where the cover applies for a year"}
// // //                   </p>
// // //                   {formData.planType === type && <FaCheckCircle className="text-red-500 mx-auto" />}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </section>
// // //         );
// // //       case 2:
// // //         return (
// // //           <section className="space-y-6">
// // //             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
// // //               <FaUser className="text-blue-600" />
// // //               Let’s get to know you
// // //             </h2>
// // //             <div className="grid md:grid-cols-2 gap-6">
// // //               <div className="space-y-2">
// // //                 <label className="text-sm font-semibold text-gray-700">First Name</label>
// // //                 <div className="relative">
// // //                   <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                   <input
// // //                     value={formData.firstName}
// // //                     onChange={(e) => updateFormData("firstName", e.target.value)}
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <label className="text-sm font-semibold text-gray-700">Other Names</label>
// // //                 <div className="relative">
// // //                   <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                   <input
// // //                     value={formData.otherNames}
// // //                     onChange={(e) => updateFormData("otherNames", e.target.value)}
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <label className="text-sm font-semibold text-gray-700">Email</label>
// // //                 <div className="relative">
// // //                   <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                   <input
// // //                     type="email"
// // //                     value={formData.email}
// // //                     onChange={(e) => updateFormData("email", e.target.value)}
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <label className="text-sm font-semibold text-gray-700">Phone Number</label>
// // //                 <div className="relative">
// // //                   <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                   <input
// // //                     type="tel"
// // //                     value={formData.phone}
// // //                     onChange={(e) => updateFormData("phone", e.target.value)}
// // //                     placeholder="254..."
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                   />
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </section>
// // //         );
// // //       case 3:
// // //         return (
// // //           <section className="space-y-6">
// // //             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
// // //               <FaUsers className="text-red-600" />
// // //               How many people are traveling?
// // //             </h2>
// // //             <div className="grid md:grid-cols-3 gap-6">
// // //               <div className="space-y-2 text-center">
// // //                 <label className="text-sm font-semibold text-gray-700">Adults (18-75 yrs)</label>
// // //                 <input
// // //                   type="number"
// // //                   min="1"
// // //                   value={formData.adults}
// // //                   onChange={(e) => updateFormData("adults", parseInt(e.target.value))}
// // //                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                 />
// // //               </div>
// // //               <div className="space-y-2 text-center">
// // //                 <label className="text-sm font-semibold text-gray-700">Kids (0-17 yrs)</label>
// // //                 <input
// // //                   type="number"
// // //                   min="0"
// // //                   value={formData.kids}
// // //                   onChange={(e) => updateFormData("kids", parseInt(e.target.value))}
// // //                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                 />
// // //               </div>
// // //               <div className="space-y-2 text-center">
// // //                 <label className="text-sm font-semibold text-gray-700">Seniors (76-85 yrs)</label>
// // //                 <input
// // //                   type="number"
// // //                   min="0"
// // //                   value={formData.seniors}
// // //                   onChange={(e) => updateFormData("seniors", parseInt(e.target.value))}
// // //                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                 />
// // //               </div>
// // //             </div>
// // //           </section>
// // //         );
// // //       case 4:
// // //         return (
// // //           <section className="space-y-6">
// // //             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
// // //               <FaGlobe className="text-blue-600" />
// // //               Tell us about your trip, Mr {formData.firstName}
// // //             </h2>
// // //             <div className="grid md:grid-cols-2 gap-6">
// // //               <div className="space-y-2">
// // //                 <label className="text-sm font-semibold text-gray-700">From</label>
// // //                 <div className="relative">
// // //                   <FaPlaneDeparture className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                   <input
// // //                     value={formData.fromCountry}
// // //                     disabled
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-100"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <label className="text-sm font-semibold text-gray-700">To (Country of Destination)</label>
// // //                 <div className="relative">
// // //                   <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                   <select
// // //                     value={formData.toCountry}
// // //                     onChange={(e) => updateFormData("toCountry", e.target.value)}
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                   >
// // //                     <option value="">Select Country</option>
// // //                     {COUNTRIES.map((country) => (
// // //                       <option key={country} value={country}>{country}</option>
// // //                     ))}
// // //                   </select>
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <label className="text-sm font-semibold text-gray-700">Departure Date</label>
// // //                 <div className="relative">
// // //                   <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                   <input
// // //                     type="date"
// // //                     value={formData.departureDate}
// // //                     onChange={(e) => updateFormData("departureDate", e.target.value)}
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <label className="text-sm font-semibold text-gray-700">Return Date</label>
// // //                 <div className="relative">
// // //                   <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                   <input
// // //                     type="date"
// // //                     value={formData.returnDate}
// // //                     onChange={(e) => updateFormData("returnDate", e.target.value)}
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-2 md:col-span-2">
// // //                 <label className="text-sm font-semibold text-gray-700">Reason for Travel</label>
// // //                 <select
// // //                   value={formData.reason}
// // //                   onChange={(e) => updateFormData("reason", e.target.value)}
// // //                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                 >
// // //                   <option value="Holiday">Holiday</option>
// // //                   <option value="Study">Study</option>
// // //                   <option value="Business">Business</option>
// // //                 </select>
// // //               </div>
// // //             </div>
// // //           </section>
// // //         );
// // //       case 5:
// // //         const plans = [
// // //           {
// // //             name: "Holiday",
// // //             applies: "Worldwide",
// // //             medical: "USD 200,000 (Emergency Only)",
// // //             baggage: "USD 1,000 (Single item 25%)",
// // //             liability: "USD 100,000 (Excess $200)",
// // //             death: "USD 10,000",
// // //             cancellation: "USD 1,500 (Excess $150)",
// // //             price: "KSH 7,432",
// // //           },
// // //           {
// // //             name: "Senior",
// // //             applies: "Elder citizens",
// // //             medical: "USD 100,000 (Emergency Only)",
// // //             baggage: "USD 1,000 (Single item 25%)",
// // //             liability: "USD 75,000 (Excess $200)",
// // //             death: "USD 5,000",
// // //             cancellation: "USD 1,000 (Excess $150)",
// // //             price: "KSH 14,741",
// // //           },
// // //         ];
// // //         return (
// // //           <section className="space-y-6">
// // //             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
// // //               <FaShieldAlt className="text-red-600" />
// // //               Here are plans that best suit you
// // //             </h2>
// // //             <div className="grid md:grid-cols-2 gap-6">
// // //               {plans.map((plan) => (
// // //                 <div
// // //                   key={plan.name}
// // //                   onClick={() => updateFormData("selectedPlan", plan)}
// // //                   className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${
// // //                     formData.selectedPlan?.name === plan.name ? "border-red-500 bg-red-50" : "border-gray-200"
// // //                   }`}
// // //                 >
// // //                   <h3 className="font-bold text-lg">{plan.name}</h3>
// // //                   <p className="text-sm text-gray-600">Applies to {plan.applies}</p>
// // //                   <ul className="mt-4 space-y-2 text-sm">
// // //                     <li>Medical Expenses: {plan.medical}</li>
// // //                     <li>Baggage: {plan.baggage}</li>
// // //                     <li>Personal Liability: {plan.liability}</li>
// // //                     <li>Accidental Death: {plan.death}</li>
// // //                     <li>Journey Cancellation: {plan.cancellation}</li>
// // //                   </ul>
// // //                   <p className="mt-4 font-bold text-red-600">{plan.price}</p>
// // //                   {formData.selectedPlan?.name === plan.name && <FaCheckCircle className="text-red-500 mt-2" />}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </section>
// // //         );
// // //       case 6:
// // //         return (
// // //           <section className="space-y-6">
// // //             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
// // //               <FaInfoCircle className="text-blue-600" />
// // //               Tell us more about yourself, Mr {formData.firstName}
// // //             </h2>
// // //             <div className="grid md:grid-cols-2 gap-6">
// // //               <div className="space-y-2">
// // //                 <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
// // //                 <div className="relative">
// // //                   <FaBirthdayCake className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                   <input
// // //                     value={formData.dob}
// // //                     onChange={(e) => updateFormData("dob", e.target.value)}
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <label className="text-sm font-semibold text-gray-700">ID Number</label>
// // //                 <div className="relative">
// // //                   <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                   <input
// // //                     value={formData.idNumber}
// // //                     onChange={(e) => updateFormData("idNumber", e.target.value)}
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <label className="text-sm font-semibold text-gray-700">Passport Number</label>
// // //                 <div className="relative">
// // //                   <FaPassport className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                   <input
// // //                     value={formData.passport}
// // //                     onChange={(e) => updateFormData("passport", e.target.value)}
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <label className="text-sm font-semibold text-gray-700">Nationality</label>
// // //                 <div className="relative">
// // //                   <FaFlag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                   <input
// // //                     value={formData.nationality}
// // //                     onChange={(e) => updateFormData("nationality", e.target.value)}
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-2 md:col-span-2">
// // //                 <label className="text-sm font-semibold text-gray-700">Is this your country of residence?</label>
// // //                 <div className="flex gap-4">
// // //                   {["Yes", "No"].map((res) => (
// // //                     <div
// // //                       key={res}
// // //                       onClick={() => updateFormData("residence", res)}
// // //                       className={`cursor-pointer px-6 py-3 rounded-xl border-2 ${formData.residence === res ? "border-red-500 bg-red-50" : "border-gray-200"}`}
// // //                     >
// // //                       {res}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </section>
// // //         );
// // //       case 7:
// // //         return (
// // //           <section className="space-y-6">
// // //             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
// // //               <FaCheck className="text-red-600" />
// // //               Confirm the details below
// // //             </h2>
// // //             <div className="bg-gray-50 p-6 rounded-xl space-y-4">
// // //               <div>
// // //                 <h3 className="font-bold">Traveler Details</h3>
// // //                 <p>Full Name: Mr {formData.firstName} {formData.otherNames}</p>
// // //                 <p>Phone Number: {formData.phone}</p>
// // //                 <p>Email: {formData.email}</p>
// // //                 <p>Date of Birth: {formData.dob}</p>
// // //               </div>
// // //               <div>
// // //                 <h3 className="font-bold">Trip Details</h3>
// // //                 <p>From: {formData.fromCountry}</p>
// // //                 <p>To: {formData.toCountry}</p>
// // //                 <p>Departure: {formData.departureDate}</p>
// // //                 <p>Return: {formData.returnDate}</p>
// // //                 <p>Reason: {formData.reason}</p>
// // //               </div>
// // //               <div>
// // //                 <h3 className="font-bold">Plan Selected</h3>
// // //                 <p>{formData.selectedPlan?.name} - {formData.selectedPlan?.price}</p>
// // //               </div>
// // //               <div>
// // //                 <h3 className="font-bold">Identification</h3>
// // //                 <p>ID: {formData.idNumber}</p>
// // //                 <p>Passport: {formData.passport}</p>
// // //                 <p>Nationality: {formData.nationality}</p>
// // //                 <p>Residence: {formData.residence}</p>
// // //               </div>
// // //             </div>
// // //             <button className="w-full py-3 bg-blue-600 text-white rounded-xl">Add a Traveler</button>
// // //             <div className="flex items-center gap-2">
// // //               <input type="checkbox" id="terms" />
// // //               <label htmlFor="terms" className="text-sm">I have understood and agreed to the Terms & Conditions</label>
// // //             </div>
// // //           </section>
// // //         );
// // //       case 8:
// // //         return (
// // //           <section className="space-y-6">
// // //             {paymentSimulated ? (
// // //               <div className="text-center space-y-4">
// // //                 <h2 className="text-2xl font-bold text-gray-800">Get your insurance cover in less than 5 minutes</h2>
// // //                 <p>Total KES 4,938</p>
// // //                 <p>MPesa payment initiated to your Number: 0708682551 has failed,</p>
// // //                 <p>You will receive SMS with an explanation Guiding you on how to make payment via Lipa na Mpesa option</p>
// // //                 <p>Thank you for choosing Old Mutual Travel Insurance</p>
// // //               </div>
// // //             ) : (
// // //               <>
// // //                 <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
// // //                   <FaCreditCard className="text-blue-600" />
// // //                   Payment
// // //                 </h2>
// // //                 <div className="flex gap-4 mb-6">
// // //                   {["Mpesa", "Card"].map((method) => (
// // //                     <div
// // //                       key={method}
// // //                       onClick={() => updateFormData("paymentMethod", method)}
// // //                       className={`cursor-pointer px-6 py-3 rounded-xl border-2 ${formData.paymentMethod === method ? "border-red-500 bg-red-50" : "border-gray-200"}`}
// // //                     >
// // //                       {method === "Mpesa" ? <FaMoneyBillWave /> : <FaCreditCard />} {method}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //                 <p className="font-bold">Total KES 4,938</p>
// // //                 {formData.paymentMethod === "Mpesa" && (
// // //                   <div className="space-y-2">
// // //                     <label className="text-sm font-semibold text-gray-700">Enter a Valid Safaricom Number</label>
// // //                     <input
// // //                       value={formData.mpesaNumber}
// // //                       onChange={(e) => updateFormData("mpesaNumber", e.target.value)}
// // //                       placeholder="e.g. 254 700 000 000"
// // //                       className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none"
// // //                     />
// // //                     <p className="text-sm text-gray-600">If the Mpesa PIN screen doesn't show automatically on your phone, Click here</p>
// // //                   </div>
// // //                 )}
// // //                 {/* Add card fields if Card selected */}
// // //               </>
// // //             )}
// // //           </section>
// // //         );
// // //       default:
// // //         return null;
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
// // //       {/* Background Decorative Elements */}
// // //       <div className="fixed inset-0 pointer-events-none overflow-hidden">
// // //         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
// // //         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
// // //       </div>

// // //       <div className="relative mx-auto px-4 py-12 sm:px-6 lg:px-8">
// // //           <div className="text-center mb-16 space-y-4">
// // //             <div className="text-center mb-12 bg-white p-8 rounded-3xl shadow-2xl">
// // //               <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
// // //             Get Your <span style={{ color: PRIMARY_RED }}>Travel Insurance</span> Today
// // //           </h1>
// // //           <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
// // //             Safe travels start here. Customize your plan in minutes.
// // //           </p>
// // //             </div>
// // //           </div>



// // //         <div className="grid lg:grid-cols-12 gap-12 items-start">
// // //           {/* Main Form */}
// // //           <div className="lg:col-span-8">
// // //             <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
// // //               <div className="h-2" style={{ background: `linear-gradient(to right, ${PRIMARY_RED}, ${PRIMARY_BLUE})` }}></div>
// // //               <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
// // //                 {renderProgress()}
// // //                 {renderStep()}
// // //                 <div className="flex justify-between mt-8">
// // //                   {step > 1 && (
// // //                     <button type="button" onClick={prevStep} className="px-6 py-3 rounded-xl border border-gray-200 flex items-center gap-2">
// // //                       <FaStepBackward /> Back
// // //                     </button>
// // //                   )}
// // //                   {step < totalSteps ? (
// // //                     <button type="button" onClick={nextStep} className="px-6 py-3 rounded-xl text-white flex items-center gap-2" style={{ backgroundColor: PRIMARY_RED }}>
// // //                       Next <FaStepForward />
// // //                     </button>
// // //                   ) : (
// // //                     <button
// // //                       type="submit"
// // //                       disabled={loading}
// // //                       className="w-full px-6 py-5 rounded-2xl text-white font-bold text-xl flex justify-center items-center gap-3"
// // //                       style={{ backgroundColor: PRIMARY_BLUE }}
// // //                     >
// // //                       {loading ? "Processing..." : "Pay Now"} <FaArrowRight />
// // //                     </button>
// // //                   )}
// // //                 </div>
// // //               </form>
// // //             </div>
// // //           </div>

// // //           {/* Sidebar */}
// // //           <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
// // //             {/* Benefits */}
// // //             <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
// // //               <h3 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
// // //                 <FaShieldAlt style={{ color: PRIMARY_RED }} />
// // //                 Why Choose Us
// // //               </h3>
// // //               <ul className="space-y-4">
// // //                 {[
// // //                   { icon: "✈️", text: "Worldwide Coverage", sub: "Protect anywhere" },
// // //                   { icon: "⚕️", text: "Medical Emergency", sub: "Up to USD 200,000" },
// // //                   { icon: "🛡️", text: "Personal Liability", sub: "Peace of mind" },
// // //                   { icon: "💼", text: "Baggage Protection", sub: "Cover your belongings" },
// // //                 ].map((item, i) => (
// // //                   <li key={i} className="flex gap-4 items-start">
// // //                     <span className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-lg">{item.icon}</span>
// // //                     <div>
// // //                       <p className="font-bold text-gray-800 text-sm">{item.text}</p>
// // //                       <p className="text-xs text-gray-500">{item.sub}</p>
// // //                     </div>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>

// // //             {/* QR Code */}
// // //             <div className="bg-gradient-to-br from-zinc-900 via-slate-800 to-zinc-900 rounded-2xl p-6 text-white shadow-2xl border border-zinc-800">
// // //               <div className="flex items-center gap-3 mb-4">
// // //                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
// // //                   <FaQrcode className="text-xl" />
// // //                 </div>
// // //                 <div>
// // //                   <h3 className="text-xl font-bold">Scan to Share</h3>
// // //                   <p className="text-sm opacity-80">Share this travel insurance form</p>
// // //                 </div>
// // //               </div>

// // //               <div className="bg-white p-4 rounded-xl mb-4 flex justify-center">
// // //                 <div className="relative">
// // //                   <img
// // //                     src="/qr_code.png" // Replace with actual QR if needed
// // //                     alt="QR Code for Travel Insurance"
// // //                     className="w-48 h-48 rounded-lg shadow-md"
// // //                   />
// // //                   <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: PRIMARY_RED, boxShadow: `0 0 8px ${PRIMARY_RED}` }}></div>
// // //                   <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: PRIMARY_BLUE, boxShadow: `0 0 8px ${PRIMARY_BLUE}` }}></div>
// // //                   <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: PRIMARY_BLUE, boxShadow: `0 0 8px ${PRIMARY_BLUE}` }}></div>
// // //                   <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: PRIMARY_RED, boxShadow: `0 0 8px ${PRIMARY_RED}` }}></div>
// // //                 </div>
// // //               </div>

// // //               <div className="space-y-3">
// // //                 <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg">
// // //                   <span className="text-sm truncate flex-1 mr-2">{window.location.href}</span>
// // //                   <a
// // //                     href={window.location.href}
// // //                     target="_blank"
// // //                     rel="noopener noreferrer"
// // //                     className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition backdrop-blur-sm"
// // //                   >
// // //                     <FaExternalLinkAlt className="text-xs" />
// // //                     Visit
// // //                   </a>
// // //                 </div>

// // //                 <div className="flex gap-2">
// // //                   <button
// // //                     onClick={copyToClipboard}
// // //                     className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-2 rounded-lg transition backdrop-blur-sm border border-white/10"
// // //                   >
// // //                     <FaCopy className="text-sm" />
// // //                     {copied ? "Copied!" : "Copy Link"}
// // //                   </button>
// // //                   <button
// // //                     onClick={shareLink}
// // //                     className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-2 rounded-lg transition backdrop-blur-sm border border-white/10"
// // //                   >
// // //                     <FaShareAlt className="text-sm" />
// // //                     Share
// // //                   </button>
// // //                 </div>

// // //                 <div className="text-xs opacity-70 text-center pt-2">
// // //                   Scan with your phone camera or QR scanner app
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Support */}
// // //             <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex items-center gap-4" style={{ backgroundColor: "#ffebee" }}>
// // //               <FaHeadset className="text-3xl" style={{ color: PRIMARY_RED }} />
// // //               <div>
// // //                 <p className="font-bold text-gray-800 text-sm">Need Help?</p>
// // //                 <p className="text-xs text-gray-600">Call us at +254 718 917 211</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // // "use client";

// // // // import { useState } from "react";
// // // // import Image from "next/image"; // Optimized image handling
// // // // import { db } from "@/app/lib/firebase";
// // // // import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// // // // import { useRouter } from "next/navigation";
// // // // import {
// // // //   FaUser,
// // // //   FaPhone,
// // // //   FaBuilding,
// // // //   FaChartBar,
// // // //   FaTools,
// // // //   FaArrowRight,
// // // //   FaShieldAlt,
// // // //   FaMobileAlt,
// // // //   FaHeadset,
// // // //   FaCheckCircle,
// // // //   FaQrcode,
// // // //   FaEnvelope,
// // // //   FaCopy,
// // // //   FaExternalLinkAlt,
// // // //   FaShareAlt
// // // // } from "react-icons/fa";
// // // // import { MdEmail } from "react-icons/md";

// // // // export default function FullDemoForm() {
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [currentSystem, setCurrentSystem] = useState("");
// // // //   const [showCurrentSystemInput, setShowCurrentSystemInput] = useState(false);
// // // //   const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
// // // //   const router = useRouter();
// // // //     const [copied, setCopied] = useState(false);

// // // //   const painPoints = [
// // // //     { id: "slow", label: "Slow quotations", icon: "⏱️" },
// // // //     { id: "renewals", label: "Renewals leakage", icon: "💰" },
// // // //     { id: "finance", label: "Finance errors", icon: "📊" },
// // // //     { id: "claims", label: "Claims delays", icon: "📄" },
// // // //     { id: "hard", label: "Hard-to-use system", icon: "🤯" },
// // // //     { id: "support", label: "Poor support", icon: "🎧" },
// // // //     { id: "mobile", label: "No mobile app", icon: "📱" },
// // // //   ];

// // // //   const handlePainPointChange = (pain: string) => {
// // // //     setSelectedPainPoints(prev =>
// // // //       prev.includes(pain)
// // // //         ? prev.filter(p => p !== pain)
// // // //         : [...prev, pain]
// // // //     );
// // // //   };

// // // //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);

// // // //     const formData = new FormData(e.currentTarget);

// // // //     const data = {
// // // //       fullName: formData.get("fullName"),
// // // //       phone: formData.get("phone"),
// // // //       email: formData.get("email"),
// // // //       agencyName: formData.get("agencyName"),
// // // //       hasSystem: formData.get("hasSystem"),
// // // //       currentSystem: formData.get("currentSystem") || "None",
// // // //       painPoints: selectedPainPoints,
// // // //       otherPainPoint: formData.get("otherPainPoint") || null,
// // // //       additionalNotes: formData.get("additionalNotes") || null,
// // // //       preferredTime: formData.get("preferredTime") || null,
// // // //       createdAt: serverTimestamp(),
// // // //       source: "website-form",
// // // //       formVersion: "full",
// // // //     };

// // // //     try {
// // // //       await addDoc(collection(db, "insurance_demo_requests"), data);
// // // //       router.push("/success?step=full");
// // // //     } catch (err) {
// // // //       console.error("Submission error:", err);
// // // //       alert("Something went wrong. Please try again.");
// // // //     }
// // // //     setLoading(false);
// // // //   };


// // // //   const copyToClipboard = () => {
// // // //     navigator.clipboard.writeText("https://book-your-insurance-cloud-demo.vercel.app/");
// // // //     setCopied(true);
// // // //     setTimeout(() => setCopied(false), 2000);
// // // //   };

// // // //     const shareLink = () => {
// // // //       if (navigator.share) {
// // // //         navigator.share({
// // // //           title: 'Insurance Cloud Demo',
// // // //           text: 'Book your demo for our Insurance Cloud Platform',
// // // //           url: 'https://book-your-insurance-cloud-demo.vercel.app/',
// // // //         });
// // // //       }
// // // //     };

// // // //   return (
// // // //     <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
// // // //       {/* Background Decorative Elements */}
// // // //       <div className="fixed inset-0 pointer-events-none overflow-hidden">
// // // //         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
// // // //         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
// // // //       </div>

// // // //       <div className="relative min-w-screen max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

// // // //         {/* Header Section */}
// // // //         <div className="text-center mb-16 space-y-4">

// // // //           {/* <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
// // // //             Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Insurance Cloud</span> Demo
// // // //           </h1>
// // // //           <p className="text-xl text-slate-600 max-w-2xl mx-auto">
// // // //             Stop losing renewals and start growing your agency. Join 500+ brokers upgrading their tech stack today.
// // // //           </p> */}

// // // //           <div className="text-center mb-12 bg-white p-8 rounded-3xl shadow-2xl">

// // // //             {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-2">
// // // //               <span className="relative flex h-3 w-3">
// // // //                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
// // // //                 <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
// // // //               </span>
// // // //               Accepting New Agencies
// // // //             </div> */}
// // // //             {/* <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-6 shadow-xl">
// // // //               <FaShieldAlt className="text-4xl text-white" />
// // // //             </div> */}
// // // //             <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
// // // //               Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Insurance Cloud </span>
// // // //               Demo
// // // //             </h1>
// // // //             <p className="text-xl text-gray-600 max-w-4xl mx-auto">
// // // //               Ready to stop the pain? Discover how our cloud platform can modernize your agency, boost efficiency, and maximize renewals.
// // // //             </p>
// // // //           </div>
// // // //         </div>

// // // //         <div className="grid lg:grid-cols-12 gap-12 items-start">

// // // //           {/* LEFT COLUMN: THE FORM (Span 8) */}
// // // //           <div className="lg:col-span-8">
// // // //             <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
// // // //               <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500"></div>

// // // //               <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-10">

// // // //                 <section className="space-y-6">
// // // //                   <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
// // // //                     <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
// // // //                       <FaUser size={20} />
// // // //                     </div>
// // // //                     <h2 className="text-xl font-bold text-slate-800">1. Who are you?</h2>
// // // //                   </div>



// // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // //                     <div className="space-y-2">
// // // //                       <label className="text-sm font-semibold text-slate-700">Full Name</label>
// // // //                       <div className="relative">
// // // //                         <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
// // // //                         <input
// // // //                           required
// // // //                           name="fullName"
// // // //                           placeholder="Your Name"
// // // //                           className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
// // // //                         />
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="space-y-2">
// // // //                       <label className="text-sm font-semibold text-slate-700">Phone (WhatsApp)</label>
// // // //                       <div className="relative">
// // // //                         <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
// // // //                         <input
// // // //                           required
// // // //                           type="tel"
// // // //                           name="phone"
// // // //                           placeholder="+254 700 000 000"
// // // //                           className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
// // // //                         />
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="space-y-2">
// // // //                       <label className="text-sm font-semibold text-slate-700">Work Email</label>
// // // //                       <div className="relative">
// // // //                         <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
// // // //                         <input
// // // //                           required
// // // //                           type="email"
// // // //                           name="email"
// // // //                           placeholder="john@agency.com"
// // // //                           className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
// // // //                         />
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="space-y-2">
// // // //                       <label className="text-sm font-semibold text-slate-700">Agency Name</label>
// // // //                       <div className="relative">
// // // //                         <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
// // // //                         <input
// // // //                           required
// // // //                           name="agencyName"
// // // //                           placeholder="Doe Insurance Brokers"
// // // //                           className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
// // // //                         />
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </section>

// // // //                 {/* 2. Current Status */}
// // // //                 <section className="space-y-6">
// // // //                   <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
// // // //                     <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
// // // //                       <FaChartBar size={20} />
// // // //                     </div>
// // // //                     <h2 className="text-2xl font-bold text-slate-800">2.  Current Setup</h2>
// // // //                   </div>

// // // //                   <div className="space-y-4">
// // // //                     <p className="text-sm text-slate-600 font-medium">Do you currently use a system?</p>
// // // //                     <div className="flex flex-wrap gap-4">
// // // //                       {["Yes", "No", "Not sure"].map((option) => (
// // // //                         <label key={option} className="relative group cursor-pointer">
// // // //                           <input
// // // //                             type="radio"
// // // //                             name="hasSystem"
// // // //                             value={option}
// // // //                             className="peer sr-only"
// // // //                             onClick={() => {
// // // //                               if (option === "Yes") setShowCurrentSystemInput(true);
// // // //                               else { setShowCurrentSystemInput(false); setCurrentSystem(""); }
// // // //                             }}
// // // //                           />
// // // //                           <div className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 group-hover:border-blue-300">
// // // //                             {option}
// // // //                           </div>
// // // //                         </label>
// // // //                       ))}
// // // //                     </div>

// // // //                     <div className={`transition-all duration-300 overflow-hidden ${showCurrentSystemInput ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
// // // //                       <input
// // // //                         name="currentSystem"
// // // //                         value={currentSystem}
// // // //                         onChange={(e) => setCurrentSystem(e.target.value)}
// // // //                         placeholder="Which system? (e.g. Turnkey, Legacy, Excel)"
// // // //                         className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
// // // //                       />
// // // //                     </div>
// // // //                   </div>
// // // //                 </section>

// // // //                 {/* 3. Pain Points */}
// // // //                 <section className="space-y-6">
// // // //                   {/* <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
// // // //                     <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
// // // //                       <FaTools size={20} />
// // // //                     </div>
// // // //                     <h2 className="text-xl font-bold text-slate-800">What's holding you back?</h2>
// // // //                   </div> */}

// // // //                   <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6 flex items-center gap-3">
// // // //                     <FaTools className="text-rose-600 " />
// // // //                     3. Biggest Pain Point(s)
// // // //                   </h2>
// // // //                   <p className="text-gray-600 mb-4">
// // // //                     Select all the challenges that apply to your current system/workflow or that hold you back (Choose all that apply):
// // // //                   </p>


// // // //                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
// // // //                     {painPoints.map((pain) => (
// // // //                       <div
// // // //                         key={pain.id}
// // // //                         onClick={() => handlePainPointChange(pain.label)}
// // // //                         className={`cursor-pointer relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center gap-2 group
// // // //                           ${selectedPainPoints.includes(pain.label)
// // // //                             ? "border-rose-500 bg-rose-50 text-rose-900 shadow-sm"
// // // //                             : "border-slate-100 bg-slate-50 text-slate-600 hover:border-rose-200 hover:bg-white"}`}
// // // //                       >
// // // //                         <div className="text-2xl mb-1">{pain.icon}</div>
// // // //                         <span className="text-sm font-bold leading-tight">{pain.label}</span>
// // // //                         {selectedPainPoints.includes(pain.label) && (
// // // //                           <div className="absolute top-2 right-2 text-rose-500">
// // // //                             <FaCheckCircle />
// // // //                           </div>
// // // //                         )}
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                   <input name="otherPainPoint" placeholder="Any other issues? (Optional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-sm" />
// // // //                 </section>

// // // //                 {/* 4. Details */}
// // // //                 <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6 flex items-center gap-3">
// // // //                   <FaEnvelope className="text-blue-600" />
// // // //                   4. Demo Preference
// // // //                 </h2>

// // // //                 <section className="grid md:grid-cols-2 gap-6">
// // // //                   <div className="space-y-2">
// // // //                     <label className="text-sm font-semibold text-slate-700">Preferred Time</label>
// // // //                     <select name="preferredTime" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-blue-500 outline-none">
// // // //                       <option value="">Select a time slot...</option>
// // // //                       <option value="morning">Morning (9 AM - 12 PM)</option>
// // // //                       <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
// // // //                       <option value="evening">Evening (5 PM - 7 PM)</option>
// // // //                     </select>
// // // //                   </div>
// // // //                   <div className="space-y-2">
// // // //                     <label className="text-sm font-semibold text-slate-700">Extra Notes</label>
// // // //                     <textarea name="additionalNotes" rows={1} placeholder="Anything else?" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none resize-none" />
// // // //                   </div>
// // // //                 </section>

// // // //                 <button
// // // //                   type="submit"
// // // //                   disabled={loading}
// // // //                   className="w-full group relative overflow-hidden bg-slate-900 text-white font-bold py-5 rounded-2xl text-base md:text-xl transition-all hover:scale-[1.01] hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
// // // //                 >
// // // //                   <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
// // // //                   <div className="relative flex items-center justify-center gap-3">
// // // //                     {loading ? "Booking..." : (
// // // //                       <>
// // // //                         {/* <span>Secure My Demo Slot</span>
// // // //                         <FaArrowRight className="group-hover:translate-x-1 transition-transform" /> */}
// // // //                         <FaShieldAlt className="text-base md:text-2xl" />
// // // //                         YES! Secure My Demo Slot Now
// // // //                         <FaArrowRight />

// // // //                       </>
// // // //                     )}
// // // //                   </div>
// // // //                 </button>
// // // //               </form>
// // // //             </div>
// // // //           </div>

// // // //           {/* RIGHT COLUMN: BENEFITS & QR CODE (Span 4) */}
// // // //           <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">

// // // //             {/* 1. Benefits Card */}
// // // //             <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
// // // //               <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
// // // //                 <FaShieldAlt className="text-blue-500" />
// // // //                 Why Agencies Switch
// // // //               </h3>
// // // //               <ul className="space-y-4">
// // // //                 {[
// // // //                   { icon: "⚡", text: "90% Faster Quotations", sub: "Generate quotes in seconds" },
// // // //                   { icon: "📱", text: "Mobile App Included", sub: "Work from anywhere" },
// // // //                   { icon: "🔒", text: "Bank-Level Security", sub: "Your data is safe" },
// // // //                   { icon: "👥", text: "24/7 Local Support", sub: "We are here when you need us" },
// // // //                 ].map((item, i) => (
// // // //                   <li key={i} className="flex gap-4 items-start">
// // // //                     <span className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-lg">{item.icon}</span>
// // // //                     <div>
// // // //                       <p className="font-bold text-slate-800 text-sm">{item.text}</p>
// // // //                       <p className="text-xs text-slate-500">{item.sub}</p>
// // // //                     </div>
// // // //                   </li>
// // // //                 ))}
// // // //               </ul>
// // // //             </div>

// // // //             {/* 2. QR CODE CARD (Requested) */}
// // // //             {/* <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden group">
// // // //               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>

// // // //               <div className="relative z-10 flex flex-col items-center text-center space-y-4">
// // // //                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm">
// // // //                   <FaQrcode className="text-2xl text-cyan-400" />
// // // //                 </div>

// // // //                 <h3 className="text-xl font-bold">On the go?</h3>
// // // //                 <p className="text-slate-300 text-sm leading-relaxed">
// // // //                   Scan this code to open the short version of this form on your mobile phone.
// // // //                 </p>
 
// // // //                 <div className="p-3 bg-white rounded-xl shadow-lg mt-2">
// // // //                   <div className="relative w-40 h-40"> 
// // // //                     <Image
// // // //                       src="/qr_code.png"
// // // //                       alt="Scan to book demo"
// // // //                       fill
// // // //                       className="object-contain"
// // // //                     />
// // // //                   </div>
// // // //                 </div>

// // // //                 <a
// // // //                   href="https://book-your-insurance-cloud-demo.vercel.app/"
// // // //                   target="_blank"
// // // //                   className="text-xs text-cyan-400 hover:text-cyan-300 underline mt-2 break-all"
// // // //                 >
// // // //                   book-your-insurance-cloud-demo.vercel.app
// // // //                 </a>
// // // //               </div>
// // // //             </div> */}

// // // //             {/* QR CODE CARD – Premium Blue/Cyan Version */}
// // // //             {/* <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
// // // //               <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
              
// // // //               <div className="p-8 text-center space-y-6">
                 
// // // //                 <div className="flex flex-col items-center gap-4">
// // // //                   <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
// // // //                     <FaQrcode className="text-3xl text-white" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <h3 className="text-2xl font-bold text-slate-900">On the Go?</h3>
// // // //                     <p className="text-slate-600 mt-1">Scan with your phone to book instantly</p>
// // // //                   </div>
// // // //                 </div>
 
// // // //                 <div className="flex justify-center">
// // // //                   <div className="relative p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-inner">
// // // //                     <div className="bg-white p-4 rounded-xl shadow-lg">
// // // //                       <div className="relative w-48 h-48">
// // // //                         <Image
// // // //                           src="/qr_code.png"
// // // //                           alt="Scan to book your Insurance Cloud demo"
// // // //                           fill
// // // //                           className="object-contain rounded-lg"
// // // //                         />
// // // //                       </div>
// // // //                     </div>
 
// // // //                     <div className="absolute -top-2 -left-2 w-5 h-5 bg-blue-500 rounded-full opacity-80"></div>
// // // //                     <div className="absolute -top-2 -right-2 w-5 h-5 bg-cyan-500 rounded-full opacity-80"></div>
// // // //                     <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-cyan-500 rounded-full opacity-80"></div>
// // // //                     <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-blue-500 rounded-full opacity-80"></div>
// // // //                   </div>
// // // //                 </div>

// // // //                  <div className="space-y-4">
// // // //                   <div className="flex items-center justify-center gap-3 bg-slate-50 px-4 py-3 rounded-xl">
// // // //                     <span className="text-sm text-slate-700 truncate max-w-60">
// // // //                       book-your-insurance-cloud-demo.vercel.app
// // // //                     </span>
// // // //                     <a
// // // //                       href="https://book-your-insurance-cloud-demo.vercel.app/"
// // // //                       target="_blank"
// // // //                       rel="noopener noreferrer"
// // // //                       className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
// // // //                     >
// // // //                       Open
// // // //                       <FaArrowRight className="text-xs" />
// // // //                     </a>
// // // //                   </div>

// // // //                   <p className="text-xs text-slate-500">
// // // //                     Works with any phone camera • No app needed
// // // //                   </p>
// // // //                 </div>
// // // //               </div>
// // // //             </div>  */}


// // // //             {/* QR Code Section */}
// // // //             <div className="bg-gradient-to-br from-zinc-900 via-slate-800 to-zinc-900 rounded-2xl p-6 text-white shadow-2xl border border-zinc-800">
// // // //               <div className="flex items-center gap-3 mb-4">
// // // //                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
// // // //                   <FaQrcode className="text-xl" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <h3 className="text-xl font-bold">Scan to View This UI</h3>
// // // //                   <p className="text-sm opacity-80">Share our demo booking form</p>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="bg-white p-4 rounded-xl mb-4 flex justify-center">
// // // //                 <div className="relative">
// // // //                   {/* QR Code Image */}
// // // //                   <img
// // // //                     src="/qr_code.png"
// // // //                     alt="QR Code for Insurance Cloud Demo"
// // // //                     className=" w-48  h-48 rounded-lg shadow-md"
// // // //                   />
// // // //                   {/* Decorative corner dots – now in neon cyan/teal for pop */}
// // // //                   <div className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
// // // //                   <div className="absolute -top-2 -right-2 w-4 h-4 bg-teal-500 rounded-full shadow-lg shadow-teal-500/50"></div>
// // // //                   <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-teal-500 rounded-full shadow-lg shadow-teal-500/50"></div>
// // // //                   <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="space-y-3">
// // // //                 <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg">
// // // //                   <span className="text-sm truncate max-w-[50vw] md:max-w-[80vw]  flex-1 mr-2">
// // // //                     https://book-your-insurance-cloud-demo.vercel.app/
// // // //                   </span>
// // // //                   <a
// // // //                     href="https://book-your-insurance-cloud-demo.vercel.app/"
// // // //                     target="_blank"
// // // //                     rel="noopener noreferrer"
// // // //                     className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition backdrop-blur-sm"
// // // //                   >
// // // //                     <FaExternalLinkAlt className="text-xs" />
// // // //                     Visit
// // // //                   </a>
// // // //                 </div>

// // // //                 <div className="flex gap-2">
// // // //                   <button
// // // //                     onClick={copyToClipboard}
// // // //                     className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-2 rounded-lg transition backdrop-blur-sm border border-white/10"
// // // //                   >
// // // //                     <FaCopy className="text-sm" />
// // // //                     {copied ? "Copied!" : "Copy Link"}
// // // //                   </button>
// // // //                   <button
// // // //                     onClick={shareLink}
// // // //                     className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-2 rounded-lg transition backdrop-blur-sm border border-white/10"
// // // //                   >
// // // //                     <FaShareAlt className="text-sm" />
// // // //                     Share
// // // //                   </button>
// // // //                 </div>

// // // //                 <div className="text-xs opacity-70 text-center pt-2">
// // // //                   Scan with your phone camera or QR scanner app
// // // //                 </div>
// // // //               </div>
// // // //             </div>


// // // //             {/* 3. Trust Badge */}
// // // //             <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex items-center gap-4">
// // // //               <FaHeadset className="text-3xl text-blue-600" />
// // // //               <div>
// // // //                 <p className="font-bold text-slate-800 text-sm">Have Questions?</p>
// // // //                 <p className="text-xs text-slate-600">Call our sales team directly at <span className="font-semibold">+254 718 917 211</span></p>
// // // //               </div>
// // // //             </div>

// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
 