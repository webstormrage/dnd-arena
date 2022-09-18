
const cache = {};

export const IMAGES = {
    MAP_FOREST_CROSSROADS: '/assets/maps/forest-crossroads.jpg',
    CHARACTER_FIGHTER: '/assets/characters/fighter.png',
    MONSTER_KOBOLD: '/assets/monsters/humanoid/kobold.png'
};

class ImageStorage {
    getImage(url){
        if(cache[url]){
           return cache[url];
        }
        const img = document.createElement("img");
        img.src = url;
        cache[url] = img;
        return img;
    }
}

export const imageStorage = new ImageStorage();