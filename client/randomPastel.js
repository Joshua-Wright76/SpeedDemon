export function randomPastel(){
    var seed = ~~(Math.random()*5);
    var color = [0, 0, 0];

    if(seed == 0){color = '#FFB3BA'} //[255,179,186]
    if(seed == 1){color = '#FFBAFF'} //[255,186,255]
    if(seed == 2){color = '#FFFFBA'} //[255,255,186]
    if(seed == 3){color = '#BAFFC9'} //[186,255,201]
    if(seed == 4){color = '#BAFFFF'} //[186,225,255]

    return color;
}

export function randomGreyscale(){
    var seed = ~~(Math.random()*5);
    var color = [0, 0, 0];

    if(seed == 0){color = '#333333'} 
    if(seed == 1){color = '#444444'} 
    if(seed == 2){color = '#555555'}
    if(seed == 3){color = '#666666'} 
    if(seed == 4){color = '#777777'}

    return color;
}