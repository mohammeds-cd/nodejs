const router = require("express").Router();
const responseBuilder = require("../../helper/responseBuilder");

let medicineList = [
  {
    id: 1,
    name: "Medicine 1",
    quantity: "10",
    expiryDate: "08/08/2022",
    company: "Cipla",
    godownId: "1",
  },
  {
    id: 2,
    name: "Medicine 2",
    quantity: "15",
    expiryDate: "12/12/2022",
    company: "Cipla",
    godownId: "2",
  },
  {
    id: 3,
    name: "Medicine 3",
    quantity: "5",
    expiryDate: "15/01/2023",
    company: "Rx",
    godownId: "3",
  },
];

router.get("/getMedicines", (request, response) => {
  return response.send(
    responseBuilder.buildSucessResponse({ medicineList: medicineList })
  );
});

module.exports = router;
