import FontFaceObserver from "fontfaceobserver";

console.log("loading");

const typefaces = ["Open Sans"];

typefaces.forEach(name => {
  const loader = new FontFaceObserver(name);
  loader
    .load()
    .then(() => {
      console.log(`All variants loaded for ${name}`);
      document.documentElement.classList.add(name.replace(" ", "_"));
    })
    .catch(err => {
      console.error(`Failed to load font ${name}`, err);
    });
});

export default () => null;
