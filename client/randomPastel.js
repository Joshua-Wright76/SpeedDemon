export function randomPastel(){
    const seed = ~~(Math.random()*5);
    let color;

    if(seed == 0){color = '#FFB3BA'} //[255,179,186]
    if(seed == 1){color = '#FFBAFF'} //[255,186,255]
    if(seed == 2){color = '#FFFFBA'} //[255,255,186]
    if(seed == 3){color = '#BAFFC9'} //[186,255,201]
    if(seed == 4){color = '#BAFFFF'} //[186,225,255]

    return color;
}

export function randomGreyscale(){
    const seed = ~~(Math.random()*5);
    let color;

    if(seed == 0){color = '#333333'} 
    if(seed == 1){color = '#444444'} 
    if(seed == 2){color = '#555555'}
    if(seed == 3){color = '#666666'} 
    if(seed == 4){color = '#777777'}

    return color;
}

export function randomNeon(){
    const seed = ~~(Math.random()*5);
    let color;

    if(seed == 0){color = '#39ff14'} 
    if(seed == 1){color = '#ff61c9'} 
    if(seed == 2){color = '#61ffe6'}
    if(seed == 3){color = '#ffe661'} 
    if(seed == 4){color = 'ff0000'}

    return color;
}