Array.prototype.remove = function(arg){
    return this.filter(elm=>elm!=arg);
}
function randomChoice(arr) {
    return(arr[Math.floor(Math.random()*arr.length)]);
}
Math.random()
function find_num1(num1,x){
    if ([0,3,6].includes(Math.floor(x / 9)) == true){
        return(num1);
    }else if([1,4,7].includes(Math.floor(x / 9))){
        return(num1-1);
    }else if([2,5,8].includes(Math.floor(x / 9 ))){
        return (num1 - 2)
    }
}
function get_prob1(arr){
    let numbers=[];
    for(let i=1;i<10;i++){
        numbers.push(i);
    }
    let get_probablity=[];
    for(let i=0;i<81;i++){
        get_probablity.push([]);
    }
    for(let x=0;x<81;x++){
        let prob=[];
        let asign_prob=[];
        if(arr[x] > 0){
            continue
        }else{
            for(let num1=0;num1<3;num1++){
                for(let num2=0;num2<3;num2++){
                    prob.push(arr[ (Math.floor(x/3) * 3) + (find_num1(num1,x) * 9) + num2]);
                }
            }
            for(let line=0;line<9;line++){
                prob.push(arr[ (Math.floor(x/9) * 9) + line]);
                prob.push(arr[(x % 9) + ( 9 * line)]);
            }
            prob=Array.from(new Set(prob));
            prob=prob.remove(0);
            for(let i=0;i<numbers.length;i++){
                if (prob.includes(numbers[i])==false){
                    asign_prob.push(numbers[i]);
                }
            }
            get_probablity[x]=asign_prob
        }
        
    } 
    return(get_probablity);
}
function search_places(get_prob,place_value){
    let places=[];
    for(let number=0;number<81;number++){
        if(get_prob[number].length == place_value){
            places.push(number);
        }
    }
    return(places);
}
function least_placeholder(get_prob){
    let least_place=7;
    for(let num=0;num<get_prob.length;num++){
        if(get_prob[num].length<least_place && get_prob[num].length != 0){
            least_place=get_prob[num].length;
        }
    }
    return(least_place);
}
function solve(arr,get_prob){
    for(let i = 0;i < 54 ; i++){
        let lp=least_placeholder(get_prob);
        let pl=search_places(get_prob,lp);
        if(lp == 1){
            let num=get_prob[pl[0]][0];
            for(let num1=0;num1<3;num1++){
                for(let num2=0;num2<3;num2++){
                    place=(Math.floor(pl[0]/3)*3)+(find_num1(num1,pl[0])*9)+num2
                    if(get_prob[place].includes(num)){
                        get_prob[place]=get_prob[place].remove(num);
                    }
                }
            }
            for(let line=0;line<9;line++){
                place1=(Math.floor(pl[0]/9)*9)+line
                if(get_prob[place1].includes(num)){
                    get_prob[place1]=get_prob[place1].remove(num);
                }
                let place2=(pl[0]%9)+(9*line);
                if(get_prob[place2].includes(num)){
                    get_prob[place2]=get_prob[place2].remove(num);
                }
            }
            get_prob[pl[0]]=[];
            arr[pl[0]]=num;
        }else{
            let num=randomChoice(get_prob[pl[0]]);
            for(let num1=0;num1<3;num1++){
                for(let num2=0;num2<3;num2++){
                    place=(Math.floor(pl[0]/3)*3)+(find_num1(num1,pl[0])*9)+num2
                    if(get_prob[place].includes(num)){
                        get_prob[place]=get_prob[place].remove(num);
                    }
                }
            }
            for(let line=0;line<9;line++){
                place1=(Math.floor(pl[0]/9)*9)+line
                if(get_prob[place1].includes(num)){
                    get_prob[place1]=get_prob[place1].remove(num);
                }
                let place2=(pl[0]%9)+(9*line);
                if(get_prob[place2].includes(num)){
                    get_prob[place2]=get_prob[place2].remove(num);
                }
            }
            get_prob[pl[0]]=[];
            arr[pl[0]]=num;                    
        }
    }
    return(arr);
}
function remove_ar(num,x){
    let cout=0;
    let out=[];
    for(let i=0;i<num.length;i++){
        if(num[i] == x && cout !=1){
            cout=1
            continue;
        }else{
            out.push(num[i]);
        }
    }
    return(out);
}
function genarate_suduko(dif){
    let arra=[];
    for(let i=0;i<81;i++){
        arra.push(0);
    }
    
    for(let box=0;box<3;box++){
        let numbers=[];
        for(let i=1;i<10;i++){
            numbers.push(i);
        }
        for(let num=0;num<9;num++){
            let random_num=randomChoice(numbers);
            arra[box*27+box*3+Math.floor(num/3)*9+num%3] = random_num;
            numbers=numbers.remove(random_num);
        }
    }
    let get_probablity=get_prob1(arra);
    
    arra=solve(arra,get_probablity);
    
    let num=[Math.floor(dif/3),Math.floor(dif/3),dif-(Math.floor(dif/3)*2)];
    let pattern=[];
    let ran=0
    let ran_=0;

    for(let i=0;i<3;i++){
        ran=randomChoice(num);
        num=remove_ar(num,ran)
        let num1=[Math.floor(ran/3),Math.floor(ran/3),ran-(Math.floor(ran/3)*2)]
        pattern.push([])
        for(let j=0;j<3;j++){
            ran_=randomChoice(num1);
            num1=remove_ar(num1,ran_);
            pattern[i].push(ran_)
        }
    }
    const backup=[...arra];
    let array9=[];
    for(let i=0;i<81;i++){
        array9.push(i);
    }
    let con=[];

    for(let i=0;i<9;i++){
        let x=randomChoice(array9);
        for(let num1=0;num1<3;num1++){
            for(let num2=0;num2<3;num2++){
                let place=(Math.floor(x/3)*3)+(find_num1(num1,x)*9)+num2
                if(array9.includes(place)){
                    array9=array9.remove(place)
                }
            }
        }
        for(let line=0;line<9;line++){
            let place1=(Math.floor(x/9)*9)+line
            if(array9.includes(place1)){
                array9=array9.remove(place1)
            }
            let place2=(x%9)+(9*line);
            if(array9.includes(place2)){
                array9=array9.remove(place2)
            }
        }
        con.push(x);
    }
    let lists=[];
    num=-1
    for(let i=0;i<81;i+=27){
        for(let j=0;j<9;j+=3){
            num+=1
            lists.push([]);
            for(let num1=0;num1<3;num1++){
                for(let num2=0;num2<3;num2++){
                    let x=i+j;
                    let place=(Math.floor(x/3)*3)+(num1*9)+num2
                    if(con.includes(place)){
                        continue
                    }else{
                        lists[num].push(place);
                    }
                }
            }
        }
    }

    for(let i=0;i<9;i++){
        for(let j=0;j<9-pattern[Math.floor(i/3)][i%3];j++){
            let ran=randomChoice(lists[i])
            arra[ran]=0;
            lists[i]=lists[i].remove(ran)
        }
    }

    return(arra);
};