import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {commonStyles} from '@commonStyles/index';
import Label from '@commonComponents/label';
import Heading from '@commonComponents/heading';
import {styles} from './styles';

const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.main}>
      <Heading labelStyle={styles.centerHeading} name="Privacy Policy" />
      <Heading
        labelStyle={styles.sideHeading}
        name="Privacy Policy for Medi-Dashboard - Mobile Health App"
      />
      <Label
        labelStyle={styles.lightHeading}
        name="Effective Date: 30th January 2024"
      />

      <Heading labelStyle={styles.sideHeading} name="1. Introduction" />
      <Label
        labelStyle={styles.lightHeading}
        name={`Welcome to Medi-Dashboard ("we", "us", or "our"). This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use our mobile health app (the "App"). The App is designed for patients being treated at clinics in the USA, Canada, Norway, Sweden, and Finland. Access to the App is granted through the care provider's Electronic Health Record (EHR) system. By using the App, you agree to the terms of this Privacy Policy.`}
      />

      <Heading
        labelStyle={styles.sideHeading}
        name="2. Information We Collect"
      />
      <Label
        labelStyle={styles.lightHeading}
        name={`a. Patient Information:\nWhen your care provider uploads your information to the EHR system, we may collect personal information, such as your name, date of birth, and contact details.`}
      />

      <Label
        labelStyle={styles.lightHeading}
        name={`b. Health Information:\nThe App collects health-related information, including data requested by your care provider for treatment purposes. This information is made visible on the care provider's EHR software.`}
      />

      <Label
        labelStyle={styles.lightHeading}
        name={`c. Access Logs:\nWe collect logs of your interactions with the App when accessed through the EHR system, including login times and features used.`}
      />

      <Heading
        labelStyle={styles.sideHeading}
        name="3. How We Use Your Information"
      />
      <Label
        labelStyle={styles.lightHeading}
        name={`a. Providing Services:\nWe use your information to provide you with access to the App and its features, facilitating communication between you and your care provider.`}
      />

      <Label
        labelStyle={styles.lightHeading}
        name={`b. Integration with EHR:\nYour information is integrated into the App from your care provider's EHR system, ensuring accurate and up-to-date health records.`}
      />

      <Label
        labelStyle={styles.lightHeading}
        name={`c. Communication:\nWe may send emails relevant to your treatment or containing important information about the App. These communications are vital for your well-being and the proper use of the App.`}
      />

      <Label
        labelStyle={styles.lightHeading}
        name={`d. App Maintenance and Updates:\nPeriodically, we perform maintenance on the App and introduce new features to enhance your experience. We ensure these changes align with your care provider's treatment goals.`}
      />

      <Heading
        labelStyle={styles.sideHeading}
        name="4. Sharing Your Information"
      />
      <Label
        labelStyle={styles.lightHeading}
        name={`a. Care Providers:\nYour information is shared with your care provider, who uploads and manages your health data within the EHR system.`}
      />

      <Label
        labelStyle={styles.lightHeading}
        name={`b. Email Communication:\nRelevant emails are sent to you based on your treatment and important App-related information. We do not share your email address with third parties.`}
      />

      <Label
        labelStyle={styles.lightHeading}
        name={`c. App Maintenance and Updates:\nWhen conducting maintenance or introducing new features, only necessary personnel with strict confidentiality and security measures have access to the App's codebase.`}
      />

      <Heading labelStyle={styles.sideHeading} name="5. Security" />
      <Label
        labelStyle={styles.lightHeading}
        name={`We implement stringent security measures to protect your information from unauthorized access, disclosure, alteration, and destruction. Your data is encrypted during transmission and at rest. Regular security audits and updates are conducted to ensure the highest level of protection.`}
      />

      <Heading labelStyle={styles.sideHeading} name="6. Your Choices" />
      <Label
        labelStyle={styles.lightHeading}
        name={`As a patient accessing the App through your care provider's EHR system, your choices related to data access, correction, and deletion are managed through your care provider's policies and procedures.`}
      />

      <Heading labelStyle={styles.sideHeading} name="7. Children's Privacy" />
      <Label
        labelStyle={styles.lightHeading}
        name={`The App is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13 without parental consent.`}
      />

      <Heading
        labelStyle={styles.sideHeading}
        name="8. Changes to This Privacy Policy"
      />
      <Label
        labelStyle={styles.lightHeading}
        name={`We may update this Privacy Policy from time to time. Any changes will be communicated through your care provider or by posting the new Privacy Policy on this page.`}
      />

      <Heading labelStyle={styles.sideHeading} name="9. Contact Us" />
      <Label
        labelStyle={styles.lightHeading}
        name={`If you have any questions or concerns about this Privacy Policy, please contact your care provider or reach out to us through the contact information provided by your care provider.`}
      />
      <Label
        name={
          '\nBy using the App, you agree to the terms of this Privacy Policy.'
        }
      />
    </ScrollView>
  );
};

export default PrivacyPolicy;
