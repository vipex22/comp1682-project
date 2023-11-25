import React from "react";
import { GWlogo } from "../assets";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="py-10 min-h-screen bg-gray-100 px-10">
      <div className="max-w-screen-xl mx-auto text-3xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)] text-center md:text-left">
        Terms of Service
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left pt-5">
        Last Updated: 11/26/2023
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        1. Acceptance of Terms
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        By accessing or using the services provided by GWFashion, including but
        not limited to browsing our website, making purchases, or interacting
        with our platform in any way, you agree to comply with and be bound by
        these Terms and Conditions. If you do not agree to these terms, please
        do not use our services.
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        2. User Registration
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        In order to access certain features of our services, you may be required
        to register for an account. By registering, you agree to provide
        accurate, current, and complete information during the registration
        process and to update such information to keep it accurate, current, and
        complete.
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        3. Prohibited Activities
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        You agree not to engage in any activity that may interfere with or
        disrupt the functionality of our services, including but not limited to
        attempting to gain unauthorized access to our systems or transmitting
        any harmful code or malware.
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        4. Privacy Policy
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        Our Privacy Policy outlines how we collect, use, and safeguard your
        personal information. By using our services, you acknowledge that you
        have read and agree to the terms of our Privacy Policy.
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        5. Changes to Terms
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        We reserve the right to update or modify these Terms of Service at any
        time without prior notice. Please review this page periodically to stay
        informed of any changes.
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        6. Contact Information
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        If you have any questions or concerns about our Terms of Service, please
        contact us at{" "}
        <Link to="/contact" className="underline underline-offset-2">
          Contact
        </Link>
        . Thank you for choosing GWFashion!
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        <img className="w-80 mx-auto" src={GWlogo} alt="greenwichlogo"></img>
      </div>
    </div>
  );
};

export default TermsOfService;
