"use strict";

const slides = document.querySelector(".slides");
const arrows = document.querySelectorAll(".arrow");

const selectSlide = (e) => {
  const target = e.target || e;
  if (target.tagName != "IMG") {
    return;
  }
  const src = target.getAttribute("src");
  const alt = target.getAttribute("alt");
  const key = target.getAttribute(["data-key"]);

  changeFrame(src, alt, key);
  removeSelected();
  target.classList.add("selected");
}

const changeFrame = (src, alt, key) => {
  const frame = document.querySelector(".frame");
  frame.innerHTML = "";
  const img = document.createElement("img");
  img.setAttribute("data-key", key);
  img.classList.add("main-image");
  img.setAttribute("src", src);
  img.setAttribute("alt", alt);
  frame.appendChild(img);
  setTimeout( () => {img.classList.add("display-main")} , 0); 
}

const nextSlide = (e) => {
  const shift = Number(e.target.getAttribute(["data-move"]));
  const nextImage = ((keyOfCurrentImage() + shift - 1) % 10 + 10) % 10 + 1;
  const selected = document.querySelector(`.image-slides[data-key="${nextImage}"]`);
  selectSlide(selected);
}

const keyOfCurrentImage = () => {
  const currentImage = document.querySelector(".main-image").getAttribute(["data-key"]);
  return Number(currentImage);
}

const removeSelected = () => {
  document.querySelector(".selected").classList.remove("selected");
}

for (const arrow of arrows) {
  arrow.addEventListener("click", nextSlide);
}

slides.addEventListener("click", selectSlide);