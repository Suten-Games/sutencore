origin = 2
target = 3
array = ['spot1','spot2','spot3','spot4']

function runOnce() {
    if (target > origin) {
        origin = target;
        target += 1;
    } else {
        origin = target
        target -= 1;
    }
    
    if (target >= array.length) {
        if(array.length % 2 > 0) {
          target = 1
        } else {
            target = 0
        }
        //target = 0;
    }
    
    if(target < 0) {
        origin = 0
        target = 1
    }
    
    console.log(`origin: ${origin} target: ${target}`)
}

// function fix() {
//     if (target >= array.length) {
//         if(array.length % 2 > 0) {
//             target = 1
//         } else {
//             target = 0
//         }
//     } else if (target > origin ) {
//         origin = target
//         target += 1
//     } else if (target < origin) {
//         origin = target
//         target -= 1
//     } else if (target < 0) {
//         origin = 0
//         target = 1
//     }
//     console.log(`fix origin: ${origin} fix target: ${target}`) 
// }


runOnce()
//fix()