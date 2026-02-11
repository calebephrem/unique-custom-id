import ucidGenerateId from "../dist/index.js";
const ucid = ucidGenerateId

console.log(ucid());
console.log(ucid({
  octets: 3,
  octetLength: 6,
  uppercase: true,
}));
console.log(ucid.format("uuid"));
console.log(ucid.format("short-ucid"));
console.log(ucid.format("objectid24"));
