export function slotPicker(slot:number) {
    let isActionBar: boolean = false;
    let isBackpack: boolean = false;
    let isMerchant: boolean = false;
    let isPurchase: boolean = false;
    let isLootWindow: boolean = false;
    let hAlign: string = ""; 
    let vAlign: string = "";
    let width: string = "";
    let height: string = "";
    let positionY: string = "";
    let positionX: string = "";
    let fontSize: number = 0;
    let fontWidth: number = 0;
    let fontHeight: number = 0;
    let fontHAlign: string = "";
    let fontVAlign: string = "";
    let fontPositionY: string = "";
    let fontPositionX: string = "";


    if (slot == 1) {
        isActionBar = true;
        hAlign = "center";
        vAlign = "bottom";
        width = "2.5%";
        height = "7%";
        positionY = "1.9%";
        positionX = "-13.7%";
    } else if (slot == 2) {
        isActionBar = true;
        hAlign = "center";
        vAlign = "bottom";
        width = "2.4%";
        height = "7%";
        positionY = "1.9%";
        positionX = "-10.4%";
    } else if (slot == 3) {
        isActionBar = true;
        hAlign = "center";
        vAlign = "bottom";
        width = "2.5%";
        height = "7%";
        positionY = "1.9%";
        positionX = "-7.2%";
    } else if (slot == 4) {
        isActionBar = true;
        hAlign = "center";
        vAlign = "bottom";
        width = "2.5%";
        height = "7%";
        positionY = "1.9%";
        positionX = "-3.9%";
    } else if (slot == 5) {
        isActionBar = true;
        hAlign = "center";
        vAlign = "bottom";
        width = "2.5%";
        height = "7%";
        positionY = "1.9%";
        positionX = "-0.6%";
    } else if (slot == 6) {
        isActionBar = true;
        hAlign = "center";
        vAlign = "bottom";
        width = "2.5%";
        height = "7%";
        positionY = "1.9%";
        positionX = "2.7%";
    } else if (slot == 7) {
        isActionBar = true;
        hAlign = "center";
        vAlign = "bottom";
        width = "2.5%";
        height = "7%";
        positionY = "1.9%";
        positionX = "5.9%";
    } else if (slot == 8) {
        isActionBar = true;
        hAlign = "center";
        vAlign = "bottom";
        width = "2.5%";
        height = "7%";
        positionY = "1.9%";
        positionX = "9.2%";
    } else if (slot == 9) {
        isActionBar = true;
        hAlign = "center";
        vAlign = "bottom";
        width = "2.5%";
        height = "7%";
        positionY = "1.9%";
        positionX = "12.5%";
    } else if (slot == 10) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "5.9%";
        positionX = "-14.2%";
    } else if (slot == 11) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "5.9%";
        positionX = "-9.9%";
    } else if (slot == 12) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "5.9%";
        positionX = "-6%";
    } else if (slot == 13) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "5.9%";
        positionX = "-2%";
    } else if (slot == 14) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "-2%";
        positionX = "-14.2%";
    } else if (slot == 15) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "-2%";
        positionX = "-9.9%";
    } else if (slot == 16) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "-2%";
        positionX = "-6%";
    } else if (slot == 17) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "-2%";
        positionX = "-2%";
    } else if (slot == 18) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "-9.4%";
        positionX = "-14.2%";
    } else if (slot == 19) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "-9.4%";
        positionX = "-9.9%";
    } else if (slot == 20) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width =  "2.4%";
        height = "5%";
        positionY = "-9.4%";
        positionX = "-6%";
    } else if (slot == 21) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "-9.4%";
        positionX = "-2%";
    } else if (slot == 22) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "-16.8%";
        positionX = "-14.2%";
    } else if (slot == 23) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "-16.8%";
        positionX = "-9.9%";
    } else if (slot == 24) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "-16.8%";
        positionX = "-6%";
    } else if (slot == 25) {
        isBackpack = true;
        hAlign = "right";
        vAlign = "center";
        width = "2.4%";
        height = "5%";
        positionY = "-16.8%";
        positionX = "-2%";
    } else if (slot == 26) {
        isMerchant = true;
        hAlign = "left";
        vAlign = "center";
        width = "1.8%";
        height = "4.8%";
        positionY = "29.4%";
        positionX = "16.2%";
        fontSize = 12;
        fontWidth = 120;
        fontHeight = 30;
        fontHAlign = "left";
        fontVAlign = "center";
        fontPositionY = "31%";
        fontPositionX = "19.5%";
    } else if (slot == 27) {
        isMerchant = true;
        hAlign = "left";
        vAlign = "center";
        width = "1.8%";
        height = "4.8%";
        positionY = "29.4%";
        positionX = "26.9%";
        fontSize = 12;
        fontWidth = 120;
        fontHeight = 30;
        fontHAlign = "left";
        fontVAlign = "center";
        fontPositionY = "31%";
        fontPositionX = "30%";
    } else if (slot == 28) {
        isMerchant = true;
        hAlign = "left";
        vAlign = "center";
        width = "1.8%";
        height = "4.8%";
        positionY = "21.4%";
        positionX = "16.2%";
        fontSize = 12;
        fontWidth = 120;
        fontHeight = 30;
        fontHAlign = "left";
        fontVAlign = "center";
        fontPositionY = "23%";
        fontPositionX = "19.5%";
    } else if (slot == 29) {
        isMerchant = true;
        hAlign = "left";
        vAlign = "center";
        width = "1.8%";
        height = "4.8%";
        positionY = "21.4%";
        positionX = "26.9%";
        fontSize = 12;
        fontWidth = 120;
        fontHeight = 30;
        fontHAlign = "left";
        fontVAlign = "center";
        fontPositionY = "23%";
        fontPositionX = "30%";
    } else if (slot == 30) {
        isMerchant = true;
        hAlign = "left";
        vAlign = "center";
        width = "1.8%";
        height = "4.8%";
        positionY = "13.6%";
        positionX = "16.2%";
        fontSize = 12;
        fontWidth = 120;
        fontHeight = 30;
        fontHAlign = "left";
        fontVAlign = "center";
        fontPositionY = "15%";
        fontPositionX = "19.5%";
    } else if (slot == 31) {
        isMerchant = true;
        hAlign = "left";
        vAlign = "center";
        width = "1.8%";
        height = "4.8%";
        positionY = "13.6%";
        positionX = "26.9%";
        fontSize = 12;
        fontWidth = 120;
        fontHeight = 30;
        fontHAlign = "left";
        fontVAlign = "center";
        fontPositionY = "15%";
        fontPositionX = "30%";
    } else if (slot == 32) {
        isMerchant = true;
        hAlign = "left";
        vAlign = "center";
        width = "1.8%";
        height = "4.8%";
        positionY = "5.5%";
        positionX = "16.2%";
        fontSize = 12;
        fontWidth = 120;
        fontHeight = 30;
        fontHAlign = "left";
        fontVAlign = "center";
        fontPositionY = "7%";
        fontPositionX = "19.5%";
    } else if (slot == 33) {
        isMerchant = true;
        hAlign = "left";
        vAlign = "center";
        width = "1.8%";
        height = "4.8%";
        positionY = "5.5%";
        positionX = "26.9%";
        fontSize = 12;
        fontWidth = 120;
        fontHeight = 30;
        fontHAlign = "left";
        fontVAlign = "center";
        fontPositionY = "7%";
        fontPositionX = "30%";
    } else if (slot == 34) {
        isMerchant = true;
        hAlign = "left";
        vAlign = "center";
        width = "1.8%";
        height = "4.8%";
        positionY = "-2.9%";
        positionX = "16.2%";
        fontSize = 12;
        fontWidth = 120;
        fontHeight = 30;
        fontHAlign = "left";
        fontVAlign = "center";
        fontPositionY = "-1%";
        fontPositionX = "19.5%";
    } else if (slot == 35) {
        isMerchant = true;
        hAlign = "left";
        vAlign = "center";
        width = "1.8%";
        height = "4.8%";
        positionY = "-2.9%";
        positionX = "26.9%";
        fontSize = 12;
        fontWidth = 120;
        fontHeight = 30;
        fontHAlign = "left";
        fontVAlign = "center";
        fontPositionY = "-1%";
        fontPositionX = "30%";
    } else if (slot == 36) {
        isPurchase = true;
        hAlign = "left";
        vAlign = "center";
        width = "1.8%";
        height = "4.8%";
        positionY = "-13%";
        positionX = "26.9%";
        fontSize = 12;
        fontWidth = 120;
        fontHeight = 30;
        fontHAlign = "left";
        fontVAlign = "center";
        fontPositionY = "-12%";
        fontPositionX = "30%";
    } else if (slot == 40) {
        isLootWindow = true;
        hAlign = "left";
        vAlign = "center";
        width = "4.3%";
        height = "7.3%";
        positionY = "15.5%";
        positionX = "21.4%";
        fontSize = 12;
        fontWidth = 120;
        fontHeight = 30;
        fontHAlign = "left";
        fontVAlign = "center";
        fontPositionY = "16%";
        fontPositionX = "30%";
    }

    return {    
        "ab":isActionBar, "bp":isBackpack, "mc":isMerchant, "pc":isPurchase, "lw":isLootWindow, "ha":hAlign, 
        "h": height, "x": positionX, "y": positionY, "va": vAlign, "w": width, 
        "fs":fontSize, "fw":fontWidth, "fh":fontHeight, "fha":fontHAlign, "fva":fontVAlign,
        "fy":fontPositionY, "fx":fontPositionX 
    }

}