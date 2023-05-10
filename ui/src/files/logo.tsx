import { clamp } from "lodash";
import { Link } from "react-router-dom";

const _logo = `
................................................
.   ███ █  █ █  █  ███ ███ ███ ██▓  █ ██▓ ███  .
.  ▓    ▓  ▓ ▓▓ ▓▓ ▓░▓ ▓ ▓ ▓░  ▓  ▓ ▓ ▓░▓ ▓░▓  .
.  ▓ ▓▓ ▓  ▓ ▓  ▓  ▓░  ▓▓    ▓ ▓  ▓ ▓ ▓   ▓░   .
.   ░░░  ░░░ ░░ ░░ ░░░ ░ ░ ░░░ ░  ░ ░ ░   ░░░  .
................................................`;
// let rainbow = "\n\n";
// for (let r = 0; r < 255; r += 50) {
//   for (let g = 0; g < 255; g += 50) {
//     for (let b = 0; b < 255; b += 50) {
//       // console.log(`\x1B[48;2;${r};${g};${b}m ░▓█\n ░▓█`);
//       rainbow += `\x1B[48;2;${r};${g};${b}m `; // bg
//       // rainbow += `\x1B[38;2;${r};${g};${b}m░▓█`; // fg
//     }
//   }
// }
// console.log(rainbow);
export const logoAnsi = _logo
  // .replace(/ /g, "\x1B[40m ")
  .replace(/ |\./g, (c, i) => {
    const r = clamp(Math.floor(100 - i * 0.6 + Math.random() * 50), 0, 150);
    const b = clamp(Math.floor(100 - i * 0.6 + Math.random() * 50), 0, 150);
    return `\x1B[48;2;${r};0;${b}m `;
  })
  .replace(/█/g, `\x1B[40;38;2;255;200;255m█`)
  .replace(/▓/g, `\x1B[40;38;2;175;150;255m▓`)
  .replace(/░/g, `\x1B[40;38;2;120;120;255m░`);
export const logoHtml = _logo
  .replace(/ |\./g, "<span>&nbsp;</span>")
  // .replace(/ |\./g, (c, i) => {
  //   const r = clamp(Math.floor(100 - i * 0.6 + Math.random() * 50), 0, 150);
  //   const g = 0;
  //   const b = clamp(Math.floor(100 - i * 0.6 + Math.random() * 50), 0, 150);
  //   return `<span style="background:rgb(${r},${g},${b})">&nbsp;</span>`;
  // })
  .replace(/█/g, `<span style="color:rgb(255,200,255)">█</span>`)
  .replace(/▓/g, `<span style="color:rgb(175,150,255)">▓</span>`)
  .replace(/░/g, `<span style="color:rgb(120,120,255)">░</span>`);
export const Logo = () => (
  <Link
    to="/"
    className="logo"
    dangerouslySetInnerHTML={{ __html: logoHtml }}
  ></Link>
);
