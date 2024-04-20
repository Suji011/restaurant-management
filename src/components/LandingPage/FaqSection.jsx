import React from "react";
import { MDBAccordion, MDBAccordionItem, MDBContainer } from "mdb-react-ui-kit";

function FaqSection() {
  return (
    <div>
      <MDBContainer id="faq" className="mt-5" style={{ maxWidth: '1000px' }}>
        <MDBAccordion alwaysOpen initialActive={1}>
          <MDBAccordionItem collapseId={1} headerTitle="How do I add or update food items in RunYourResto?">
            <p>
              Adding or updating food items in RunYourResto is straightforward. Admin users can navigate to the 'Menu Management' section in the dashboard. Here, you can add new food items, update existing ones, adjust pricing, and customize the item descriptions. All changes are immediately reflected in the system and visible to all users.
            </p>
          </MDBAccordionItem>
          <MDBAccordionItem collapseId={2} headerTitle="Can I track the status of orders in real-time?">
            <p>
              Yes, RunYourResto provides real-time order tracking. The 'Live Orders' dashboard allows kitchen staff to see incoming orders as they happen. Similarly, billing staff can track the preparation status, ensuring seamless communication between the kitchen and billing departments. Changes in order status, such as 'Started Preparation' to 'Finished Preparation,' are synchronized across all user logins.
            </p>
          </MDBAccordionItem>
          <MDBAccordionItem collapseId={3} headerTitle="How does the billing feature work?">
            <p>
              In RunYourResto, creating a new order and generating a bill is simple. The billing user selects items ordered by the customer, applies any discounts if applicable, and generates the bill. Orders can be sent directly to the kitchen from the billing section. Once an order is served, its status can be updated to 'Served,' and finally to 'Completed' once the dining experience is over.
            </p>
          </MDBAccordionItem>
          <MDBAccordionItem collapseId={4} headerTitle="What happens if an order needs to be rejected by the kitchen?">
            <p>
              If an order cannot be fulfilled, the kitchen staff has the option to reject the order. This action must be accompanied by a reason for the rejection. The status update and reason are immediately communicated to the billing department and, if necessary, to the customer, ensuring transparency and allowing for quick resolution or substitution of the order item.
            </p>
          </MDBAccordionItem>
        </MDBAccordion>
      </MDBContainer>
    </div>
  );
}

export default FaqSection;
