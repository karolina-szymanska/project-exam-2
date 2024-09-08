import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Layout/Logo";
import { REGISTER_ENDPOINT_URL } from "../../components/API";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const navigate = useNavigate();

  const closeLoginModal = () => {
    navigate("/");
  };

  const handleClearField = (setter, validateFunc) => {
    setter("");
    validateFunc("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateName(name);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    if (nameError || emailError || passwordError || confirmPasswordError) {
      return;
    }

    const registrationData = {
      name: name,
      email: email,
      password: password,
      venueManager: venueManager,
    };

    try {
      const response = await fetch(REGISTER_ENDPOINT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors[0].message || "Registration failed");
      }

      setLoggedIn(true);
      setRegistrationError("");
      setRegisteredEmail(email);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error:", error);
      setRegistrationError(error.message);
    }
  };

  const validateName = (value) => {
    if (!value.trim()) {
      setNameError("Name is required");
    } else if (!/^[a-zA-Z0-9_]*$/.test(value)) {
      setNameError("Name can only use a-Z, 0-9, and _");
    } else {
      setNameError("");
    }
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      setEmailError("Email must be a @stud.noroff.no address");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Invalid email address");
    } else if (!value.endsWith("@stud.noroff.no")) {
      setEmailError("Email must be a @stud.noroff.no address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      setPasswordError("Password must be at least 8 characters");
    } else if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateName(e.target.value);
    setRegistrationError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
    setRegistrationError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
    setRegistrationError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validateConfirmPassword(e.target.value);
    setRegistrationError("");
  };

  return (
    <div className="mx-auto mb-16 mt-8 flex max-w-sm flex-col px-6">
      <div className="mb-2 flex justify-end">
        <button onClick={closeLoginModal}>
          <IoClose size={30} />
        </button>
      </div>
      <div className="mb-4 flex justify-center">
        <Logo />
      </div>
      <div className="mb-6">
        <h1 className="py-2 text-lg font-semibold">Create a new account</h1>
        <p>
          Welcome! Please complete your registration to access your account.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <div
              className={`relative flex flex-col ${nameError ? "mb-2" : "mb-5"}`}
            >
              <AiOutlineUser className="absolute ml-4 mt-2" size={24} />
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                onBlur={() => validateName(name)}
                id="name"
                className={`w-full rounded-xl border py-2 pl-12 focus:border-violet-700 focus:bg-white focus:outline-none ${
                  nameError ? "border-red-700" : ""
                }`}
                placeholder="Name"
              />
              <IoClose
                size={30}
                onClick={() => handleClearField(setName, validateName)}
                className="absolute right-3 top-2 cursor-pointer text-gray-800"
              />
              {nameError && <p className="mt-1 text-red-700">{nameError}</p>}
              {nameError === "Name can only use a-Z, 0-9, and _" && (
                <p className="text-red-700">Spaces are not permitted</p>
              )}
            </div>

            <div
              className={`relative flex flex-col ${emailError ? "mb-2" : "mb-5"}`}
            >
              <MdOutlineEmail className="absolute ml-4 mt-2" size={24} />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => validateEmail(email)}
                id="email"
                className={`w-full rounded-xl border py-2 pl-12 focus:border-violet-700 focus:bg-white focus:outline-none ${
                  emailError ? "border-red-700" : ""
                }`}
                placeholder="Email address"
              />
              <IoClose
                size={30}
                onClick={() => handleClearField(setEmail, validateEmail)}
                className="absolute right-3 top-2 cursor-pointer text-gray-800"
              />
              {emailError && <p className="mt-1 text-red-700">{emailError}</p>}
            </div>

            <div
              className={`relative flex flex-col ${passwordError ? "mb-2" : "mb-5"}`}
            >
              <FaLock className="absolute ml-4 mt-2" size={24} />
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => validatePassword(password)}
                id="password"
                className={`w-full rounded-xl border py-2 pl-12 focus:border-violet-700 focus:bg-white focus:outline-none ${
                  passwordError ? "border-red-700" : ""
                }`}
                placeholder="Password"
              />
              <IoClose
                size={30}
                onClick={() => handleClearField(setPassword, validatePassword)}
                className="absolute right-3 top-2 cursor-pointer text-gray-800"
              />
              {passwordError && (
                <p className="mt-1 text-red-700">{passwordError}</p>
              )}
            </div>

            <div
              className={`relative flex flex-col ${confirmPasswordError ? "mb-2" : "mb-5"}`}
            >
              <FaLock className="absolute ml-4 mt-2" size={24} />
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={() => validateConfirmPassword(confirmPassword)}
                id="confirmPassword"
                className={`w-full rounded-xl border py-2 pl-12 focus:border-violet-700 focus:bg-white focus:outline-none ${
                  confirmPasswordError ? "border-red-700" : ""
                }`}
                placeholder="Confirm Password"
              />
              <IoClose
                size={30}
                onClick={() =>
                  handleClearField(setConfirmPassword, validateConfirmPassword)
                }
                className="absolute right-3 top-2 cursor-pointer text-gray-800"
              />
              {confirmPasswordError && (
                <p className="mt-1 text-red-700">{confirmPasswordError}</p>
              )}
            </div>

            <div className="mb-3 flex gap-4">
              <div>
                <input
                  type="radio"
                  id="guestRadio"
                  checked={!venueManager}
                  onChange={() => setVenueManager(false)}
                  name="userType"
                  value="Guest"
                  className="text-violet-700 checked:bg-violet-700 focus:ring-violet-700"
                />
                <label htmlFor="guestRadio"> Guest</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="venueManagerRadio"
                  checked={venueManager}
                  onChange={() => setVenueManager(true)}
                  name="userType"
                  value="Venue Manager"
                  className="text-violet-700 checked:bg-violet-700 focus:ring-violet-700"
                />
                <label htmlFor="venueManagerRadio"> Venue Manager </label>
              </div>
            </div>
          </div>
          {registrationError && (
            <div>
              <p className="text-red-700">{registrationError} </p>
            </div>
          )}
          <button
            type="submit"
            className="mb-2 w-full rounded-full bg-gradient-to-t from-orange-300 to-orange-400 p-2 font-semibold uppercase text-black hover:to-orange-500 hover:font-bold"
          >
            Submit
          </button>
          {loggedIn && (
            <div className="mt-3">
              <p className="mb-2 text-center text-xl">
                Your account <b>{registeredEmail}</b> is successfully created!!
              </p>
              <button className="mt-2 w-full rounded-full bg-gradient-to-t from-violet-500 to-violet-700 p-2 font-semibold uppercase text-white hover:to-violet-900 hover:font-bold">
                <Link to="/login">Login</Link>
              </button>
            </div>
          )}
        </div>
        {!loggedIn && (
          <p className="text-md mt-2 text-center">
            Have an account?{" "}
            <Link to={"/login"} className="text-violet-700 underline">
              Login Here
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
