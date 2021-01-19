bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    q = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    if (q == "ABCDEF123") {
        basic.showLeds(`
            . # # # .
            . # . # .
            . # # # .
            . # . # .
            . # # # .
            `)
        pins.digitalWritePin(DigitalPin.P8, 1)
        music.playMelody("G G G G G - - - ", 120)
    } else if (q == "B") {
        basic.showLeds(`
            # . # # #
            # . # . .
            # . # # #
            # . # . #
            # . # # #
            `)
        pins.digitalWritePin(DigitalPin.P16, 1)
        music.playMelody("C D E C C C C F ", 120)
    } else if (q == "C") {
        basic.showLeds(`
            . # . # .
            # # # # #
            . . # . .
            . . # . .
            . . # . .
            `)
        pins.digitalWritePin(DigitalPin.P8, 0)
        music.playMelody("- - - G G G G G ", 120)
    } else if (q == "D") {
        basic.showLeds(`
            . . # . .
            . . # . .
            # # # # #
            . # . # .
            # . . . #
            `)
        pins.digitalWritePin(DigitalPin.P16, 0)
        music.playMelody("- - E D D D D E ", 120)
    }
})
let TEM = 0
let q = ""
basic.showIcon(IconNames.Heart)
bluetooth.startIOPinService()
bluetooth.startLEDService()
bluetooth.startUartService()
basic.forever(function () {
    TEM = input.temperature()
    basic.showNumber(TEM)
    while (TEM >= 25) {
        TEM = 0
        music.playMelody("C D E F G A B C5 ", 120)
    }
    while (TEM <= 16) {
        TEM = 0
        music.playMelody("C C C C C C C C ", 120)
    }
    basic.pause(300000)
})
