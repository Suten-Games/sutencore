export function slotPicker(slot: number) {
    let isActionBar: boolean = false;
    let isBackpack: boolean = false;
    let isMerchant: boolean = false;
    let isPurchase: boolean = false;
    let isLootWindow: boolean = false;
    let isActiveSpell: boolean = false;
    let isSpellBook: boolean = false;
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
    let position: string = ""

    switch (slot) {
        case 1:
            position = "ab";
            positionX = "-13.7%";
            break;
        case 2:
            position = "ab";
            positionX = "-10.4%";
            break
        case 3:
            position = "ab";
            positionX = "-7.2%";
            break
        case 4:
            position = "ab";
            positionX = "-3.9%";
            break
        case 5:
            position = "ab";
            positionX = "-0.6%";
            break;
        case 6:
            position = "ab";
            positionX = "2.7%";
            break;
        case 7:
            position = "ab";
            positionX = "5.9%";
            break;
        case 8:
            position = "ab";
            positionX = "9.2%";
            break;
        case 9:
            position = "ab";
            positionX = "12.5%";
            break;
        case 10:
            position = "bp"
            positionX = "-14.2%";
            positionY = "5.9%";
            break;
        case 11:
            position = "bp";
            positionX = "-9.9%";
            positionY = "5.9%";
            break;
        case 12:
            position = "bp";
            positionX = "-6%";
            positionY = "5.9%";
            break;
        case 13:
            position = "bp";
            positionX = "-2%";
            positionY = "5.9%";
            break;
        case 14:
            position = "bp";
            positionX = "-14.2%";
            positionY = "-2%";
            break;
        case 15:
            position = "bp";
            positionX = "-9.9%";
            positionY = "-2%";
            break;
        case 16:
            position = "bp";
            positionX = "-6%";
            positionY = "-2%";
            break;
        case 17:
            position = "bp";
            positionX = "-2%";
            positionY = "-2%";
            break;
        case 18:
            position = "bp";
            positionX = "-14.2%";
            positionY = "-9.4%";
            break;
        case 19:
            position = "bp";
            positionX = "-9.9%";
            positionY = "-9.4%";
            break;
        case 20:
            position = "bp";
            positionX = "-6%";
            positionY = "-9.4%";
            break;
        case 21:
            position = "bp";
            positionX = "-2%";
            positionY = "-9.4%";
            break;
        case 22:
            position = "bp";
            positionX = "-14.2%";
            positionY = "-16.8%";
            break;
        case 23:
            position = "bp";
            positionX = "-9.9%";
            positionY = "-16.8%";
            break;
        case 24:
            position = "bp";
            positionX = "-6%";
            positionY = "-16.8%";
            break;
        case 25:
            position = "bp";
            positionX = "-2%";
            positionY = "-16.8%";
            break;
        case 26:
            position = "mc";
            positionY = "29.4%";
            positionX = "16.2%";
            fontPositionY = "31%";
            fontPositionX = "19.5%";
            break;
        case 27:
            position = "mc";
            positionY = "29.4%";
            positionX = "26.9%";
            fontPositionY = "31%";
            fontPositionX = "30%";
            break;
        case 28:
            position = "mc";
            positionY = "21.4%";
            positionX = "16.2%";
            fontPositionY = "23%";
            fontPositionX = "19.5%";
            break;
        case 29:
            position = "mc";
            positionY = "21.4%";
            positionX = "26.9%";
            fontPositionY = "23%";
            fontPositionX = "30%";
            break;
        case 30:
            position = "mc";
            positionY = "13.6%";
            positionX = "16.2%";
            fontPositionY = "15%";
            fontPositionX = "19.5%";
            break;
        case 31:
            position = "mc";
            positionY = "13.6%";
            positionX = "26.9%";
            fontPositionY = "15%";
            fontPositionX = "30%";
            break;
        case 32:
            position = "mc";
            positionY = "5.5%";
            positionX = "16.2%";
            fontPositionY = "7%";
            fontPositionX = "19.5%";
            break;
        case 33:
            positionY = "5.5%";
            positionX = "26.9%";
            fontPositionY = "7%";
            fontPositionX = "30%";
            break;
        case 34:
            position = "mc";
            positionY = "-2.9%";
            positionX = "16.2%";
            fontPositionY = "-1%";
            fontPositionX = "19.5%";
            break;
        case 35:
            position = "mc";
            positionY = "-2.9%";
            positionX = "26.9%";
            fontPositionY = "-1%";
            fontPositionX = "30%";
            break;
        case 36:
            position = "mc";
            positionY = "-13%";
            positionX = "26.9%";
            fontPositionY = "-12%";
            fontPositionX = "30%";
            break;
        case 40:
            position = "lw";
            positionY = "15.5%";
            positionX = "21.4%";
            fontPositionY = "16%";
            fontPositionX = "30%";
            break;
        case 51:
            log(`slotPicker.ts - Slot 51`)
            position = "sb";
            positionY = "25.8%";
            positionX = "17.2%";
            fontPositionY = "31%";
            fontPositionX = "19.5%";
            break;
        case 52:
            position = "sb";
            positionY = "29.4%";
            positionX = "26.9%";
            fontPositionY = "31%";
            fontPositionX = "30%";
            break;
        case 53:
            position = "sb";
            positionY = "21.4%";
            positionX = "16.2%";
            fontPositionY = "23%";
            fontPositionX = "19.5%";
            break;
        case 54:
            position = "sb";
            positionY = "21.4%";
            positionX = "26.9%";
            fontPositionY = "23%";
            fontPositionX = "30%";
            break;
        case 55:
            position = "sb";
            positionY = "13.6%";
            positionX = "16.2%";
            fontPositionY = "15%";
            fontPositionX = "19.5%";
            break;
        case 56:
            position = "sb";
            positionY = "13.6%";
            positionX = "26.9%";
            fontPositionY = "15%";
            fontPositionX = "30%";
            break;
        case 57:
            position = "sb";
            positionY = "5.5%";
            positionX = "16.2%";
            fontPositionY = "7%";
            fontPositionX = "19.5%";
            break;
        case 58:
            position = "sb";
            positionY = "5.5%";
            positionX = "26.9%";
            fontPositionY = "7%";
            fontPositionX = "30%";
            break;
        case 60:
            position = "as";
            positionX = "-2%";
            log('slotPicker.ts:226 - inside case 60');
        default:
            break;
    }

    switch (position) {
        case "ab":
            isActionBar = true;
            hAlign = "center";
            vAlign = "bottom";
            width = "2.5%";
            height = "7%";
            positionY = "1.9%";
            break;
        case "bp":
            isBackpack = true;
            hAlign = "right";
            vAlign = "center";
            width = "2.4%";
            height = "5%";
            break;
        case "sb":
            log(`slotPicker.ts:304 - Inside sb (spellbook)`)
            isSpellBook = true;
            hAlign = "left"
            vAlign = "center";
            width = "4.8%";
            height = "7.8%";
            fontSize = 12;
            fontWidth = 120;
            fontHeight = 30;
            fontHAlign = "left";
            fontVAlign = "center";
            break
        case "as":
            log('slotPicker.ts:248 - inside as block');
            isActiveSpell = true;
            hAlign = "right";
            vAlign = "center";
            width = "2.4%";
            height = "5%";
            positionY = "45.9%";
            break;
        case "mc":
            isMerchant = true;
            hAlign = "left";
            vAlign = "center";
            width = "1.8%";
            height = "4.8%";
            fontSize = 12;
            fontWidth = 120;
            fontHeight = 30;
            fontHAlign = "left";
            fontVAlign = "center";
            break;
        case "lw":
            isLootWindow = true;
            hAlign = "left";
            vAlign = "center";
            width = "4.3%";
            height = "7.3%";
            fontSize = 12;
            fontWidth = 120;
            fontHeight = 30;
            fontHAlign = "left";
            fontVAlign = "center";
            break;

        default:
            break;
    }

    return {
        "ab": isActionBar, "bp": isBackpack, "mc": isMerchant, "pc": isPurchase, "lw": isLootWindow,
        "sb": isSpellBook, "as": isActiveSpell, "ha": hAlign, "h": height, "x": positionX, "y": positionY,
        "va": vAlign, "w": width, "fs": fontSize, "fw": fontWidth, "fh": fontHeight, "fha": fontHAlign,
        "fva": fontVAlign, "fy": fontPositionY, "fx": fontPositionX
    }

}