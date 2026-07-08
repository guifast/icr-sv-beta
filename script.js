const CHECKOUT_URL = "#";
const WHATSAPP_URL = "https://wa.me/5547992642578";
const INTEREST_FORM_URL = "#";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobileViewport = window.matchMedia("(max-width: 720px)").matches;

document.querySelectorAll("[data-checkout]").forEach((link) => {
  link.setAttribute("href", CHECKOUT_URL);
});

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.setAttribute("href", WHATSAPP_URL);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noreferrer");
});

document.querySelectorAll("[data-interest]").forEach((link) => {
  link.setAttribute("href", INTEREST_FORM_URL);
});

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    )
  : null;

document.querySelectorAll(".reveal").forEach((element) => {
  const sectionItems = [...element.parentElement?.children || []].filter((child) => child.classList?.contains("reveal"));
  const delayIndex = sectionItems.indexOf(element);
  if (delayIndex > 0 && !prefersReducedMotion) {
    element.style.transitionDelay = `${Math.min(delayIndex * 80, 240)}ms`;
  }

  if (revealObserver) {
    revealObserver.observe(element);
  } else {
    element.classList.add("is-visible");
  }
});

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.getElementById(button.dataset.modal);
    if (!modal) return;
    modal.showModal();
    document.body.classList.add("modal-open");
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  modal.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
  });
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog")?.close();
  });
});

const mobileStaggerGroups = [
  ".card-grid",
  ".dimension-grid",
  ".steps",
  ".checklist",
  ".faq-list",
  ".future-grid"
];

if (isMobileViewport) {
  const mobileStaggerItems = mobileStaggerGroups.flatMap((selector) =>
    [...document.querySelectorAll(selector)].flatMap((group) => [...group.children])
  );

  mobileStaggerItems.forEach((item, index) => {
    item.classList.add("mobile-stagger-item");
    item.style.setProperty("--stagger-delay", `${Math.min((index % 8) * 72, 360)}ms`);
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    mobileStaggerItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const mobileStaggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            mobileStaggerObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.18
      }
    );

    mobileStaggerItems.forEach((item) => mobileStaggerObserver.observe(item));
  }
}

const root = document.documentElement;
const header = document.querySelector(".site-header");
const floatingCta = document.querySelector(".floating-cta");
let ticking = false;

function updateScrollUi() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;

  root.style.setProperty("--scroll-progress", progress.toFixed(4));
  header?.classList.toggle("is-scrolled", scrollTop > 18);
  floatingCta?.classList.toggle("is-visible", scrollTop > window.innerHeight * 0.72);
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollUi);
      ticking = true;
    }
  },
  { passive: true }
);

updateScrollUi();

document.querySelectorAll("[data-tilt]").forEach((card) => {
  if (prefersReducedMotion || window.matchMedia("(max-width: 720px)").matches) return;

  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1100px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
