const responseBuilder = require("../../helper/responseBuilder");
var path = require("path");
var jsonPath = path.join(__dirname, "..", "..", "docs", "shops.json");
const jsonFile = require('../../helper/jsonFile');

function saveShop(request, response) {
    let shops = jsonFile.getJsonFile(jsonPath);
    let newShop = request.body;
    let shopExists = false;
    for (const shop of shops) {
        if (shop.email === newShop.email) {
            shopExists = true;
            break;
        }
    }
    if (shopExists) {
        response.send(responseBuilder.buildFailureResponse("Shop with email already exists!"));
    } else {
        shops.push(newShop);
        jsonFile.writeJsonFile(jsonPath, shops);
        return response.send(
            responseBuilder.buildSucessResponse({ shop: newShop })
        );
    }
}

function searchMedicine(request, response) {
    let shops = jsonFile.getJsonFile(jsonPath);
    let data;
    let length = Object.keys(request.query).length;
    if (length == 0 || request.query.medicineName == null) {
        response.send(responseBuilder.buildFailureResponse("Medicine name is missing!"));
    } else {
        data = shops.filter((shop) => {
            let isValid = true;
            isValid = isValid && shop.medicineList.some(medicine => medicine.name == request.query.medicineName);
            return isValid;
        });
    }
    return response.send(
        responseBuilder.buildSucessResponse({ shopsList: data })
    );
}

function getShops(request, response) {
    let shops = jsonFile.getJsonFile(jsonPath);
    let data;
    let length = Object.keys(request.query).length;
    let filters = request.query;
    if (length == 0) {
        data = shops;
    } else {
        data = shops.filter((shop) => {
            let isValid = true;
            for (key in filters) {
                isValid = isValid && shop[key] == filters[key];
            }
            return isValid;
        });
    }
    return response.send(
        responseBuilder.buildSucessResponse({ shopsList: data })
    );
};

function checkMedicine(request, response) {
    let shops = jsonFile.getJsonFile(jsonPath);
    let medicineRequest = request.body;
    let medicine;
    for (let shop of shops) {
        let filteredMedicine = shop.medicineList.find(medicine => medicine.name == medicineRequest.medicineName);
        if (filteredMedicine) {
            medicine = filteredMedicine;
        } else {
            response.send(responseBuilder.buildFailureResponse("Shop does have the medicine in stock!"));
        }
        break;
    }
    return response.send(
        responseBuilder.buildSucessResponse({ medicine: medicine })
    );

}


function placeOrder(request, response) {
    let shops = jsonFile.getJsonFile(jsonPath);
    let order = request.body;
    for (let shop of shops) {
        if (shop.id === order.shopId) {
            let medicine = shop.medicineList.find(medicine => medicine.name == order.medicineName);
            if (medicine) {
                if (medicine.quantity < order.quantity) {
                    response.send(responseBuilder.buildFailureResponse("Shop does not have sufficient quantity of medicine!"));
                } else {
                    if (shop.orders) {
                        shop.orders.push(order);
                    } else {
                        shop.orders = [order];
                    }
                }
            } else {
                response.send(responseBuilder.buildFailureResponse("Shop does not have the medicine in stock!"));
            }
            break;
        }
    }
    jsonFile.writeJsonFile(jsonPath, shops);
    return response.send(
        responseBuilder.buildSucessResponse({ message: "Order placed sucessfully" })
    );
};


module.exports = { saveShop, getShops, placeOrder, searchMedicine, checkMedicine };