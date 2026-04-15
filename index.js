// Get the width of the page to determine how much to scroll when swiping and others
const pageWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

// Check if the user is accessing the page on a mobile device
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
const htmlElement = document.getElementById("html");
if (isMobile) {
  htmlElement.classList.add("html_mobile");
} else {
  htmlElement.classList.add("html_desktop");
}

// Drop down menu functionality
var DropDownStatus = false;
function DropDownFunction() {
  if (DropDownStatus) {
    document.getElementById("NavDropMenu").className = "";
  } else {
    document.getElementById("NavDropMenu").className = "ExtendDrow";
    document.addEventListener("touchstart", CheckOutsideTouch);
  }

  DropDownStatus = !DropDownStatus;
}

const CheckOutsideTouch = (e) => {
  if (
    e.target.id !== "NavDropMenu" &&
    e.target.id !== "NavDropButton" &&
    e.target.id !== "NavDropButton" &&
    e.target.tagName !== "A"
  ) {
    console.log("Clicked outside");
    document.getElementById("NavDropMenu").className = "";
    DropDownStatus = false;
    document.removeEventListener("touchstart", CheckOutsideTouch);
  }
};

// Create slider indicators
const slider_container = document.getElementById("slider_container");
const slider_parent = slider_container.parentNode;
const slider_indicator = document.createElement("div");
slider_indicator.id = "slider_indicator";
slider_indicator.className = "slider_indicator";
slider_parent.appendChild(slider_indicator);
for (let i = 0; i < slider_container.childElementCount; i++) {
  let dot = document.createElement("div");
  dot.className = "dot_slider";
  if (i === 0) {
    dot.classList.add("active_dot_slider");
  }

  slider_indicator.appendChild(dot);
}

// Swipe functionality for slider

// if (!isMobile) {
//   let touchstartX = 0;
//   let touchendX = 0;
//   let currentPage = 0;
//   // Add touch event listeners to the slider container
//   slider_container.addEventListener(
//     "touchstart",
//     (e) => {
//       touchstartX = e.changedTouches[0].pageX;
//     },
//     false,
//   );

//   slider_container.addEventListener(
//     "touchend",
//     (e) => {
//       touchendX = e.changedTouches[0].pageX;
//       handleGesture();
//     },
//     false,
//   );
//   // Handle the swipe gesture to determine the direction and scroll accordingly
//   const handleGesture = () => {
//     if (touchendX < touchstartX) {
//       swipe_right();
//     } else if (touchendX > touchstartX) {
//       swipe_left();
//     } else if (touchendX === touchstartX) {
//       const middle = pageWidth / 2;
//       if (touchendX >= middle) {
//         swipe_right();
//       } else if (touchendX < middle) {
//         swipe_left();
//       }
//     }
//   };

//   // Functions to handle swiping left and right, updating the slider indicators and scrolling the slider container
//   const swipe_left = () => {
//     slider_indicator.children[currentPage].classList.remove(
//       "active_dot_slider",
//     );
//     currentPage = Math.max(currentPage - 1, 0);
//     slider_indicator.children[currentPage].classList.add("active_dot_slider");
//     slider_container.scrollTo(pageWidth * currentPage, 0);
//   };
//   const swipe_right = () => {
//     slider_indicator.children[currentPage].classList.remove(
//       "active_dot_slider",
//     );
//     currentPage = Math.min(
//       currentPage + 1,
//       slider_container.childElementCount - 1,
//     );
//     slider_indicator.children[currentPage].classList.add("active_dot_slider");
//     slider_container.scrollTo(pageWidth * currentPage, 0);
//   };
// } else {

const slider_children = slider_container.children;
let touchstartX = 0;
let touchendX = 0;
let currentPage = 0;
let lastScrollTop = 0;

if (isMobile) {
  // Add touch event listeners to the slider container for desktop users, allowing them to swipe using touch input
  slider_container.addEventListener(
    "touchstart",
    (e) => {
      touchstartX = e.changedTouches[0].pageX;
    },
    false,
  );

  slider_container.addEventListener(
    "touchend",
    (e) => {
      touchendX = e.changedTouches[0].pageX;
      handleGesture();
    },
    false,
  );
} else {
  // Event listener for the resize
  window.addEventListener("resize", () => {
    console.log("zoomed");
    slider_children[currentPage].scrollIntoView();
  });

  // Wheeling on the page
  const wheelPage = (e) => {
    if (!e.ctrlKey) {
      if (e.deltaY > 0) {
        swipe_down();
      } else {
        swipe_up();
      }
    }
    slider_container.removeEventListener("wheel", wheelPage, false);
    setTimeout(() => {
      slider_container.addEventListener("wheel", wheelPage, false);
    }, 500);
  };
  slider_container.addEventListener("wheel", wheelPage, false);

  // Create buttons
  const backward_button = document.createElement("button");
  const forward_button = document.createElement("button");

  backward_button.onclick = () => swipe_up();
  forward_button.onclick = () => swipe_down();

  backward_button.className = "backward_button";
  forward_button.className = "forward_button";

  slider_parent.appendChild(backward_button);
  slider_parent.appendChild(forward_button);
}

// Handle the swipe gesture to determine the direction and scroll accordingly
const handleGesture = () => {
  if (touchendX < touchstartX) {
    swipe_down();
  } else if (touchendX > touchstartX) {
    swipe_up();
  }
};

// Functions to handle swiping left and right, updating the slider indicators and scrolling the slider container
const swipe_up = () => {
  slider_indicator.children[currentPage].classList.remove("active_dot_slider");
  currentPage = Math.max(0, currentPage - 1);
  slider_indicator.children[currentPage].classList.add("active_dot_slider");
  slider_children[currentPage].scrollIntoView();
};
const swipe_down = () => {
  slider_indicator.children[currentPage].classList.remove("active_dot_slider");
  currentPage = Math.min(
    currentPage + 1,
    slider_container.childElementCount - 1,
  );
  slider_indicator.children[currentPage].classList.add("active_dot_slider");
  slider_children[currentPage].scrollIntoView();

  // slider_container.scrollTo(0, slider_position);
};
