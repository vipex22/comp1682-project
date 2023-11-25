import React from "react";
import { GWlogo } from "../assets";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="py-10 min-h-screen bg-gray-100 px-10">
      <div className="max-w-screen-xl mx-auto text-3xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)] text-center md:text-left">
        Privacy Policy
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left pt-5">
        Last Updated: 11/26/2023
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        1. Introduction
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        Welcome to GWFashion. This Privacy Policy explains how we collect, use,
        disclose, and safeguard your information when you visit our website,
        interact with our services, or make a purchase. Please read this Privacy
        Policy carefully. By accessing or using our services, you consent to the
        practices described in this Privacy Policy.
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        2. Information We Collect
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        2.1 Personal Information: We may collect personal information such as
        your name, email address, postal address, phone number, and payment
        information when you make a purchase or create an account.
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        2.2 Non-personal Information: We may collect non-personal information
        such as your IP address, browser type, and device information to
        enhance our website's functionality and improve user experience.
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        3. How We Use Your Information
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        3.1 Order Processing: We use your personal information to process
        orders, fulfill purchases, and provide customer support.
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        3.2 Communication: We may use your contact information to send you
        updates about your order, promotional materials, and newsletters. You
        can opt-out of receiving promotional communications at any time.
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        3.3 Analytics: We use non-personal information for analytical purposes
        to understand user behavior, improve our website, and customize our
        marketing efforts.
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        4. Information Sharing
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        We do not sell, trade, or otherwise transfer your personal information
        to third parties unless we provide you with advance notice. This
        excludes trusted third parties who assist us in operating our website,
        conducting our business, or servicing you, as long as those parties
        agree to keep this information confidential.
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        5. Security
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        We implement a variety of security measures to maintain the safety of
        your personal information when you place an order or enter, submit, or
        access your personal information.
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        6. Cookies
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        Our website uses cookies to enhance your experience. You have the option
        to disable cookies through your browser settings, but this may affect
        your ability to use certain features of our website.
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        7. Third-Party Links
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        Our website may contain links to third-party websites. We have no
        control over the privacy practices or content of these websites. We
        encourage you to review the privacy policies of third-party sites.
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        8. Changes to This Privacy Policy
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        We reserve the right to update or modify this Privacy Policy at any time
        without prior notice. Please review this page periodically to stay
        informed of any changes.
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont text-center md:text-left">
        9. Contact Information
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center md:text-left">
        If you have any questions or concerns about our Privacy Policy, please
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

export default PrivacyPolicy;
