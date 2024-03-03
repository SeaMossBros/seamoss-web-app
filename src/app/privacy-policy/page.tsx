import { Container, Overlay, Text, Title } from '@mantine/core'
import { Metadata } from 'next'

import { inner, title, wrapper } from './hero-image-background.css'

export const metadata: Metadata = {
  title: 'Privacy Policy | SeaTheMoss',
}

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <div className={wrapper}>
        <Overlay color="#1a1b1e" opacity={0.65} zIndex={1} />

        <div className={inner}>
          <Title className={title}>Privacy Policy</Title>
        </div>
      </div>
      <Container w={'51%'} pt={42}>
        <Text fw={400}>
          This Privacy Policy describes how your personal information is collected, used, and shared
          when you visit or make a purchase from seathemoss.com (the &ldquo;Site&rdquo;).
        </Text>
        <br />
        <br />
        <Text fw={700} mb={9}>
          Personal information we collect
        </Text>
        <Text fw={400}>
          When you visit the Site, we automatically collect certain information about your device,
          including information about your web browser, IP address, time zone, and some of the
          cookies that are installed on your device. Additionally, as you browse the Site, we
          collect information about the individual web pages or products that you view, what
          websites or search terms referred you to the Site, and information about how you interact
          with the Site. We refer to this automatically-collected information as &ldquo;Device
          Information&rdquo; We collect Device Information using the following technologies: -
          &ldquo;Cookies&rdquo; are data files that are placed on your device or computer and often
          include an anonymous unique identifier. For more information about cookies, and how to
          disable cookies, visit http://www.allaboutcookies.org. - &ldquo;Log files&rdquo; track
          actions occurring on the Site, and collect data including your IP address, browser type,
          Internet service provider, referring/exit pages, and date/time stamps. - &ldquo;Web
          beacons&rdquo;, &ldquo;tags&rdquo;, and &ldquo;pixels&rdquo; are electronic files used to
          record information about how you browse the Site. Text Marketing and notifications: By
          entering your phone number in the checkout and initialising a purchase, subscribing via
          our subscription form or a keyword, you agree that we may send you text notifications (for
          your order, including abandoned cart reminders) and text marketing offers. Text marketing
          messages will not exceed 5 times a month. You acknowledge that consent is not a condition
          for any purchase. If you wish to unsubscribe from receiving text marketing messages and
          notifications reply with STOP to any mobile message sent from us or use the unsubscribe
          link we provided you with in any of our messages. You understand and agree that
          alternative methods of opting out, such as using alternative words or requests will not be
          accounted as a reasonable means of opting out. Message and data rates may apply. For any
          questions please text HELP to the number you received the messages from. You can also
          contact us for more information. If you wish to opt out please follow the procedures above
          Additionally when you make a purchase or attempt to make a purchase through the Site, we
          collect certain information from you, including your name, billing address, shipping
          address, payment information (including credit card numbers), email address, and phone
          number. We refer to this information as &ldquo;Order Information&rdquo;. When we talk
          about &ldquo;Personal Information&rdquo; in this Privacy Policy, we are talking both about
          Device Information and Order Information.
        </Text>
        <br />
        <br />
        <Text fw={700} mb={9}>
          How do we use your personal information?
        </Text>
        <Text fw={400}>
          We use the Order Information that we collect generally to fulfill any orders placed
          through the Site (including processing your payment information, arranging for shipping,
          and providing you with invoices and/or order confirmations). Additionally, we use this
          Order Information to: - Communicate with you; - Screen our orders for potential risk or
          fraud; and -When in line with the preferences you have shared with us, provide you with
          information or advertising relating to our products or services. We use the Device
          Information that we collect to help us screen for potential risk and fraud (in particular,
          your IP address), and more generally to improve and optimize our Site (for example, by
          generating analytics about how our customers browse and interact with the Site, and to
          assess the success of our marketing and advertising campaigns).
        </Text>
        <br />
        <br />
        <Text fw={700} mb={9}>
          Sharing you personal Information
        </Text>
        <Text fw={400}>
          We share your Personal Information with third parties to help us use your Personal
          Information, as described above. For example, we use Shopify to power our online store-you
          can read more about how Shopify uses your Personal Information here:
          https://www.shopify.com/legal/privacy. We also use Google Analytics to help us understand
          how our customers use the Site - you can read more about how Google uses your Personal
          Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out
          of Google Analytics here: https://tools.google.com/dlpage/gaoptout. Finally, we may also
          share your Personal Information to comply with applicable laws and regulations, to respond
          to a subpoena, search warrant or other lawful request for information we receive, or to
          otherwise protect our rights.
        </Text>
        <br />
        <br />
        <Text fw={700} mb={9}>
          Behavioural advertising
        </Text>
        <Text fw={400}>
          As described above, we use your Personal Information to provide you with targeted
          advertisements or marketing communications we believe may be of interest to you. For more
          information about how targeted advertising works, you can visit the Network Advertising
          Initiative&apos;s (&ldquo;NAI&rdquo;) educational page at
          http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work. You
          can opt out of targeted advertising by using the links below: - Facebook:
          https://www.facebook.com/settings/?tab=ads - Google:
          https://www.google.com/settings/ads/anonymous - Bing:
          https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
          Additionally, you can opt out of some of these services by visiting the Digital
          Advertising Alliance&apos;s opt out portal at: http://optout.aboutads.info/.
        </Text>
        <br />
        <br />
        <Text fw={700} mb={9}>
          Do not track
        </Text>
        <Text fw={400}>
          Please note that we do not alter our Site&apos;s data collection and use practices when we
          see a Do Not Track signal from your browser.
        </Text>
        <br />
        <br />
        <Text fw={700} mb={9}>
          Your rights
        </Text>
        <Text fw={400}>
          If you are a European resident, you have the right to access personal information we hold
          about you and to ask that your personal information be corrected, updated, or deleted. If
          you would like to exercise this right, please contact us through the contact information
          below. Additionally, if you are a European resident we note that we are processing your
          information in order to fulfill contracts we might have with you (for example if you make
          an order through the Site), or otherwise to pursue our legitimate business interests
          listed above. Additionally, please note that your information will be transferred outside
          of Europe, including to Canada and the United States.
        </Text>
        <br />
        <br />
        <Text fw={700} mb={9}>
          Data retention
        </Text>
        <Text fw={400}>
          When you place an order through the Site, we will maintain your Order Information for our
          records unless and until you ask us to delete this information.
        </Text>
        <br />
        <br />
        <Text fw={700} mb={9}>
          Changes
        </Text>
        <Text fw={400}>
          We may update this privacy policy from time to time in order to reflect, for example,
          changes to our practices or for other operational, legal or regulatory reasons.
        </Text>
        <br />
        <br />
        <Text fw={700} mb={9}>
          Minors
        </Text>
        <Text fw={400}>The Site is not intended for individuals under the age of 18.</Text>
        <br />
        <br />
        <Text fw={700} mb={9}>
          Contact us
        </Text>
        <Text fw={400}>
          For more information about our privacy practices, if you have questions, or if you would
          like to make a complaint, please contact us by e-mail at support@seathemoss.com or by mail
          using the details provided below:
        </Text>
        <br />
        <Text fw={400}>
          SeaTheMoss
          <br />
          [Re: Privacy Compliance Officer]
        </Text>
        <Text fw={400}>SEATHEMOSS LLC, 68 White St, 224, Red Bank, NJ 07701, United States</Text>

        <Text fw={400}>
          These statements have not been evaluated by the Food and Drug Administration (FDA). This
          product is not intended to diagnose, treat, cure, or prevent any disease. Sea Moss is an
          amazing superfood but in reality, it may not be best for everyone. Please understand that
          we, Herbal Vineyards, do not claim Sea Moss will heal or cure any disease you may be
          experiencing. Therefore, we are not responsible if Sea Moss does not work for you or if
          you do not like sea moss. However, we do recommend that you consult with your primary
          physician before taking Sea Moss, to see if Sea Moss is right for you especially if you
          have any major health issues.
        </Text>
      </Container>
    </div>
  )
}

export default PrivacyPolicyPage