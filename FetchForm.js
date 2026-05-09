// Define the tags of the form and the message from form
const form = document.getElementById("contactForm");
const form_div_message = document.getElementById("formMessage");

// Define the tags
const form_tags = [
  "client_name",
  "client_company",
  "client_email",
  "client_challenge",
  "client_hear_about",
];

const server_link = "https://formgrid.dev/api/f/aaeb8m8q";
// const server_link = "https://formgrid.dev/api/f/6hjyzner"

form.addEventListener("submit", async (e) => {
  // Prevent default and take data from the form.
  e.preventDefault();

  // Setting error by default.
  form_div_message.className = "error_form_contact";

  // Get the data from the Form fields.
  const formData = new FormData(form);

  // Loop through tags and check if emply and validate the email.
  for (let form_tag of form_tags) {
    // Get the value from the form
    const value = formData.get(form_tag).trim();

    // Check if trimmed value is empty
    if (value == "") {
      form_div_message.textContent = `The ${form_tag.split("_").slice(1).join(" ")} form field can not be empty`;
      return;
    }

    // Validate email
    if (form_tag == "client_email") {
      if (
        !value.includes("@") || // Contains @
        value.split("@")[1].split(".").length < 2 || // has one point after the @
        value.split(".").slice(-1)[0].trim().length == 0 // has .something
      ) {
        // Return message and exit function
        form_div_message.textContent = `Invalid email`;
        return;
      }
    }
  }

  // Setting the spinner and the pending message
  const spinner = document.createElement("span");
  const pending_message = document.createElement("span");
  spinner.className = "loading_spinner";
  pending_message.textContent =
    "Sending your information... please stay on this page.";
  pending_message.className = "pending_form_contact";
  form_div_message.textContent = "";
  form_div_message.appendChild(spinner);
  form_div_message.appendChild(pending_message);

  // Do the fetch
  try {
    const response = await fetch(server_link, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    if (response.status === 0 || response.ok) {
      form.reset();
      form_div_message.textContent =
        "Thank you! Your details have been successfully received. A member of the Spinortech team will review your inquiry and reach out to you shortly.";
      form_div_message.className = "success_form_contact";
    } else {
      throw new Error(`Server error: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
    form_div_message.textContent =
      "We encountered an issue while processing your request. Please try submitting the form again.";
    form_div_message.className = "error_form_contact";
  }
});
