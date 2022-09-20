export function cn(...classes){
    return classes.map(cl => {
        if(cl && typeof cl === 'object'){
            const cls = [];
            for(let key in cl){
                if(cl[key]){
                    cls.push(key);
                }
            }
            return cls.join(' ');
        }
        return cl;
    }).join(' ');
}